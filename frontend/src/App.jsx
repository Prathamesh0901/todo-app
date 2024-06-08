import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const URL = 'http://localhost:8080/todo';

  const [todos, setTodos] = useState([]);

  
  const fetchTodos = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setTodos(data.todos);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo fetchTodos={fetchTodos}></CreateTodo>
      <Todos todos={todos} fetchTodos={fetchTodos}></Todos>
    </div>
  )
}

export default App
