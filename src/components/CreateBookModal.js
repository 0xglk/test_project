import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import React, { useState } from "react";
import roomStore from "../stores/booksStore";

const genresArray =[];

export default function CreateBookModal(props) {
  const [room, setRoom] = useState({
    author: "",
    title: "",
    genres: [],
    available: true,
    borrowedBy: [],
    image: "",
  });

  const handleChange1 = (event) => {
    if (event.target.checked === true) {
      genresArray.push(event.target.value);
      console.log(genresArray);

    } else {
      const index = genresArray.indexOf(event.target.value);
      if (index > -1) {
        genresArray.splice(index, 1);
        console.log(genresArray);
      }
    }

  };
  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value, "genres": genresArray});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    roomStore.createRoom(room);
    props.closeModal();
  };
  return (
    <Modal centered show={props.isOpen} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text>author</InputGroup.Text>
            <Form.Control type="text" name="author" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>title</InputGroup.Text>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Text>Image</InputGroup.Text>
            <Form.Control type="text" name="image" onChange={handleChange} />
          </InputGroup>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check  onChange={handleChange1} type="checkbox" value="Fantasy" label="Fantasy" />
          <Form.Check  onChange={handleChange1} type="checkbox" value="Action" label="Action" />
          <Form.Check  onChange={handleChange1} type="checkbox" value="Mystery" label="Mystery" />
           </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>genres</Form.Label>
            <Form.Select name="genres" onChange={handleChange}>
              <option>Select</option>
              <option value="Fantasy">Fantasy</option>
              <option value="gold">gold</option>
              <option value="silver">silver</option>
            </Form.Select>
          </Form.Group> */}
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
