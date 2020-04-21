import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Form} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {Container} from 'react-bootstrap';

import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ships: [],
      hedps: [288],
      type: "Cruiser",
      nation: "usa",
      tier: 3,
      field: "sample, click buttons above to retireve and render more data",
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
    fetch(`/api/wg/${this.state.type}/${this.state.nation}/hedpm`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        field: "HE DPM",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'HE DPM',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.datasets[0].data
            }
          ]
        }
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  onFormConcealmentSubmit(e) {
    e.preventDefault();
    console.log(this.state.type, this.state.nation);
    fetch(`/api/wg/${this.state.type}/${this.state.nation}/concealment`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        field: "Concealments",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'Concealment',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.datasets[0].data
            }
          ]
        }
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  onFormHEDPMSubmit(e) {
    e.preventDefault();
    console.log(this.state.type, this.state.nation);
    fetch(`/api/wg/${this.state.type}/${this.state.nation}/hedpm`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      this.setState({
        field: "HE DPM",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'HE DPM',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.datasets[0].data
            }
          ]
        }
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  onFormHEAlphaSubmit(e) {
    e.preventDefault();
    console.log(this.state.type, this.state.nation);
    fetch(`/api/wg/${this.state.type}/${this.state.nation}/healpha`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      this.setState({
        field: "HE alpha",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'HE alpha',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.datasets[0].data
            }
          ]
        }
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  onFormTraverseSubmit(e) {
    e.preventDefault();
    console.log(this.state.type, this.state.nation);
    fetch(`/api/wg/${this.state.type}/${this.state.nation}/traverse`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      this.setState({
        field: "Turret Traverse",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'Turret Traverse',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.datasets[0].data
            }
          ]
        }
      });
    })
    .catch( err => {
      console.log(err);
    })
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

  onFormSubmitConcealmentsByTier(e) {
    e.preventDefault();
    fetch(`/ships/concealments/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.tier
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  onFormSubmitHEDPMByTier(e) {
    e.preventDefault();
    fetch(`/ships/hedpm/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.tier
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  onFormSubmitHEAlphaByTier(e) {
    e.preventDefault();
    fetch(`/ships/healpha/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.tier
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  onFormSubmitTraverseByTier(e) {
    e.preventDefault();
    fetch(`/ships/traverse/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.tier
      })
    })
    .catch( err => {
      console.log(err);
    });
  }

  onFormSubmitRudderByTier(e) {
    e.preventDefault();
    fetch(`/ships/rudder/bytier/${this.state.tier}/${this.state.type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data);
      this.setState({
        chartData: data,
        nation: this.state.tier
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
              text:`${this.state.nation} ${this.state.type} ${this.state.field}`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

        <div id="form">
        <p>
          click a button, to retrive and graph data from WG api
        </p>

        <Form >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Class</Form.Label>
              <Form.Control as="select" onChange={e => this.setState({ type: e.target.value })} value={this.state.type}>
                <option>Destroyer</option>
                <option>Cruiser</option>
                <option>Battleship</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Nation</Form.Label>
              <Form.Control as="select" onChange={e => this.setState({ nation: e.target.value })} value={this.state.nation}>
                <option>commonwealth</option>
                <option>europe</option>
                <option>italy</option>
                <option>usa</option>
                <option>pan_asia</option>
                <option>france</option>
                <option>ussr</option>
                <option>germany</option>
                <option>uk</option>
                <option>japan</option>
                <option>pan_america</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Tier</Form.Label>
              <Form.Control as="select" onChange={e => this.setState({ tier: e.target.value })} value={this.state.tier}>
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
          </Form.Row>
          <div>by tier</div>
          <ButtonGroup>
            <Button variant="primary" type="submit" onClick={e => this.onFormSubmitConcealmentsByTier(e)}>
              Concealments
            </Button>
            <Button variant="warning" type="submit" onClick={e => this.onFormSubmitHEDPMByTier(e)}>
              HE DPM
            </Button>
            <Button variant="danger" type="submit" onClick={e => this.onFormSubmitHEAlphaByTier(e)}>
              HE Alpha α
            </Button>
            <Button variant="secondary" type="submit" onClick={e => this.onFormSubmitTraverseByTier(e)}>
              Turret Traverse
            </Button>
            <Button variant="info" type="submit" onClick={e => this.onFormSubmitRudderByTier(e)}>
              Rudder Shift
            </Button>
          </ButtonGroup>
          <div>by nation</div>
          <ButtonGroup>
            <Button variant="primary" type="submit" onClick={e => this.onFormConcealmentSubmit(e)}>
              Concealments
            </Button>
            <Button variant="warning" type="submit" onClick={e => this.onFormHEDPMSubmit(e)}>
              HE DPM
            </Button>
            <Button variant="danger" type="submit" onClick={e => this.onFormHEAlphaSubmit(e)}>
              HE Alpha α
            </Button>
            <Button variant="secondary" type="submit" onClick={e => this.onFormTraverseSubmit(e)}>
              Turret Traverse
            </Button>
          </ButtonGroup>
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
