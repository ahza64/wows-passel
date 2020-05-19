import React from 'react';
import {Form} from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';

class CompareGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ship1: '',
      ship2: '',
      chartData: {
      	labels: ['Hit Points/1000', 'Concealment', 'Turret Traverse', 'Rudder Shift', 'Full Speed', 'Turn Radius/10', 'Fires per Minute'],
      	datasets: [
      		{
      			label: 'des Moines',
      			backgroundColor: 'rgba(179,181,198,0.2)',
      			borderColor: 'rgba(179,181,198,1)',
      			pointBackgroundColor: 'rgba(179,181,198,1)',
      			pointBorderColor: '#fff',
      			pointHoverBackgroundColor: '#fff',
      			pointHoverBorderColor: 'rgba(179,181,198,1)',
      			data: [50.6, 13.9, 30, 8.6, 33, 77.0, 13.734]
      		},
      		{
      			label: 'montana',
      			backgroundColor: 'rgba(255,99,132,0.2)',
      			borderColor: 'rgba(255,99,132,1)',
      			pointBackgroundColor: 'rgba(255,99,132,1)',
      			pointBorderColor: '#fff',
      			pointHoverBackgroundColor: '#fff',
      			pointHoverBorderColor: 'rgba(255,99,132,1)',
      			data: [96.3, 17.8, 45, 22.2, 30, 95.0, 8.64]
      		}
      	]
      }
    }
  }

  componentDidMount() {

    const chartData11 = this.state.chartData;
    const current = chartData11;

    fetch(`/ship/Des Moines`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data[0]);
      current.datasets[0].data = data[0].data;
      current.datasets[0].label = data[0].label;
      console.log("current", current);
      this.setState({
        chartData: current
      });
    })
    .catch( err => {
      console.log(err);
    });

    fetch(`/ship/Montana`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data[0]);
      current.datasets[1].data = data[0].data;
      current.datasets[1].label = data[0].label;
      console.log("current", current);
      this.setState({
        chartData: current
      });
    })
    .catch( err => {
      console.log(err);
    });

  }

  handleShip1Change(e) {
    e.preventDefault();
    e.persist();
    const chartData11 = this.state.chartData;
    const current = chartData11;

    this.setState({ship1: e.target.value});

    fetch(`/ship/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data[0]);
      current.datasets[0].data = data[0].data;
      current.datasets[0].label = data[0].label;
      console.log("current", current);
      this.setState({
        chartData: current
      });
    })
    .catch( err => {
      console.log(err);
    });

  }

  handleShip2Change(e) {
    e.preventDefault();
    e.persist();
    const chartData11 = this.state.chartData;
    const current = chartData11;

    this.setState({ship2: e.target.value});

    fetch(`/ship/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("update successful", data[0]);
      current.datasets[1].data = data[0].data;
      current.datasets[1].label = data[0].label;
      console.log("current", current);
      this.setState({
        chartData: current
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  render() {
		return (
			<div className="flex flex-col items-center w-full max-w-md">
				<h2>Radar Live Data Sample</h2>
				<Radar
          id="container"
          data={this.state.chartData}
          options={{
            scale: {
              angleLines: {
                color: "rgba(255, 255, 255, 1)"
              },
              gridLines: {
                color: "rgba(255, 255, 255, 1)"
              }
            }
          }} />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="enter first WG ship name" onChange={e => this.handleShip1Change(e)} value={this.state.ship1}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="enter second WG ship name" onChange={e => this.handleShip2Change(e)} value={this.state.ship2}/>
            </Form.Group>
          </Form>
			</div>
		);
	}



}

export default CompareGraph;