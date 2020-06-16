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
        labels: ["hit points","HE DPM","AP DPM","Torp DPM"],
        datasets: [{
            label: 'Base',
            backgroundColor: "#caf270",
            data: [60, 30, 20, 50],
        }, {
            label: 'max ship modules',
            backgroundColor: "#45c490",
            data: [0, 0, 5, 10],
        }, {
            label: 'max upgrades',
            backgroundColor: "#008d93",
            data: [20, 10, 0, 0],
        }, {
            label: 'max commander skills',
            backgroundColor: "#2e5468",
            data: [0, 10, 0, 0],
        }, {
            label: 'max singal flags',
            backgroundColor: "#2e5468",
            data: [0, 10, 0, 0],
        }]
      }
    }
  }

  componentDidMount() {
    fetch(`ship/Fletcher`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("component did moiunt", data);
      // aggregate data here
      // console.log(data.modules.hull[0].profile.hull.health - data.default_profile.hull.health);
      let chartData = this.state.chartData;
      chartData.datasets[0].data[0] = data.default_profile.hull.health;
      chartData.datasets[1].data[0] = data.modules.hull[0].profile.hull.health - data.default_profile.hull.health;
      // need to update DB aggregation to include dpm and fpm calculations

      this.setState({
        chartData: chartData
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleShip1Change(e) {
    e.preventDefault();
    e.persist();
    fetch(`ship/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("component did moiunt", data);
      // aggregate data here
      console.log(data.modules.hull[0].profile.hull.health - data.default_profile.hull.health);
      let chartData = this.state.chartData;
      chartData.datasets[0].data[0] = data.default_profile.hull.health;
      chartData.datasets[1].data[0] = data.modules.hull[0].profile.hull.health - data.default_profile.hull.health;
      // need to update DB aggregation to include dpm and fpm calculations

      this.setState({
        chartData: chartData
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
		return (
			<div className="flex flex-col items-center w-full max-w-md">
				<h2>Stacked Bar Live Data Sample</h2>
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
          </Form>
			</div>
		);
	}



}

export default DetailsGraph;
