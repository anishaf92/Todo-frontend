import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import DisplayTodo from './components/DisplayTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/displayTodo/:id" element={<DisplayTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
