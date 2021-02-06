import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Notes from './components/Notes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Notes} />
      </Switch>
    </div>
  );
}

export default App;
