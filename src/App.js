import logo from './logo.svg';
import './App.css';
import Header from './Components/Header.js';
import TodoItem from './Components/TodoItem';
import Todos from './Components/Todos';
import Footer from './Components/Footer';

function App() {
  return (
    <>
    <Header/>
    <Todos/>
    <TodoItem/>
    <Footer/>
    </>
  );
}

export default App;
