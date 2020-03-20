import React from 'react';
import {Bar} from 'react-chartjs-2';

// const state = {
//   labels: ["Arashi", "[Shimakaze]", "AL Yukikaze", "HSF Harekaze", "Shinonome",
//     "Asashio B", "Asashio", "Hayate", "Yūdachi", "Kitakaze", "Harugumo",
//     "Yūgumo", "Kagerō", "Shiratsuyu", "Hatsuharu", "Akizuki", "Akatsuki",
//     "Fubuki", "Mutsuki", "Kamikaze R", "Kamikaze", "Wakatake", "Fūjin",
//     "Tachibana Lima", "Shimakaze", "Minekaze", "Isokaze", "Umikaze", "Tachibana"],
//   datasets: [
//     {
//       label: 'Concealment',
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [6.8, 7.1, 6.8, 6.8, 7, 6.8, 6.8, 7.7, 7, 7.6, 7.9, 7, 6.8, 6.7,
//         6.7, 7.8, 7.4, 7, 6.2, 6.2, 6.2, 6.1, 6.2, 5.4, 7.1, 6.2, 6.1, 5.6, 5.4]
//     }
//   ]
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    fetch("/api/wg")
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
      <h1>Loading WG live data on nodeJS with react!!</h1>
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
