import './App.css';
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import NoteState from "./Components/Context/NoteState"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Notes from './Components/Notes';

function App() {
  document.body.style.backgroundColor="#453C67";
  document.body.style.color="white";

  return (
    <NoteState>
    <Router>
      <Navbar/>
      <Alert/>
      <Routes>
      <Route exact path="/" element={<Notes/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
      </Routes>
    </Router>
    </NoteState>
        
  );
}

export default App;
