import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import membershipStore from '../stores/membershipStore';
import Memberbooks from './Memberbooks';
function Membershipitem(props) {
  const membership = props.membership;

  const handleDelete = (event) => {
    event.preventDefault();
    membershipStore.deleteRoom(membership._id);
  };
  
  return (
    <div className="group">
      <Link to="">
        <div style={{ animationDelay: '0.1' }} className="chatlist__item">
          <div className="avatar">
            <div className="avatar-img">
              <img src="https://static.thenounproject.com/png/363639-200.png" alt="#" />
            </div>
          </div>
          <div className="userMeta">
            <p>{membership.firstName}, {membership.lastName}</p>
            <span className="activeTime" style={{ color: membership.membership }}>{membership.membership}</span>
            <Memberbooks mybooks={membership.currentlyBorrowedBooks} />
          </div>
        </div>
      </Link>
      <Button className="delete" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
export default Membershipitem;