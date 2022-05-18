import React from 'react';
import Membershipitem from './Membershipitem';
import membershipStore from '../stores/membershipStore';
import { observer } from 'mobx-react';
function MembershipList() {

  const membershipList = membershipStore.membership.map((membership) => {
    return <Membershipitem membership= {membership} key={membership._id} />;
  });
  return (
    <div className="main__chatlist">
      <center>
        <div className="chatlist__heading">
          <h2>Users List</h2>
        </div>
      </center>

      <div className="chatlist__items">{membershipList}</div>
    </div>
  );
}
export default observer(MembershipList);
