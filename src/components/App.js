import React from 'react';
import {Bar} from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ships: [],
      hedps: [288],
      type: "Cruiser",
      nation: "usa",
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

  // componentDidMount() {
  //   fetch(`/api/wg/${this.state.type}/${this.state.nation}`)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({
  //       ships: data,
  //       hedps: data.hedps,
  //       chartData: {
  //         labels: data.labels,
  //         datasets: [
  //           {
  //             label: 'concealment',
  //             backgroundColor: 'rgba(75,192,192,1)',
  //             borderColor: 'rgba(0,0,0,1)',
  //             borderWidth: 2,
  //             data: data.datasets[0].data
  //           }
  //         ]
  //       }
  //     });
  //   })
  //   .catch( err => {
  //     console.log(err);
  //   })
  // }

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
        field: "concealments",
        ships: data,
        chartData: {
          labels: data.labels,
          datasets: [
            {
              label: 'concealment',
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

  render() {
    return (
    <div>
      <h1>World of Warships data visualisation</h1>
      <p>
        click a button, to retrive and graph data from WG api
      </p>
      <form onSubmit={e => this.onFormSubmit(e)}>
        <div>
          <div>
          <div>
          Click a value
          </div>
          <button key="1" onClick={e => this.onFormConcealmentSubmit(e)}>
          Concealment
          </button>
          <button key="2" onClick={e => this.onFormHEDPMSubmit(e)}>
          HE dpm
          </button>
          </div>
          <div>
          <label>Class: </label>
          <input
            type="text"
            value={this.state.type}
            onChange={e => this.setState({ type: e.target.value })}
          /> Valid entries: Destroyer, Cruiser, Battleship, AirCarrier
          </div>
          <div>
          <label>Nation: </label>
          <input
            type="text"
            value={this.state.nation}
            onChange={e => this.setState({ nation: e.target.value })}
          /> Valid entires: commonwealth, europe, italy, usa, pan_asia, france, ussr, germany, uk, japan, pan_america
          </div>
        </div>
      </form>
        <Bar
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
      </div>

  )
  }
}

export default App
