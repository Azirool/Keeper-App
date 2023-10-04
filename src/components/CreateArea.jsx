import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios';

function CreateArea(props) {

  //To set the input bar to expand when click
  const [isExpanded, setIsExpanded] = useState(false);

  //Starting state of the note
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    //Prevent the page from refresh
    event.preventDefault();
    //Pass note to store into notes array
    props.onAdd(note);
    //POST data into MongoDB using Axios
    axios.post("http://localhost:5000/", note, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => {})
    .catch((error) => {
        console.error(error);
    });

    //Set input back to empty after POST into MongoDB
    setNote({ title: "", content: "" });
  }

  //Expand input bar when click
  function expand(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
