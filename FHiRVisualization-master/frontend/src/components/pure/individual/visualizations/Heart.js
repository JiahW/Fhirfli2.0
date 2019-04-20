import React from 'react';
import {VictoryLabel, VictoryChart, VictoryLine,VictoryBar, Bar, VictoryBrushContainer, VictoryAxis} from 'victory';
import * as PropTypes from 'prop-types';
import heartDataParser from '../../../../../../Fitbit JSON fake user data/heartparser';
import weightDataParser from '../../../../../../Fitbit JSON fake user data/weightdataparser';
import HeartFakeData from '../../../../../../Fitbit JSON fake user data/activites-heart';
import weightFakeData from '../../../../../../Fitbit JSON fake user data/weight';
import axios from 'axios';

var avgHeartValues = heartDataParser(HeartFakeData);
var dateslist = weightDataParser(weightFakeData)[1];

// console.log(avgHeartValues);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data:'',
      clicked: false,
      style: {
        data: { fill: "green" }
      }
    };
  }
  //console.log("sssss"+JSON.stringify(response.data["fitbitdata"]) + "" + response.status)

  // componentDidMount()
  // {
  //   axios.get('/api/fitbitdata')
  //   .then(response => this.setState({data: heartDataParser(JSON.stringify(response.data)) } , () => {
  //     console.log(""+this.state.data);
  //   }).catch(err => console.log("" +err)));
    
  // }

  render() {
    const handleMouseOver = () => {
      const fillColor = this.state.clicked ? "grey" : "green";
      const clicked = !this.state.clicked;
      this.setState({
        clicked,
        style: {
          data: { fill: fillColor }
        }
      });
    };


    

    return (
      <div>
        <VictoryChart height={400} width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
        >
        <VictoryLabel style={{fontSize: 35,stroke: "green"}} text="Heart" x={210} y={30} textAnchor="middle"/>
          <VictoryBar
            dataComponent={
              <Bar events={{ onMouseOver: handleMouseOver }}/>
            }
            style={this.state.style}
            data={[
              // { x: "30 - 90", y: this.state.data[0] },
              // { x: "90 - 130", y: this.state.data[1] },
              // { x: "130 - 160", y: this.state.data[2] },
              // { x: "160 - 220", y: this.state.data[3] }

              { x: "30 - 90", y: avgHeartValues[0] },
              { x: "90 - 130", y: avgHeartValues[1] },
              { x: "130 - 160", y: avgHeartValues[2] },
              { x: "160 - 220", y: avgHeartValues[3] }

            ]}
          />
        </VictoryChart>
      </div>
    );
  }
 }
