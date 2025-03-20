import React, { useState, useEffect } from "react";
import "./Notes.css";

const Note = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const addNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, newNote]);
    setNewNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (newNote.trim() === "") return;
    const updatedNotes = notes.map((note, index) =>
      index === editingIndex ? newNote : note
    );

    setNotes(updatedNotes);
    setNewNote("");
    setEditingIndex(null);
  };

  return (
    <div className=" container mt-4 ">
      <div className="text-end">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <h2 className="text-center mb-4 mt-4">Note-Taking APP</h2>

      <div className="input-group mb-4 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />

        {editingIndex == null ? (
          <button className=" btn btn-primary " onClick={addNote}>
            ADD
          </button>
        ) : (
          <button className="btn btn-success" onClick={saveEdit}>
            SAVE
          </button>
        )}
      </div>

      <ul className="list-group">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{note}</span>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editNote(index)}
                >
                  EDIT
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNote(index)}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item text-center text-muted">
            No notes available. Add a new one!
          </li>
        )}
      </ul>
    </div>
  );
};

export default Note;
