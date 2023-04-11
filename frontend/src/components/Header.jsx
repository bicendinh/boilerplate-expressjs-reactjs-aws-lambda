import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header() {
  return (
      <Row className="m-1 p-4">
        <Col>
          <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <FontAwesomeIcon
              icon={icon({ name: "check" })}
              className="bg-primary text-white rounded p-2"
            />
            <u>My Todo-s</u>
          </div>
        </Col>
      </Row>
  );
}
