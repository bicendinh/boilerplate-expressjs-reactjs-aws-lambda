import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { getAllTodos } from "./api";
import Header from "./components/Header";
import TodoCreate from "./components/TodoCreate";
import Filter from "./components/Filter";
import Item from "./components/Item";
import AppContext from "./AppContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("added-date+");

  const getFilterTodos = (todos, filterBy, sortBy) => {
    let newTodos = todos;
    if (filterBy === "completed")
      newTodos = todos.filter((todo) => todo.completed);
    else if (filterBy === "active")
      newTodos = todos.filter((todo) => !todo.completed);
    else if (filterBy === "has-duedate")
      newTodos = todos.filter((todo) => todo.duedate);
    const bias = sortBy.includes("+") ? -1 : 1;
    if (sortBy.includes("added-date"))
      newTodos = newTodos.sort(
        (a, b) =>
          bias * (new Date(a.created).getTime() - new Date(b.created).getTime())
      );
    else
      newTodos = newTodos.sort(
        (a, b) =>
          bias * (new Date(a.duedate).getTime() - new Date(b.duedate).getTime())
      );

    setDisplayTodos(newTodos);
  };
  const reloadTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
    getFilterTodos(todos, filterBy, sortBy);
  };

  const setFilterAndSort = (filterBy, sortBy) => {
    setFilterBy(filterBy);
    setSortBy(sortBy);
    setTodos(todos);
    getFilterTodos(todos, filterBy, sortBy);
  };

  useEffect(() => {
    reloadTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ reloadTodos, setFilterAndSort }}>
      <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
        <Header />
        <TodoCreate />
        <div className="p-2 mx-4 border-black-25 border-bottom"></div>
        <Filter />
        <div className="row mx-1 px-5 pb-3 w-80">
          <div className="col mx-auto">
            {displayTodos.map((todo) => (
              <Item key={todo.itemId} {...todo} />
            ))}
          </div>
        </div>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
