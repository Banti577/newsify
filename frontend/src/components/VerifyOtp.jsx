import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  //const location = useLocation();
  const navigate = useNavigate();

  //const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://newsify-backend-fugz.onrender.com/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",  // ✅ ADD THIS
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/"); // ya homepage
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyOtp;
