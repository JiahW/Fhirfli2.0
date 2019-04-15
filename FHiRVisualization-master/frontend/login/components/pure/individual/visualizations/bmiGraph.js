import React from 'react';
import {VictoryLabel, VictoryChart, VictoryLine,VictoryScatter, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis} from 'victory';
import * as PropTypes from 'prop-types';
import dataParser from '../../../../../../Fitbit JSON fake user data/weightdataparser';
import weight from '../../../../../../Fitbit JSON fake user data/weight';


var bmitList = dataParser(weight)[2];
var dateslist = dataParser(weight)[1];
// console.log(bmitList);
// console.log(dateslist);
// console.log(new Date(dateslist[0]));

export default class WeightGraph extends React.Component {

  constructor() {
      super();
      this.state = {
        zoomDomain: { x: [new Date(dateslist[0]), new Date(dateslist[6])] }
      };
    }
  
    handleZoom(domain) {
      this.setState({ zoomDomain: domain });
    }
  
    render() {
      return (
        <div>
          <VictoryChart width={600} height={470} scale={{ x: "time" }}
           >
          <VictoryLabel style={{fontSize: 35,stroke: "green"}} text="BMI-Graph" x={280} y={20} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: "green" }
                }}
                data={[
                  { a: new Date(dateslist[0]), b: bmitList[0] },
                  { a: new Date(dateslist[1]), b: bmitList[1] },
                  { a: new Date(dateslist[2]), b: bmitList[2] },
                  { a: new Date(dateslist[3]), b: bmitList[3] },
                  { a: new Date(dateslist[4]), b: bmitList[4] },
                  { a: new Date(dateslist[5]), b: bmitList[5] },
                  { a: new Date(dateslist[6]), b: bmitList[6] }
                ]}
                x="a"
                y="b"
              />
  
            </VictoryChart>
           
        </div>
      );
    }
  }
  