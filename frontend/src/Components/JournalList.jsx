import React from "react";
import "../css/JournalList.css";

function JournalList({ entries, deleteEntry }) {
  return (
    <div className="journal-list">
      {entries.length === 0 ? (
        <p>No entries for this date.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="journal-entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default JournalList;



