import React, { useState, useEffect } from "react";
import JournalEntryForm from "./JournalEntryForm";
import JournalList from "./JournalList";
import { useNavigate } from "react-router-dom";
import "../css/Journal.css";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    const newEntries = [...entries, entry].sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(newEntries);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredEntries = searchDate
    ? entries.filter((entry) => entry.date.startsWith(searchDate))
    : entries;
    return (
      <div className="journal-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    
        <div className="journal-box">
          <h1>Journal</h1>
          <JournalEntryForm addEntry={addEntry} />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <JournalList entries={filteredEntries} deleteEntry={deleteEntry} />
        </div>
      </div>
    );
    
    
}

export default Journal;
