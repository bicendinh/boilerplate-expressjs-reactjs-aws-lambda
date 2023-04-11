import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import { getAllUsers } from "./api";
import Header from "./components/Header";
import TodoCreate from "./components/TodoCreate";
import Filter from "./components/Filter";
import Item from "./components/Item";

function App() {
  useEffect(() => {
    getAllUsers().then((users) => console.log(users));
  }, []);

  return (
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Header />
      <TodoCreate />
      <div class="p-2 mx-4 border-black-25 border-bottom"></div>
      <Filter />
      <div class="row mx-1 px-5 pb-3 w-80">
        <div class="col mx-auto">
          <Item />
          <Item />
        </div>
      </div>
    </Container>
  );
}

export default App;
