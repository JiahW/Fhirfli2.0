import React from 'react';
import {VictoryLabel, VictoryChart, VictoryLine,VictoryBar, Bar, VictoryBrushContainer, VictoryAxis} from 'victory';
import * as PropTypes from 'prop-types';
// import dataParser from '../../../../../../Fitbit JSON fake user data/weightdataparser';
// import weight from '../../../../../../Fitbit JSON fake user data/weight';
import axios from 'axios';

import steps from '../../../../../../Fitbit JSON fake user data/steps';
import stepsDataparser from '../../../../../../Fitbit JSON fake user data/stepsdataparser';


// var stepsList = stepsDataparser(steps)[0];
// var dateslist = stepsDataparser(steps)[1];
// console.log("stepsList" + stepsList);
// console.log("dateslist"+dateslist);
// console.log(new Date(dateslist[0]));

export default class WeightGraph extends React.Component {

  constructor() {
    super();
    this.state = {
      data:[0,0,0,0,0,0,0],
        date:["2011-04-27","2011-04-27","2011-04-27","2011-04-27","2011-04-27","2011-04-27","2011-04-27"],
      clicked: false,
      style: {
        data: { fill: "green" }
      }
    };
  }
    handleZoom(domain) {
      this.setState({ zoomDomain: domain });
    }
    
    componentDidMount()
    {

      axios.get('/api/fitbitdata')
                  .then((response) => {
                    console.log(""+(response.data));
                    var out = stepsDataparser((response.data));
                    this.setState( {data: out[0], date: out[1],  zoomDomain: { x: [new Date(out[1][0]), new Date(out[1][6])]} }  , function()  {console.log("sssss"+this.state.data);
                  }).catch(err => {console.log("errr" +err)})}).catch(err => {console.log("errr2" +err)});
          console.log("heree"+this.state.data);
    }

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
          <VictoryLabel style={{fontSize: 35,stroke: "green"}} text="Steps" x={210} y={30} textAnchor="middle"/>
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
                
                { x: new Date(this.state.date[0]), y: parseInt(this.state.data[0]) },
                { x: new Date(this.state.date[1]), y: parseInt(this.state.data[1]) },
                { x: new Date(this.state.date[2]), y: parseInt(this.state.data[2]) },
                { x: new Date(this.state.date[3]), y: parseInt(this.state.data[3]) },
                { x: new Date(this.state.date[4]), y: parseInt(this.state.data[4]) },
                { x: new Date(this.state.date[5]), y: parseInt(this.state.data[5]) },
                { x: new Date(this.state.date[6]), y: parseInt(this.state.data[6]) }

                // { x: new Date(this.state.date[0]), y: 5 },
                // { x: new Date(this.state.date[1]), y: 7 },
                // { x: new Date(this.state.date[2]), y: 3 },
                // { x: new Date(this.state.date[3]), y: 4 },
                // { x: new Date(this.state.date[4]), y: 9 },
                // { x: new Date(this.state.date[5]), y: 88 },
                // { x: new Date(this.state.date[6]), y: 65 }
  
              ]}
            />
          </VictoryChart>
        </div>
      );
    }
  }
  
