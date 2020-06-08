import React from 'react';
import {Form} from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

class DetailsGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ship1: '',
      ship2: '',
      chartData: {
        labels: ["he dpm","fires per min","rudder shift","turret traverse"],
        datasets: [{
            label: 'Base Hull A',
            backgroundColor: "#caf270",
            data: [60, 30, 20, 50],
        }, {
            label: 'Hull B',
            backgroundColor: "#45c490",
            data: [0, 0, 5, 10],
        }, {
            label: 'gun module',
            backgroundColor: "#008d93",
            data: [20, 10, 0, 0],
        }, {
            label: 'fire signal flags',
            backgroundColor: "#2e5468",
            data: [0, 10, 0, 0],
        }]
      }
    }
  }

  // componentDidMount() {
  //
  //   const chartData11 = this.state.chartData;
  //   const current = chartData11;
  //
  //   fetch(`/ship/Des Moines`)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log("update successful", data[0]);
  //     current.datasets[0].data = data[0].data;
  //     current.datasets[0].label = data[0].label;
  //     console.log("current", current);
  //     this.setState({
  //       chartData: current
  //     });
  //   })
  //   .catch( err => {
  //     console.log(err);
  //   });
  //
  //   fetch(`/ship/Montana`)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log("update successful", data[0]);
  //     current.datasets[1].data = data[0].data;
  //     current.datasets[1].label = data[0].label;
  //     console.log("current", current);
  //     this.setState({
  //       chartData: current
  //     });
  //   })
  //   .catch( err => {
  //     console.log(err);
  //   });
  //
  // }

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
				<h2>Bar Live Data Sample1</h2>
				<Bar
          id="container"
          data={this.state.chartData}
          options={ {
              tooltips: {
                displayColors: true,
                callbacks:{
                  mode: 'x',
                },
              },
              scales: {
                xAxes: [{
                  stacked: true,
                  gridLines: {
                    display: false,
                  }
                }],
                yAxes: [{
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                  },
                  type: 'linear',
                }]
              },
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: { position: 'bottom' },
              }}
              />
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

export default DetailsGraph;
