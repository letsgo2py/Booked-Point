import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddISBNPage from './components/AddISBNPage'
import Home from './Home'
import Note from './components/Note'

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-isbn" element={<AddISBNPage />} />
              <Route path="/mynote" element={<NoteWrapper/>} />
          </Routes>
      </Router>
  );
}

const NoteWrapper = (props) => {
    const location = useLocation();
    const { state } = location;
    const { isbn } = state || {}; 
    return <Note isbn={isbn} {...props} />;
};

export default App