import React from 'react';
import {Col} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

import CompileGraph from './shipsCompile';
import CompareGraph from './shipsCompare';

import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphType: "compile"
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

  handleGraphTypeChange(e) {
    e.preventDefault();
    e.persist();
    this.setState({graphType: e.target.value});
  }

  render() {
    return (
    <div id="background" >
      <Container>
        <h1 id="title">
          <Button variant="outline-secondary" onClick={e => this.updateDB(e)}>update DB</Button>
          World of Warships data visualisation
          <Form >
          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Control name="type" as="select" onChange={e => this.handleGraphTypeChange(e)} value={this.state.graphType}>
            <option value="compile">Compile Graph</option>
            <option value="compare">Compare Graph</option>
          </Form.Control>
          </Form.Group>
          </Form.Row>
          </Form>
        </h1>
        {this.state.graphType === "compile" &&
          <CompileGraph />
        }
        {this.state.graphType === "compare" &&
          <CompareGraph />
        }
      </Container>
    </div>

  )
  }
}

export default App
