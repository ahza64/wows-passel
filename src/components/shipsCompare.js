import React from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
	labels: ['Hit Points/1000', 'Concealment', 'Turret Traverse', 'Rudder Shift', 'Full Speed', 'Turn Radius/10', 'Fires per Minute'],
	datasets: [
		{
			label: 'Des Moines',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [50.6, 13.9, 30, 8.6, 33, 77.0, 13.734]
		},
		{
			label: 'Montana',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [96.3, 17.8, 45, 22.2, 30, 95.0, 8.64]
		}
	]
};


class CompareGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ships: [],
      type: "Cruiser",
      nation: "usa",
      tier: 5,
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
  render() {
		return (
			<div className="flex flex-col items-center w-full max-w-md">
				<h2>Radar Hard Data Sample</h2>
				<Radar
          id="container"
          data={data}
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
			</div>
		);
	}



}

export default CompareGraph;
