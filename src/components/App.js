import React from 'react';
import {Bar} from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "AirCarrier",
      nation: "usa",
      data: {
        labels: ["Arashi"],
        datasets: [
          {
            label: 'Concealment',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [6.8]
          }
        ]
      }
    }
  }

  componentDidMount() {
    fetch(`/api/wg/${this.state.type}/${this.state.nation}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        data: data
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.type, this.state.nation);
    fetch(`/api/wg/${this.state.type}/${this.state.nation}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        data: data
      });
    })
    .catch( err => {
      console.log(err);
    })
  }

  render() {
    return (
    <div>
      <h1>full cycle external api,</h1>
      <h3>enter values in the form and submit to retrive and graph concealment values from WG api</h3>
      <form onSubmit={e => this.onFormSubmit(e)}>
        <div>
          <div>
          <label>class</label>
          <input
            type="text"
            value={this.state.type}
            onChange={e => this.setState({ type: e.target.value })}
          /> Destroyer, Cruiser, Battleship, AirCarrier
          </div>
          <div>
          <label>nation</label>
          <input
            type="text"
            value={this.state.nation}
            onChange={e => this.setState({ nation: e.target.value })}
          />commonwealth, europe, italy, usa, pan_asia, france, ussr, germany, uk, japan, pan_america
          </div>
          <div>
          <button onClick={e => this.onFormSubmit(e)}>
            Submit
          </button>
          </div>
        </div>
      </form>
        <Bar
          data={this.state.data}
          options={{
            title:{
              display:true,
              text:`${this.state.nation} ${this.state.type} Concealments`,
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
