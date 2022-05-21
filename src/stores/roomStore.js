import { makeObservable, observable, action } from "mobx";
import slugify from "react-slugify";
import axios from "axios";

class RoomStore {
  rooms = [
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
      rooms: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
      createMsg: action,
    });
  }

  fetchRooms = async () => {
    try {
      const rooms = await axios.get(
        "http://library-borrow-system.herokuapp.com/api/members"
      );
      this.rooms = rooms.data;
    } catch (error) {
      console.error(error);
    }
  };

  createRoom = async (room) => {
    room.id = this.rooms[this.rooms.length - 1].id + 1;
    room.slug = slugify(room.title);
    this.rooms.push(room);
    console.log(room);
    try {
      await axios.post(
        "https://library-borrow-system.herokuapp.com/api/members",
        room
      );
    } catch (e) {
      console.log(e);
    }
  };

  deleteRoom = async (roomId) => {
    this.rooms = this.rooms.filter((room) => room.id !== roomId);
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
    } catch (e) {
      console.error(e);
    }
  };
  createMsg = (roomId, msg) => {
    const room = this.rooms.find((_room) => _room.id === +roomId);
    room.messages.push(msg);
  };

  updateRoom = async (updatedRoom) => {
    const room = this.rooms.find((room) => room.id === updatedRoom.id);
    room.title = updatedRoom.title;
    room.description = updatedRoom.description;
    room.image = updatedRoom.image;
    try {
      await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`
      );
    } catch (e) {
      console.error(e);
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;
