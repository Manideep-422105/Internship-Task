import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane } from "react-icons/fa";
import "./Email.css";

const Email = ({ query, queryResult }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    // Check if query data exists
    if (!query || !queryResult) {
      alert("No query data available to send!");
      setSending(false);
      return;
    }

    const emailData = {
      name: form.name,
      email: form.email,
      message: form.message,
      query,
      query_result: JSON.stringify(queryResult, null, 2),
    };

    emailjs
      .send(
        "service_4x7em2n",
        "template_n4f0wgd",
        emailData,
        "utPdnQK1ecfEhh2UP"
      )
      .then(
        (result) => {
          setSending(false);
          alert("Email sent successfully!");
          setForm({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          setSending(false);
          alert("Failed to send email: " + error.text);
          console.error("Email Error:", error.text);
        }
      );
  };

  return (
    <div className="email-container">
      <h2 className="email-title">Share Results</h2>
      <p className="email-description">
        Send the current query and results to any email address
      </p>
      
      <form onSubmit={sendEmail} className="email-form">
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            value={form.name}
            placeholder="Your Name" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            value={form.email}
            placeholder="Recipient Email" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            name="message" 
            value={form.message}
            placeholder="Your Message" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className="send-btn"
          disabled={sending}
        >
          {sending ? (
            "Sending..."
          ) : (
            <>
              <FaPaperPlane className="send-icon" />
              Send Email
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Email;