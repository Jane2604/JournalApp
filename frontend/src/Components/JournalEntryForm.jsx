import React, { useState } from "react";
import axios from "axios";  // Import axios for HTTP requests
import "../css/JournalEntryForm.css";

function JournalEntryForm({ addEntry }) {
  const [entry, setEntry] = useState({ title: "", content: "", date: "" });
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newEntry = {
      title: entry.title,
      content: entry.content,
      date: entry.date,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/journal/add", newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies (JWT token) are sent
      });
  
      console.log("Journal entry added:", response.data);
      addEntry(response.data); // Add entry to UI
      setEntry({ title: "", content: "", date: "" });
    } catch (error) {
      console.error("Error adding journal entry:", error);
    }
  };
  
  return (
    <form className="journal-entry-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}  {/* Display error message */}
      
      <input
        type="text"
        placeholder="Title"
        value={entry.title}
        onChange={(e) => setEntry({ ...entry, title: e.target.value })}
        required
      />
      
      <textarea
        placeholder="Write your thoughts..."
        value={entry.content}
        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
        required
      />
      
      <input
        type="date"
        value={entry.date}
        onChange={(e) => setEntry({ ...entry, date: e.target.value })}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Entry"}
      </button>
    </form>
  );
}

export default JournalEntryForm;

