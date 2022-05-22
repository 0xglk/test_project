import axios from 'axios';
import { makeObservable, observable, action } from 'mobx';
import slugify from 'react-slugify';
class MembershipStore {
  membership = [
    {
        _id: "628514d5b8273a86534c95b8",
        firstName: "Aziz",
        lastName: "AlSaffar",
        membership: "gold",
        currentlyBorrowedBooks: [],
        slug: "aziz-alsaffar",
    },
  ];

  constructor() {
    makeObservable(this, {
      membership: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
    });
  }
fetchRooms = async () =>{
  try {
    const membership = await axios.get(`https://library-borrow-system.herokuapp.com/api/members`);
    this.membership = membership.data; 
  } catch (error) {
    console.log(error);
  }
}
  createRoom = (membership) => {
    membership.id = this.membership[this.membership.length - 1].id + 1;
    membership.slug = slugify(membership.title);
    this.membership.push(membership);
    try {
      axios.post("https://coded-task-axios-be.herokuapp.com/rooms",membership);
    } catch (error) {
      console.log(error);
    }
  };

  deleteRoom = async (membershipId) => {
    // this.rooms = this.rooms.filter((room) => room.id !== roomId);
    try {
      this.membership = this.membership = this.membership.filter((membership) => membership.id !== membershipId);
      await axios.delete(`https://coded-task-axios-be.herokuapp.com/rooms/${membershipId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  updateRoom = async (updatedRoom) => {
    const room = this.membership.find((room) => room.id === updatedRoom.id);
    room.title = updatedRoom.title;
    room.description = updatedRoom.description;
    room.image = updatedRoom.image;

    try {
      await axios.put(`https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,updatedRoom)
    } catch (error) {
      console.log(error);
    }
  };
}

const membershipStore = new MembershipStore();
membershipStore.fetchRooms();
export default membershipStore;
