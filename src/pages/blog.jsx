import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/base";
import { fetchArticlesByBlog } from "../actions/article";
import { ArticlePreview } from "../components/article";
import { MDBJumbotron } from "mdbreact";
import { Loader, NotFound } from "../components/misc";

class BlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      loadedArticleList: [],
      renderArticleList: [],
      isLoaded: false,
      isError: false
    };
  }

  componentDidMount() {
    const params = window.location.pathname.split("/");
    let name = decodeURIComponent(params[2]);
    this.setState({
      name: name
    });
    this.blogArticlesLoader(params[2]);
  }

  blogArticlesLoader = blogName => {
    fetchArticlesByBlog(this.onBlogArticleActionCallback, blogName);
  };

  onBlogArticleActionCallback = (err, data) => {
    if (err) {
      this.setState({ isLoaded: true, isError: true });
      return;
    }
    if (!Array.isArray(data)) {
      this.setState({ isLoaded: true });
      return;
    }
    data = data.reverse();
    this.setState({
      loadedArticleList: data,
      renderArticleList: data,
      isLoaded: true
    });
  };

  listRenderer = () => {
    if (!this.state.isLoaded) {
      return <Loader />;
    }
    if (this.state.isError) {
      return <NotFound />;
    }
    if (this.state.loadedArticleList.length === 0) {
      return <h1 className="text-center">No Content Found</h1>;
    }
    return this.state.renderArticleList.map((item, index) => (
      <ArticlePreview key={index} article={item} />
    ));
  };

  blogSearchEngine = text => {
    if (this.state.loadedArticleList.length === 0) {
      return;
    }
    if (text === "") {
      this.setState({ renderArticleList: this.state.loadedArticleList });
      return;
    }
    let filteredResult = this.state.loadedArticleList.filter(item => {
      return item.title.indexOf(text) >= 0 || item.body.indexOf(text) >= 0;
    });
    this.setState({ renderArticleList: filteredResult });
  };

  inBlogSearch() {
    return (
      <div className="flex-center">
        <div className="col-md-4 mt-2 mb-2">
          <input
            type="text"
            placeholder={`Search on ${this.state.name}`}
            className="form-control"
            onChange={event => {
              this.blogSearchEngine(event.target.value);
            }}
          />
        </div>
      </div>
    );
  }

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
              {this.inBlogSearch()}
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
