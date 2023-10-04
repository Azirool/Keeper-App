import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {

  //Store Newly Added Notes
  const [notes, setNotes] = useState([]);

  //GET data from MongoDB using Axios
  const fetchNote = () => {
    axios.get("http://localhost:5000/getNote")
    .then((response) => {
      setNotes(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  useEffect(() => {
    fetchNote();
  }, []);

  //Newly added notes are inserted into the useState array
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  //Show notes after being deleted
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
