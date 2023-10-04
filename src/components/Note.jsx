import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";


function Note(props) {

  //DELETE data from MongoDB using Axios
  function handleClick() {
    axios.delete(`http://localhost:5000/deleteNote/${props.id}`)
    .then((response) => {
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
    });
      
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
          <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
