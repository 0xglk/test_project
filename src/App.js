import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MembershipList from './components/MembershipList';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route exact path="/">
            <center>
              <MembershipList />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
