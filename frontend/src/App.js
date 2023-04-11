import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { getAllTodos } from "./api";
import Header from "./components/Header";
import TodoCreate from "./components/TodoCreate";
import Filter from "./components/Filter";
import Item from "./components/Item";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Header />
      <TodoCreate />
      <div className="p-2 mx-4 border-black-25 border-bottom"></div>
      <Filter />
      <div className="row mx-1 px-5 pb-3 w-80">
        <div className="col mx-auto">
          {todos.map((todo) => (
            <Item key={todo.id} {...todo} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
