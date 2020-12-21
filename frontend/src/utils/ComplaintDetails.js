import React from "react";
import { Accordion, Card, Button, Badge } from "react-bootstrap";

function ComplaintDetails(props) {
  function a(ele) {
    function badge(status) {
      if (status === "In Progress") {
        return <Badge variant="secondary">{status}</Badge>;
      } else if (status === "Completed") {
        return <Badge variant="success">{status}</Badge>;
      } else if (status === "Rejected") {
        return <Badge variant="danger">{status}</Badge>;
      }
    }
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={ele._id}>
            id: {ele._id} | Level: {ele.level} | {badge(ele.status)}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={ele._id}>
          <Card.Body>
            <b>Category: {ele.category}</b>
            <br />
            <p>{ele.complaintDetail} </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
  if (props.complaints.length === 0) {
    return <h5 className="center">No Complaints Available</h5>;
  }
  return <Accordion defaultActiveKey="0">{props.complaints.map(a)}</Accordion>;
}

export default ComplaintDetails;
