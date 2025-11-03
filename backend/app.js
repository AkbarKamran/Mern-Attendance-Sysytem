const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const SECRETKEY = "qwerty@321";
app.use(bodyParser.json());

// In-memory storage (no database)
const users = []; // Store user data
const attendanceRecords = {}; // Store check-in/out records by email
const breakRecords = {}; // Store break records by email
const reports = {}; // Store reports by email
const leaveRequests = {}; // Store leave requests by email

const verifyTheToken = (req, res, next) => {
  // getting the token from the header
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post("/checkin", async (req, res) => {
  try {
    const { checkInTime, email } = req.body;
    const userEmail = email || req.userData?.user?.username;
    
    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    const today = new Date().toISOString().split('T')[0]; // Get today's date as YYYY-MM-DD
    
    if (!attendanceRecords[userEmail]) {
      attendanceRecords[userEmail] = [];
    }

    // Check if user already checked in today
    const todayRecord = attendanceRecords[userEmail].find(
      record => record.date === today && !record.checkOutTime
    );

    if (todayRecord) {
      return res.status(400).json({ error: "Already checked in today" });
    }

    // Create new check-in record
    const checkInRecord = {
      date: today,
      checkInTime: checkInTime,
      checkOutTime: null,
      totalBreakTime: 0
    };

    attendanceRecords[userEmail].push(checkInRecord);
    console.log(`Check-in recorded for ${userEmail} at ${checkInTime}`);
    
    res.json({ 
      success: true, 
      message: "Check-in recorded successfully",
      checkInTime: checkInTime 
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const { checkOutTime, email } = req.body;
    const userEmail = email || req.userData?.user?.username;
    
    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    const today = new Date().toISOString().split('T')[0];
    
    if (!attendanceRecords[userEmail]) {
      return res.status(400).json({ error: "No check-in record found" });
    }

    // Find today's check-in record without checkout
    const todayRecord = attendanceRecords[userEmail].find(
      record => record.date === today && !record.checkOutTime
    );

    if (!todayRecord) {
      return res.status(400).json({ error: "No active check-in found for today" });
    }

    // Update checkout time
    todayRecord.checkOutTime = checkOutTime;
    
    // Calculate total work time if needed
    console.log(`Check-out recorded for ${userEmail} at ${checkOutTime}`);
    
    res.json({ 
      success: true, 
      message: "Check-out recorded successfully",
      checkOutTime: checkOutTime 
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/break", async (req, res) => {
  try {
    const { breaktime, email } = req.body;
    const userEmail = email || req.userData?.user?.username;
    
    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    const today = new Date().toISOString().split('T')[0];
    
    if (!attendanceRecords[userEmail]) {
      return res.status(400).json({ error: "No attendance record found" });
    }

    // Find today's active check-in record
    const todayRecord = attendanceRecords[userEmail].find(
      record => record.date === today && !record.checkOutTime
    );

    if (!todayRecord) {
      return res.status(400).json({ error: "No active check-in found" });
    }

    // Store break time
    if (!breakRecords[userEmail]) {
      breakRecords[userEmail] = [];
    }
    
    breakRecords[userEmail].push({
      date: today,
      breakTime: breaktime
    });

    // Update total break time in attendance record
    if (!todayRecord.breaks) {
      todayRecord.breaks = [];
    }
    todayRecord.breaks.push(breaktime);
    
    console.log(`Break recorded for ${userEmail}: ${breaktime}`);
    
    res.json({ 
      success: true, 
      message: "Break time recorded successfully",
      breakTime: breaktime 
    });
  } catch (error) {
    console.error("Break error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/report", async (req, res) => {
  try {
    const { todayReport, tomorroeTask, dependency, email } = req.body;
    const userEmail = email || req.userData?.user?.username;
    
    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    const today = new Date().toISOString().split('T')[0];
    
    if (!reports[userEmail]) {
      reports[userEmail] = [];
    }

    const report = {
      date: today,
      todayReport: todayReport,
      tomorrowTask: tomorroeTask,
      dependency: dependency,
      createdAt: new Date().toISOString()
    };

    reports[userEmail].push(report);
    console.log(`Report submitted by ${userEmail}`);
    
    res.json({ 
      success: true, 
      message: "Report submitted successfully" 
    });
  } catch (error) {
    console.error("Report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/request", async (req, res) => {
  try {
    const { startDate, endDate, reason, type, email } = req.body;
    const userEmail = email || req.userData?.user?.username;
    
    if (!userEmail) {
      return res.status(400).json({ error: "User email required" });
    }

    if (!leaveRequests[userEmail]) {
      leaveRequests[userEmail] = [];
    }

    const leaveRequest = {
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      type: type,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    leaveRequests[userEmail].push(leaveRequest);
    console.log(`Leave request submitted by ${userEmail}`);
    
    res.json({ 
      success: true, 
      message: "Leave request submitted successfully" 
    });
  } catch (error) {
    console.error("Request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log("Got the register request");
    console.log(req.body);
    const { username, password, firstName1, lastName1 } = req.body;
    
    if (!username || !password || !firstName1 || !lastName1) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const exist = users.find(user => user.email === username);
    if (exist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      firstName: firstName1,
      lastName: lastName1,
      email: username,
      password: hashPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log("User registered:", username);
    
    res.json({ 
      success: true,
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("got the request");
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Find user in memory
    const exist = users.find(user => user.email === username);
    if (!exist) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    // Verify password
    const verify = await bcrypt.compare(password, exist.password);
    if (!verify) {
      return res.status(403).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const user = {
      username: exist.email,
      firstName: exist.firstName,
      lastName: exist.lastName
    };

    jwt.sign({ user }, SECRETKEY, (err, token) => {
      if (err) {
        console.error("JWT error:", err);
        return res.status(500).json({ error: "Token generation failed" });
      } else {
        console.log("Login successful for:", username);
        res.json({
          token,
        });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user attendance history
app.get("/attendance/:email", (req, res) => {
  const { email } = req.params;
  const userRecords = attendanceRecords[email] || [];
  res.json({ attendance: userRecords });
});

// Get user reports
app.get("/reports/:email", (req, res) => {
  const { email } = req.params;
  const userReports = reports[email] || [];
  res.json({ reports: userReports });
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
