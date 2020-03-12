import React from "react";
import { Layout } from "../../components/base";
import { Helmet } from "react-helmet";
import { ArticleItem } from "../../components/article";
import { fetchArticleItem } from "../../actions/article";
import { Loader, NotFound } from "../../components/misc";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      data: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    const params = window.location.pathname.split("/");
    this.setState({
      id: params[2]
    });
    this.articleLoader(params[2]);
  }

  articleLoader = id => {
    fetchArticleItem(this.loadedCallback, id);
  };

  loadedCallback = (err, data) => {
    if (err) {
      this.setState({
        isLoaded: true
      });
      return;
    }
    this.setState({
      data: data,
      isLoaded: true
    });
  };

  itemRenderer() {
    if (!this.state.isLoaded) {
      return <Loader />;
    }
    if (this.state.data === null) {
      return <NotFound />;
    }
    return <ArticleItem data={this.state.data} />;
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Blogger | Article</title>
        </Helmet>
        <div className="flex-center">
          <div className="col-md-6">{this.itemRenderer()}</div>
        </div>
      </Layout>
    );
  }
}

export default SingleArticle;
