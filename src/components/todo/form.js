import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const TodoForm = (props) => {

  const [item, setItem] = useState({});

  const _handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value })
  };

  const _handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
  };

  return (
    <>
      <Form onSubmit={_handleSubmit}>
        <Card style={{ width: '18rem' }}>
        <h3>Add TO DO Item</h3>
          <Card.Body>
            <Card.Title>Your Info</Card.Title>
            <Form.Group controlId="formBasicRange">
              <Form.Label>To Do Item</Form.Label>
              <Form.Control name="text" placeholder="Add To Do List Item" onChange={_handleInputChange} />
              <Form.Label>Difficulty Rating</Form.Label>
              <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={_handleInputChange} />
              <Form.Label>Assigned To</Form.Label>
              <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={_handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Form</Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default TodoForm;