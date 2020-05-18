import React from 'react';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

import CompileGraph from './shipsCompile';

import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ships: [],
      type: "Cruiser",
      nation: "usa",
      tier: 3,
      field: "concealments",
      field2: "----",
      field3: "----",
      headerField: "Tier 3",
      chartData: {
        labels: ["Erie", "Chester", "Albany", "St Louis", "Atlanta"],
        datasets: [
          {
            label: 'Concealment',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [8.3, 8.5, 8.8, 11, 11]
          }
        ]
      }
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
