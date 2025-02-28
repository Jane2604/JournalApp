import React, { useState } from "react";
import "../css/JournalEntryForm.css";

function JournalEntryForm({ addEntry }) {
  const [entry, setEntry] = useState({ title: "", content: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.title || !entry.content || !entry.date) return;
    addEntry({ ...entry, id: Date.now() });
    setEntry({ title: "", content: "", date: "" });
  };

  return (
    <form className="journal-entry-form" onSubmit={handleSubmit}>
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
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default JournalEntryForm;
