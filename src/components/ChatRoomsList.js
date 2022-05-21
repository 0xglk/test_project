import React, { useState } from "react";
import ChatRoomitem from "./ChatRoomitem";
import CreateRoomModal from "./CreateRoomModal";
import roomStore from "../stores/roomStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
// import ChatRoom from "./ChatRoom";
// import BookList from "./BookList";
// import { Route, Switch } from "react-router";
function ChatRoomsList() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const roomsList = roomStore.rooms.map((room) => {
    return <ChatRoomitem room={room} key={room._id} />;
  });
  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span onClick={openModal}>New Member</span>
        <CreateRoomModal isOpen={isOpen} closeModal={closeModal} />
      </button>
      <Link to={`/BookList/bookStuff`}>BookList</Link>
      <center>
        <div className="chatlist__heading">
          <h2>Chat rooms</h2>
        </div>
      </center>

      <div className="chatlist__items">{roomsList}</div>
    </div>
  );
}
export default observer(ChatRoomsList);
