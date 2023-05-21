import Search from "./components/Search";
import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import Header from "./components/Header";

const date = new Date();

const App = () => {
  
  const [notes, setNotes] = useState([
  {
    id: nanoid(),
      text: "Welcome to your notes! You can press the trash icon below to delete me anytime!",
      date: date.toLocaleDateString() 
    },
  ]);

  useEffect(()=>{
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
      );

    if (savedNotes) {
      setNotes(savedNotes);
    }

  }, []);

  const [searchText, setSearchText] = useState('');
  
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header
          handleToggleDarkMode={setDarkMode} 
        />
        <Search 
          handleSearchNote={setSearchText}  
        />
        <NotesList 
          notes={notes.filter((note)=> note.text.toLocaleLowerCase().includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
    );
}

export default App;