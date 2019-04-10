import React, {Component} from "react";
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Home.scss';
import moment from 'moment';
import * as propTypes from 'prop-types';
import DashboardGrid from "./DashboardContainer";
import Victory from './visualizations/Victory';
import Graphs from './visualizations/graphs';


// const data = [
//     {x: 1, y: 13000},
//     {x: 2, y: 16500},
//     {x: 3, y: 14250},
//     {x: 4, y: 19000}
//   ];

export default class Home extends Component {
    componentDidMount() {
        console.log("Home.jsx individual");
        this.props.manualLoadGoals();
        this.props.manualLoadPreferences().then(() => {
            this.props.preferences.map((p) => {
                p.visualization.map((v) => {
                    this.props.manualLoadData(p.dataType, this.mapToRange(v));

                })
            })
        });
    }

    mapToRange(visualization) {

        if (visualization.includes("Daily")) {
            return "Daily"
        }
        else if (visualization.includes("Weekly")) {
            return "Weekly";
        }
        else if (visualization.includes("Monthly")) {
            return "Monthly";
        }
        else if (visualization.includes("Annual")) {
            return "Annual";
        }
        return "Range is undefined";
    }

    
    render() {
        return (
            <div id="home-container" className="basic">
                  <div id="home-content__header">
                    <h2 className="home__title">Home</h2>
                    <h4 className="home__date">{moment().format("ddd D MMMM")}</h4>
                  </div>
                    <div id="goals-content__header">
                      <h2 className="goals__title">Goals</h2>
                    </div>
                    {
                        // this.props.goals.length > 0 && ( <DashboardGrid goals = { this.props.goals } /> )
                        
                    }
                    <div id="try" ><Graphs /></div>
                </div>
        );
    }
}

Home.propTypes = {
    manualLoadGoals: propTypes.func.isRequired,
    manualLoadPreferences: propTypes.func.isRequired,
    manualLoadData: propTypes.func.isRequired,
    preferences: propTypes.array.isRequired,
    goals: propTypes.array.isRequired,
    data: propTypes.object.isRequired,
};
