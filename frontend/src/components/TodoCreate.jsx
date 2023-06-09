import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useRef, useState } from "react";
import { createTodo } from "../api";
import AppContext from "../AppContext";

export default function TodoCreate() {
  const [submitting, setSummiting] = useState(false);
  const textRef = useRef(null);
  const dateRef = useRef(null);
  const { reloadTodos } = useContext(AppContext);

  const submitTodo = async () => {
    setSummiting(true);
    await createTodo({
      name: textRef.current.value,
      duedate: dateRef.current.value
        ? new Date(dateRef.current.value).getTime()
        : null,
    });
    await reloadTodos();
    textRef.current.value = "";
    dateRef.current.value = "";
    setSummiting(false);
  };

  return (
    <Row className="m-1 p-3">
      <Col className="col-11 mx-auto">
        <Row className="bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
          <Col>
            <Form.Control
              className="form-control-lg border-0 add-todo-input bg-transparent rounded"
              type="text"
              placeholder="Add new .."
              ref={textRef}
              disabled={submitting}
            />
          </Col>
          <Col className="col-auto m-0 px-2 d-flex align-items-center">
            <Form.Label
              variant="secondary"
              className="my-2 p-0 px-1 view-opt-label due-date-label d-none"
            >
              Due date not set
            </Form.Label>
            <Form.Control type="date" ref={dateRef} />
          </Col>
          <Col className="col-auto px-0 mx-0 mr-2">
            <Button
              type="button"
              variant="primary"
              onClick={submitTodo}
              disabled={submitting}
            >
              {submitting ? "Loading…" : "Add"}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
