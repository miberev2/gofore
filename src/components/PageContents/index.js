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
  alphabeticalSort = (a, b, sort, ascending) => {
    if (a[sort]?.toUpperCase() < b[sort]?.toUpperCase()) {
      return ascending ? -1 : 1;
    }
    if (a[sort]?.toUpperCase() > b[sort]?.toUpperCase()) {
      return ascending ? 1 : -1;
    }
    return 0;
  };

  render() {
    const { ids, details, sort, ascending } = this.props;
    const error = ids.error || details.error;
    const loading = ids.requesting || details.requesting;
    const sortedData =
      details?.stories?.length === ids?.data?.length
        ? [...details?.stories]
            ?.filter((story) => story.url || story.text)
            ?.sort((a, b) =>
              sort === "by"
                ? this.alphabeticalSort(a, b, sort, ascending)
                : ascending
                ? b[sort] - a[sort]
                : a[sort] - b[sort]
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
  sort: state.news.sort,
  ascending: state.news.ascending,
});

const mapDispatchToProps = { getIds };

export default connect(mapStateToProps, mapDispatchToProps)(PageContents);
