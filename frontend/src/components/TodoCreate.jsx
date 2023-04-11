import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "react-bootstrap/Button";

export default function TodoCreate() {
  return (
    <Row className="m-1 p-3">
      <Col className="col-11 mx-auto">
        <Row className="bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
          <Col>
            <Form.Control
              className="form-control-lg border-0 add-todo-input bg-transparent rounded"
              type="text"
              placeholder="Add new .."
            />
          </Col>
          <Col className="col-auto m-0 px-2 d-flex align-items-center">
            <Form.Label
              variant="secondary"
              className="my-2 p-0 px-1 view-opt-label due-date-label d-none"
            >
              Due date not set
            </Form.Label>
            <FontAwesomeIcon
              icon={icon({ name: "calendar" })}
              className="my-2 px-1 text-primary btn due-date-button"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Set a Due date"
            />
            <FontAwesomeIcon
              icon={icon({ name: "calendar-xmark" })}
              className="my-2 px-1 text-danger btn clear-due-date-button d-none"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Clear Due date"
            />
          </Col>
          <Col className="col-auto px-0 mx-0 mr-2">
            <Button type="button" variant="primary">
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
