import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

function ComplaintDetails() {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            id: 54987123 &nbsp;&nbsp; Category: Finance
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <b>Level: University Level</b>
            <br />
            <p>
              Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem
              ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
              lorem ipsum Lorem ipsum lorem ipsum{" "}
            </p>
            <b>Status: </b>Incomplete
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            id: 54989483 &nbsp;&nbsp; Category: Admission
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <b>Level: Department Level</b>
            <br />
            <p>
              Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem
              ipsumLorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
              lorem ipsum Lorem ipsum lorem ipsum{" "}
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            id: 54987123 &nbsp;&nbsp; Category: Admission
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <b>Level: College Level</b>
            <br />
            <p>
              I am having an issue with my admission. Please help me as soon as
              you can.{" "}
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default ComplaintDetails;
