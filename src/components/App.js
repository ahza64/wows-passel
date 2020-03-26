import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Form} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

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
      <Form>
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
        </Form.Row>

        <Button variant="primary" type="submit" onClick={e => this.onFormConcealmentSubmit(e)}>
          Concealments
        </Button>
        <Button variant="primary" type="submit" onClick={e => this.onFormHEDPMSubmit(e)}>
          HE DPM
        </Button>
      </Form>

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
