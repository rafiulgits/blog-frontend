import React from "react";
import { Layout } from "../components/base";
import { Helmet } from "react-helmet";
import { ArticlePreview } from "../components/article";
import { Pagination } from "../components/widgets/pagination";
import { fetchArticlePage } from "../actions/article";

const MAX_ARTICLE = 4;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1,
      articleList: [],
      isLastPage: false,
      shouldRender: false
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    var number = 1;
    if (params.has("page")) {
      var page = params.get("page");
      try {
        number = Number.parseInt(page);
        if (number <= 0) {
          return;
        }
        this.setState({ selectedPage: number });
      } catch (err) {}
    }

    this.articleLoader(number);
  }

  articleLoader = selectedPage => {
    let skip = (selectedPage - 1) * MAX_ARTICLE;
    fetchArticlePage(this.loadedCallback, skip, MAX_ARTICLE);
  };

  loadedCallback = (err, data) => {
    if (err) {
      return;
    }
    if (!Array.isArray(data)) {
      return;
    }
    if (data.length < MAX_ARTICLE) {
      this.setState({ isLastPage: true });
    }

    this.setState({ articleList: data, shouldRender: true });
  };

  listRenderer = () => {
    if (this.state.articleList.length === 0) {
      return <span></span>;
    }
    return this.state.articleList.map((item, index) => (
      <ArticlePreview key={index} article={item} />
    ));
  };

  renderContent() {
    if (this.state.shouldRender) {
      return (
        <div className="flex-center mt-1">
          <div className="col-md-7">
            {this.listRenderer()}
            <div className="flex-center">
              <Pagination
                onPageSelect={this.pageSelectionCallback}
                selectedPage={this.state.selectedPage}
                lastPage={this.state.isLastPage}
              />
            </div>
          </div>
        </div>
      );
    }
    return <span></span>;
  }

  pageSelectionCallback = pageNumber => {
    window.location.replace(`/?page=${pageNumber}`);
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Blogger - publish your thoughts</title>
        </Helmet>
        {this.renderContent()}
      </Layout>
    );
  }
}

export default Home;
