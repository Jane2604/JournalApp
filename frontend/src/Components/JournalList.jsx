import React from "react";

function JournalList({ entries, deleteEntry }) {
  return (
    <div>
      {entries.length === 0 ? (
        <p>No journal entries found.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <p>{entry.date}</p>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default JournalList;




