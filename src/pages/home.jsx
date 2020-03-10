import React from "react";
import { Layout } from "../components/base";
import { Helmet } from "react-helmet";
import { ArticlePreview } from "../components/article";
import { fetchArticlePage } from "../actions/article";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      articleList: []
    };
  }

  componentDidMount() {
    this.articleLoader();
  }

  articleLoader = () => {
    fetchArticlePage(this.loadedCallback, 0, 15);
  };

  loadedCallback = (err, data) => {
    if (err) {
      return;
    }
    console.log(data);
    this.setState({ articleList: data });
  };

  listRenderer = () => {
    if (this.state.articleList.length === 0) {
      return <span></span>;
    }
    return this.state.articleList.map((item, index) => (
      <ArticlePreview article={item} />
    ));
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Blogger - publish your thoughts</title>
        </Helmet>
        <div className="flex-center mt-1">
          <div className="col-md-8">{this.listRenderer()}</div>
        </div>
      </Layout>
    );
  }
}

export default Home;
