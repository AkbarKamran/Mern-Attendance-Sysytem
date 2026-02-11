import React from "react";
import "../App.css";

export default function WelcomeGreeting() {
  const firstName = localStorage.getItem("userFirstName") || "";
  const hour = new Date().getHours();
  let timeGreeting = "Welcome";
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";

  const displayName = firstName.trim() ? firstName : "there";
  const greeting = `${timeGreeting}, ${displayName}!`;

  return (
    <div className="welcome-greeting">
      <h4 style={{ margin: 0, fontWeight: 500 }}>{greeting}</h4>
    </div>
  );
}
