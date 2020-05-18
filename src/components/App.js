import React from 'react';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

import CompileGraph from './shipsCompile';

import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  updateDB(e) {
    e.preventDefault();
    fetch(`/db/updateDB`)
    .then((data) => {
      console.log("update successful");
    })
    .catch( err => {
      console.log(err);
    });
  }

  render() {
    return (
    <div id="background" >
      <Container>
        <h1 id="title">World of Warships data visualisation
          <Button variant="outline-secondary" onClick={e => this.updateDB(e)}>update DB</Button>
        </h1>
        <CompileGraph />
      </Container>
    </div>

  )
  }
}

export default App
