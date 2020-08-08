import React, { Component } from "react";
import "./index.css";
const classNames = require("classnames");

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches: [],
      requestMade: false,
    };
  }

  onClick = (year) => (e) => {
    const url = `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`;
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) =>
          this.setState({ matches: data.data, requestMade: true })
        );
    } catch (err) {
      console.error(err);
    }

    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
    });
  };

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const { matches, requestMade } = this.state;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>
        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">
              {matches.length > 0 ? `Total matches: ${matches.length}` : null}
            </div>

            <ul className="mr-20 matches styled" data-testid="match-list">
              {matches.map((match) => (
                <li
                  className="slide-up-fade-in"
                  key={match.name}
                >{`Match ${match.name} won by ${match.winner}`}</li>
              ))}
            </ul>
          </section>

          <div data-testid="no-result" className="slide-up-fade-in no-result">
            {requestMade && matches.length === 0
              ? "No results to display."
              : ""}
          </div>
        </section>
      </div>
    );
  }
}
