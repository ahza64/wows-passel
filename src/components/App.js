import React from 'react';
import {Bar} from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "Cruiser",
      nation: "japan",
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

  render() {
    return (
    <div>
      <h1>Master boilerplate,</h1>
      <h3>react dev server, prod express server, express api to WG api, displaying live data!</h3>
        <Bar
          data={this.state.data}
          options={{
            title:{
              display:true,
              text:'IJN DD Concealments',
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
