import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/base";
import { ArticlePreview } from "../components/article";
import { searchArticles } from "../actions/article";

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      query: null
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("query")) {
      this.setState({
        query: params.get("query")
      });
      this.articleLoader(params.get("query"));
    }
  }

  articleLoader = query => {
    searchArticles(this.loadedCallback, query);
  };

  loadedCallback = (err, data) => {
    if (err) {
      return;
    }
    if (data === null) {
      return;
    }
    if (!Array.isArray(data)) {
      return;
    }

    this.setState({ articleList: data });
  };

  listRenderer = () => {
    if (this.state.articleList.length === 0) {
      return <span></span>;
    }
    return this.state.articleList.map((item, index) => (
      <ArticlePreview key={index} article={item} />
    ));
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Search | Blogger</title>
        </Helmet>
        <div className="flex-center">
          <div className="col-md-7">
            <h1 className="text-center mt-3 mb-5">{`Search for "${this.state.query}"`}</h1>
            {this.listRenderer()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default SearchView;
