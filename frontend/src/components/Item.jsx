import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Item() {
  return (
    <Row className="px-3 align-items-center todo-item rounded">
      <Col className="col-auto m-1 p-0 d-flex align-items-center">
        <h2 className="m-0 p-0">
          <FontAwesomeIcon
            icon={icon({ name: "square" })}
            className="text-primary btn m-0 p-0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Mark as complete"
          />
          <FontAwesomeIcon
            icon={icon({ name: "check-square" })}
            className="text-primary btn m-0 p-0 d-none"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Mark as todo"
          />
        </h2>
      </Col>
      <Col className="px-1 m-1 d-flex align-items-center">
        <Form.Control
          type="text"
          className="form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
          readonly
          value="Renew car insurance"
          title="Renew car insurance"
        />
        <Form.Control
          type="text"
          className="form-control-lg border-0 edit-todo-input rounded px-3 d-none"
          value="Renew car insurance"
        />
      </Col>
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
            <h6 className="text my-2 pr-2">28th Jun 2020</h6>
          </Col>
        </Row>
      </Col>
      <Col className="col-auto m-1 p-0 todo-actions">
        <Row className="d-flex align-items-center justify-content-end">
          <h5 className="m-0 p-0 px-2">
            <FontAwesomeIcon
              icon={icon({ name: "pencil" })}
              className="text-info btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit todo"
            />
          </h5>
          <h5 className="m-0 p-0 px-2">
            <FontAwesomeIcon
              icon={icon({ name: "trash" })}
              className="text-danger btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete todo"
            />
          </h5>
        </Row>
        <Row className="todo-created-info">
          <Col className="col-auto d-flex align-items-center pr-2">
            <FontAwesomeIcon
              icon={icon({ name: "info-circle" })}
              className="my-2 px-2 text-black-50 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title=""
              data-original-title="Created date"
            />
            <Form.Label className="date-label my-2 text-black-50">
              28th Jun 2020
            </Form.Label>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
