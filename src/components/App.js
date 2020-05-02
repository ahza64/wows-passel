import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Form} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

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

  componentDidMount() {
    fetch(`/ships/${this.state.field}/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        tier: 3,
        nation: this.state.nation,
        field: this.state.field,
        headerField: `Tier ${this.state.tier}`,
      })
    })
    .catch( err => {
      console.log(err);
    });
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

  handleTierChange(e) {
    e.preventDefault();
    e.persist();
    this.setState({tier: e.target.value});
    console.log(this.state.tier);
    fetch(`/ships/${this.state.field}/bytier/${e.target.value}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: `${this.state.nation}`,
        field: `${this.state.field}`,
        headerField: `Tier ${e.target.value}`,
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  handleParameterChange(e) {
    e.preventDefault();
    e.persist();

    this.setState({field: e.target.value});
    fetch(`/ships/${e.target.value}/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.nation,
        field: `${e.target.value}`,
        headerField: `Tier ${this.state.tier}`,
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  handleTypeChange(e) {
    e.preventDefault();
    e.persist();

    this.setState({type: e.target.value});
    fetch(`/ships/${this.state.field}/bytier/${this.state.tier}/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        type: e.target.value,
        nation: this.state.nation,
        field: this.state.field,
        headerField: `Tier ${this.state.tier}`,
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  handleParameter2Change(e) {
    e.preventDefault();
    e.persist();

    this.setState({field2: e.target.value});
    fetch(`/ships/${e.target.value}/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", this.state.chartData.datasets, data.datasets[0].data);
      //check for data length longer than 2, and delete pos[1], the second value in the array. can probably just pop pos[1] every time without a check in JS
      //frontend needs to send order to back end. can probably send order everytime and use the same route
      //color change
      let data1 = this.state.chartData.datasets;
      let data2 = data1.slice(0, 1);
      console.log("slice", data2);
      data2.push(data.datasets[0]);
      data.datasets = data2;
      console.log("data", data);
      this.setState({
        chartData: data,
        nation: this.state.nation,
        field2: `${e.target.value}`,
        headerField: `Tier ${this.state.tier}`,
      })
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

        <Bar id="container"
          data={this.state.chartData}
          options={{
            title:{
              display:true,
              text:`${this.state.headerField} ${this.state.type} ${this.state.field}`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "rgba(255, 255, 255, 0)",
                  }
                }
              ],
              yAxes: [{
                gridLines: {
                  color: "rgba(255, 255, 255, 1)",
                }
              }]
            }
          }}
        />

        <div id="form">
        <p>
          make a selection in the menus below
        </p>

        <Form >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Class</Form.Label>
              <Form.Control name="type" as="select" onChange={e => this.handleTypeChange(e)} value={this.state.type}>
                <option>Destroyer</option>
                <option>Cruiser</option>
                <option>Battleship</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Tier</Form.Label>
              <Form.Control name="tier" as="select" onChange={e => this.handleTierChange(e)} value={this.state.tier}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Parameter 1</Form.Label>
              <Form.Control name="field" as="select" onChange={e => this.handleParameterChange(e)} value={this.state.field}>
                <option value="concealments">Concealments</option>
                <option value="hedpm">HE DPM</option>
                <option value="healpha">HE Alpha</option>
                <option value="traverse">Turret Traverse</option>
                <option value="rudder">Rudder Shift</option>
                <option value="fpm">Fires per min</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Parameter 2</Form.Label>
              <Form.Control name="field2" as="select" onChange={e => this.handleParameter2Change(e)} value={this.state.field2}>
              <option value="----">----</option>
                <option value="concealments">Concealments</option>
                <option value="hedpm">HE DPM</option>
                <option value="healpha">HE Alpha</option>
                <option value="traverse">Turret Traverse</option>
                <option value="rudder">Rudder Shift</option>
                <option value="fpm">Fires per min</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
        </div>
<div>,</div>
<div>,</div>
<div>,</div>
        </Container>
      </div>

  )
  }
}

export default App
