import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

function ComplaintDetails(props) {
  function a(ele) {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={ele._id}>
            id: {ele._id} &nbsp;&nbsp; Level: {ele.level}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={ele._id}>
          <Card.Body>
            <b>Category: {ele.category}</b>
            <br />
            <p>{ele.complaintDetail} </p>
            <b>Status: </b>
            {ele.status}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  return <Accordion defaultActiveKey="0">{props.complaints.map(a)}</Accordion>;
}

export default ComplaintDetails;
