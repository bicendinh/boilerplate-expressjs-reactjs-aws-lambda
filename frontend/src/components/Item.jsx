import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext, useRef, useState } from "react";
import moment from "moment";
import AppContext from "../AppContext";
import { deleteTodo, updateTodo } from "../api";

export default function Item({ name, itemId, completed, duedate, created }) {
  const { reloadTodos } = useContext(AppContext);
  const dateRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [nameState, setNameState] = useState(name);
  const [activing, setActiving] = useState(false);
  const [checkUpdating, setCheckUpdating] = useState(false);

  const deleteItem = async () => {
    setActiving(true);
    await deleteTodo(itemId);
    await reloadTodos();
  };

  const onClickCheck = async () => {
    setCheckUpdating(true);
    await updateTodo(itemId, { completed: !completed });
    await reloadTodos();
    setCheckUpdating(false);
  };

  const saveItem = async () => {
    setActiving(true);
    await updateTodo(itemId, {
      name: nameState,
      duedate: new Date(dateRef.current.value).getTime(),
    });
    await reloadTodos();
    setEditing(false);
    setActiving(false);
  };

  const duedateString = duedate ? moment(duedate).format("Do MMMM YYYY") : null;
  const createdString = moment(created).format("Do MMMM YYYY");

  return (
    <Row className="px-3 align-items-center todo-item rounded">
      <Col className="col-auto m-1 p-0 d-flex align-items-center">
        {checkUpdating ? (
          <Spinner animation="grow" variant="primary" size="sm" />
        ) : (
          <h2 className="m-0 p-0" onClick={onClickCheck}>
            {completed ? (
              <FontAwesomeIcon
                icon={icon({ name: "check-square" })}
                className="text-primary btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Mark as complete"
              />
            ) : (
              <FontAwesomeIcon
                icon={icon({ name: "square" })}
                className="text-primary btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Mark as todo"
              />
            )}
          </h2>
        )}
      </Col>
      <Col className="px-1 m-1 d-flex align-items-center">
        <Form.Control
          type="text"
          className={`form-control-lg border-0 edit-todo-input rounded px-3 ${
            editing ? "" : "bg-transparent"
          }`}
          disabled={!editing}
          value={editing ? nameState : name}
          onChange={(event) => setNameState(event.target.value)}
          title={name}
        />
        {editing && (
          <Col className="col-auto d-flex align-items-center rounded bg-white border border-warning ms-3">
            <Form.Control
              type="date"
              ref={dateRef}
              defaultValue={duedateString}
            />
          </Col>
        )}
      </Col>
      {duedateString && (
        <Col className="col-auto m-1 p-0 px-3">
          <Row>
            <Col className="col-auto d-flex align-items-center rounded bg-white border border-warning">
              <FontAwesomeIcon
                icon={icon({ name: "hourglass-2" })}
                className="text-primary my-2 px-2 text-warning btn"
                data-toggle="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Due on date"
              />
              <h6 className="text my-2 pr-2">{duedateString}</h6>
            </Col>
          </Row>
        </Col>
      )}
      <Col className="col-auto m-1 p-0 todo-actions">
        {activing ? (
          <Spinner size="sm" />
        ) : (
          <Row className="d-flex align-items-center justify-content-end">
            {editing ? (
              <h5 className="m-0 p-0 px-2 btn-action" onClick={saveItem}>
                <FontAwesomeIcon
                  icon={icon({ name: "save" })}
                  className="text-info btn m-0 p-0"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Edit todo"
                />
              </h5>
            ) : (
              <h5
                className="m-0 p-0 px-2 btn-action"
                onClick={() => setEditing(true)}
              >
                <FontAwesomeIcon
                  icon={icon({ name: "pencil" })}
                  className="text-info btn m-0 p-0"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Edit todo"
                />
              </h5>
            )}

            <h5 className="m-0 p-0 px-2 btn-action" onClick={deleteItem}>
              <FontAwesomeIcon
                icon={icon({ name: "trash" })}
                className="text-danger btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Delete todo"
              />
            </h5>
          </Row>
        )}

        <Row className="todo-created-info">
          <Col className="col-auto d-flex align-items-center pr-2">
            <FontAwesomeIcon
              icon={icon({ name: "info-circle" })}
              className="my-2 px-2 text-black-50 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Created date"
              data-original-title="Created date"
            />
            <Form.Label className="date-label my-2 text-black-50">
              {createdString}
            </Form.Label>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
