import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/base";
import { fetchArticlesByBlog } from "../actions/article";
import { ArticlePreview } from "../components/article";
import { MDBJumbotron } from "mdbreact";

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null, articleList: [] };
  }

  componentDidMount() {
    const params = window.location.pathname.split("/");
    this.setState({
      name: params[2]
    });
    this.blogArticlesLoader(params[2]);
  }

  blogArticlesLoader = blogName => {
    fetchArticlesByBlog(this.onBlogArticleActionCallback, blogName);
  };

  onBlogArticleActionCallback = (err, data) => {
    if (err) {
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
          <title>{`${this.state.name} | Blogger`}</title>
        </Helmet>
        <div className="flex-center">
          <div className="col-md-10">
            <MDBJumbotron>
              <h1 className="display-4 text-center">@{this.state.name}</h1>
            </MDBJumbotron>
          </div>
        </div>
        <div className="flex-center">
          <div className="col-md-6">{this.listRenderer()}</div>
        </div>
      </Layout>
    );
  }
}

export default BlogView;
