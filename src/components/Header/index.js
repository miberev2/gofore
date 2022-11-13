import React from "react";
import { connect } from "react-redux";
import { setFilter, flipSort } from "../../utils/newsSlice";
require("./styles.scss");

class Header extends React.Component {
  render() {
    const { ascending, flipSort, setFilter, filter } = this.props;
    return (
      <div className="header">
        <div className="info">
          <div>GoFore demo </div>
          <div>Mikko Taipale</div>
        </div>
        <div className="page-title">Hacker News</div>
        <div className="filter">
          <div className="filter-select">
            <div className="filter-header">Filter by</div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="score">Score</option>
              <option value="time">Time</option>
              <option value="by">Author</option>
            </select>
          </div>
          <div className="sort-direction" onClick={() => flipSort()}>
            <span
              className="arrow"
              title={ascending ? "Ascending" : "Desending"}
            >
              {ascending ? "⬆" : "⬇"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.news.filter,
  ascending: state.news.ascending,
});

const mapDispatchToProps = { setFilter, flipSort };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
