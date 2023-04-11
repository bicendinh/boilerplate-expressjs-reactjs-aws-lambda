import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Filter() {
  return (
    <Row className="m-1 p-3 px-5 justify-content-end">
      <Col className="col-auto d-flex align-items-center">
        <Form.Label className="text-secondary my-2 pr-2 view-opt-label">
          Filter
        </Form.Label>
        <Form.Select className="custom-select custom-select-sm btn my-2">
          <option value="all" selected>
            All
          </option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
          <option value="has-due-date">Has due date</option>
        </Form.Select>
      </Col>
      <Col className="col-auto d-flex align-items-center px-1 pr-3">
        <Form.Label className="text-secondary my-2 pr-2 view-opt-label">
          Sort
        </Form.Label>

        <Form.Select className="custom-select custom-select-sm btn my-2">
          <option value="added-date-asc" selected>
            Added date
          </option>
          <option value="due-date-desc">Due date</option>
        </Form.Select>
        <FontAwesomeIcon
          icon={icon({ name: "sort-amount-asc" })}
          className="text-info btn mx-0 px-0 pl-1"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Ascending"
        />
        <FontAwesomeIcon
          icon={icon({ name: "sort-amount-desc" })}
          className="text-info btn mx-0 px-0 pl-1 d-none"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Descending"
        />
      </Col>
    </Row>
  );
}
