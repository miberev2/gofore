import React from "react";
import { connect } from "react-redux";
import { setSort, flipSort } from "../../utils/newsSlice";
require("./styles.scss");

class Header extends React.Component {
  render() {
    const { ascending, flipSort, setSort, sort } = this.props;
    return (
      <div className="header">
        <div className="info">
          <div>GoFore demo </div>
          <div>Mikko Taipale</div>
        </div>
        <div className="page-title">Hacker News</div>
        <div className="sort">
          <div className="sort-select">
            <div className="sort-header">Sort by</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
  sort: state.news.sort,
  ascending: state.news.ascending,
});

const mapDispatchToProps = { setSort, flipSort };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
