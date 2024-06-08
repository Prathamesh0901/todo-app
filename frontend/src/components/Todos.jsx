export default function Todos({ todos, fetchTodos }) {

    const handleDone = async (id) => {
        const URL = 'http://localhost:8080/completed';

        const response = await fetch(URL, {
            method: 'PUT',
            body: JSON.stringify({
                id
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        fetchTodos();
    }

    const handleDelete = async (id) => {
        const URL = 'http://localhost:8080/delete';

        const response = await fetch(URL, {
            method: 'DELETE',
            body: JSON.stringify({
                id
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        fetchTodos();
    }

    return(
        <div>
            {
                todos.map(todo => {
                    return <div key={todo._id}>
                        <h1>{todo.title}</h1>
                        <h3>{todo.description}</h3>
                        <button onClick={todo.completed? null: () => {handleDone(todo._id)}}>{todo.completed? <span>Already Done!</span>: <span>Mark as Done</span>}</button>
                        <button onClick={() => {handleDelete(todo._id)}}>Delete</button>
                    </div>
                })
            }
        </div>
    )
}