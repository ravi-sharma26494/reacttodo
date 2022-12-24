import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId]= useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(editId){
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t)=> 
      t.id === editTodo.id 
      ? (t = { id: t.id, todo })
      : { id: t.id, todo: t.todo}
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo('');
    }
    // console.log(todos)
  };

  const handleDelete=(id)=>{
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo])
  }

  const handleEdit =(id)=>{
  const editTodo = todos.find((i)=> i.id === id);
    // console.log(editTodo)
    setTodo(editTodo.todo)
    setEditId(id);
  }
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <form className="todo__form" onSubmit={handleSubmit}>
          <input type={"text"} value = {todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit"> {editId ? "Edit": "Go"} </button>
        </form>
        <ul className="all__todos">
          {todos.map((t) => (
            <li className="single__todo" key={t.id}>
              <span className="single__todo--text" key={t.id}>{t.todo}</span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
