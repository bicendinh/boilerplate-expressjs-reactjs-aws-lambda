import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext, useState } from "react";
import AppContext from "../AppContext";

export default function Filter() {
  const { setFilterAndSort } = useContext(AppContext);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("added-date");
  const [isAsc, setAsc] = useState(true);

  return (
    <Row className="m-1 p-3 px-5 justify-content-end">
      <Col className="col-auto d-flex align-items-center">
        <Form.Label className="text-secondary my-2 pr-2 view-opt-label">
          Filter
        </Form.Label>
        <Form.Select
          className="custom-select custom-select-sm btn my-2"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setFilterAndSort(event.target.value, sort + isAsc ? "+" : "-");
          }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
          <option value="has-duedate">Has due date</option>
        </Form.Select>
      </Col>
      <Col className="col-auto d-flex align-items-center px-1 pr-3">
        <Form.Label className="text-secondary my-2 pr-2 view-opt-label">
          Sort
        </Form.Label>

        <Form.Select
          className="custom-select custom-select-sm btn my-2"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setFilterAndSort(filter, event.target.value + isAsc ? "+" : "-");
          }}
        >
          <option value="added-date">Added date</option>
          <option value="duedate">Due date</option>
        </Form.Select>
        {isAsc ? (
          <FontAwesomeIcon
            icon={icon({ name: "sort-amount-asc" })}
            className="text-info btn mx-0 px-0 pl-1"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Ascending"
            onClick={() => {
              setAsc(!isAsc);
              setFilterAndSort(filter, sort + "-");
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={icon({ name: "sort-amount-desc" })}
            className="text-info btn mx-0 px-0 pl-1"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Descending"
            onClick={() => {
              setAsc(!isAsc);
              setFilterAndSort(filter, sort + "+");
            }}
          />
        )}
      </Col>
    </Row>
  );
}
