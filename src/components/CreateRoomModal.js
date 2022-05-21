import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import React, { useState } from "react";
import roomStore from "../stores/roomStore";

export default function CreateRoomModal(props) {
  const [room, setRoom] = useState({
    // _id: "",
    firstName: "",
    lastName: "",
    membership: "silver",
    currentlyBorrowedBooks: [],
    // slug: "",
  });
  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    roomStore.createRoom(room);
    props.closeModal();
  };
  return (
    <Modal centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>First name</InputGroup.Text>
            <Form.Control
              type="text"
              name="firstName"
              onChange={handleChange}
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Last name</InputGroup.Text>
            <Form.Control type="text" name="lastName" onChange={handleChange} />
          </InputGroup>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>membership</Form.Label>
            <Form.Select name="membership" onChange={handleChange}>
              <option>Select</option>
              <option value="platinum"> platinum</option>
              <option value="gold">gold</option>
              <option value="silver">silver</option>
            </Form.Select>
          </Form.Group>
          {/* <InputGroup>
            <InputGroup.Text>membership</InputGroup.Text>
            <Form.Control
              type="select"
              name="membership"
              onChange={handleChange}
            />
          </InputGroup> */}
          <br />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Create room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
