import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoEdit from './DoEdit.jsx'
import ShowNote from './ShowNote.jsx'

function Note({isbn}) {
  const [content, setContent] = useState('');
  const [toEdit, setToEdit] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get('http://localhost:3000/content', {
          params: { isbn: isbn }, // Correct way to pass params
        });
        console.log(response.data)
        if(response.data.found){
          setContent(response.data.content); 
        }else{
          setContent("No Note is found."); 
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchContent();
  }, [isbn]); // Dependency array ensures this effect runs when isbn changes

  const handleSubmit = async (e) => {
    console.log("Content:", content)
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submit', { 
        isbn: isbn,
        content: content, 
      });
      console.log(response.data);
      // Clear the form after submission
      // setContent('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setToEdit(false);
  };

  const handleClick = () => {
    setToEdit(true);
  }

  return (
    <div>
      <h1>Taking Book Notes...</h1>
      <form onSubmit={handleSubmit}>
        {toEdit ? (
          <DoEdit content={content} setContent={setContent} />
        ) : (
          <ShowNote content={content} />
        )}
        <div className='save-edit-btn'>
          <button type='button' onClick={handleClick} className='edit-btn'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
          </button>
          <button type="submit">Save Note</button>
        </div>
      </form>
    </div>
  );
}

export default Note;
