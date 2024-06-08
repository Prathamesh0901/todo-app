import { useState } from 'react';
import '../components/CreateTodo.css'

export default function CreateTodo({fetchTodos}) {

    const [todo, setTodo] = useState({
        title: '',
        description: ''
    });

    const handleChange = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }

    const addTodo = async () => {
        const URL = 'http://localhost:8080/todo';

        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                title: todo.title,
                description: todo.description
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await response.json();
        alert(data.msg);

        setTodo({title: '', description: ''});

        fetchTodos();
    }

    return (
        <div>
            <input name="title" id="title" type="text" placeholder="title" onChange={handleChange} value={todo.title}/><br />
            <input name="description" id="description" type="text" placeholder="description" onChange={handleChange} value={todo.description}/><br />

            <button id="addBtn" onClick={addTodo}>Add todo</button>
        </div>
    )
}