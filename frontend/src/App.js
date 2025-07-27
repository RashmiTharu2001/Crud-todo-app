import { useEffect, useState } from "react";


function App() {
  const [todos,setTodos]=useState([]);
  const [task,setTask]=useState("");

  useEffect(()=>{
    const gettodos = async() => {
      const response = await fetch(`${process.env.React_APP_BACKEND_URL}/api/todos`,{method:"GET"});
      const todos = await response.json();
      setTodos(todos);
    };
    gettodos();
  },[]);
 
  const createTodo = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.React_APP_BACKEND_URL}/api/todos`, {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({task})
    }

    );
    
    const newTodo=await response.json();
    setTask("");
    setTodos([...todos,newTodo]);
  };

  const deleteTodo = async (todoId) => {
   
    const response = await fetch(
      `${process.env.React_APP_BACKEND_URL}/api/todos/${todoId}`, 
      {
      method:"DELETE",
    
    },

    );
    if (!response.ok) return;
    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));

    //const newTodo=await response.json();
    //setTask("");
    //setTodos([...todos,newTodo]);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <form className="form" onSubmit={createTodo}>
          <input 
            type="text"
            className="form_input"
            placeholder="Add a new Todo..."
            required
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />
          <button type="submit" className="todo_add_button">Create Todo</button>
        </form>
        <div>
          {todos.length>0?(
            todos.map((todo)=>(
              <div key={todo._id} className="todo_item">
                <p>
                  {todo.task}
                </p>
                <p>
                  {todo.status?"completed":"Pending"}
                </p>
              </div>
            ))
          ):(
            <div>
              <p>No data</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
