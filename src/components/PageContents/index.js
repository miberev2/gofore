import React from "react";
import { connect } from "react-redux";
import { getIds } from "../../utils/newsSlice";
import News from "../News";

require("./styles.scss");

class PageContents extends React.Component {
  componentDidMount() {
    this.props.getIds();
  }

  // Alphabetical sort for author
  alphabeticalSort = (a, b, filter, ascending) => {
    if (a[filter] < b[filter]) {
      return ascending ? -1 : 1;
    }
    if (a[filter] > b[filter]) {
      return ascending ? 1 : -1;
    }
    return 0;
  };

  render() {
    const { ids, details, filter, ascending } = this.props;
    const error = ids.error || details.error;
    const loading = ids.requesting || details.requesting;
    const sortedData =
      details?.stories?.length === ids?.data?.length
        ? [...details?.stories]
            ?.filter((story) => story.url || story.text)
            ?.sort((a, b) =>
              filter === "by"
                ? this.alphabeticalSort(a, b, filter, ascending)
                : ascending
                ? b[filter] - a[filter]
                : a[filter] - b[filter]
            )
        : [];

    return (
      <div className="page-contents">
        {error ? (
          <div className="error">Error: {error}</div>
        ) : loading ? (
          <div className="loader">
            <div className="loading" />
          </div>
        ) : (
          <News stories={sortedData} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ids: state.news.ids,
  details: state.news.details,
  filter: state.news.filter,
  ascending: state.news.ascending,
});

const mapDispatchToProps = { getIds };

export default connect(mapStateToProps, mapDispatchToProps)(PageContents);
