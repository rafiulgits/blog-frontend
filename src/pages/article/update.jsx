import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../../components/base";
import { ArticleForm } from "../../components/forms";
import { fetchArticleItem, updateArticle } from "../../actions/article";

class UpdateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      data: null
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
      return;
    }
    this.setState({
      data: data
    });
  };

  onPublish = body => {
    console.log(body);
    updateArticle(this.onUpdateActionCallback, body);
  };

  onUpdateActionCallback = (err, data) => {
    if (err) {
      alert(err);
      return;
    }
    let articleLocation = `/article/${data.id}`;
    window.location.replace(articleLocation);
  };

  renderForm() {
    if (this.state.data === null) {
      return <span></span>;
    }
    return (
      <div className="flex-center mt-5">
        <div className="col-md-6 list-group-item">
          <ArticleForm
            data={this.state.data}
            onPublishCallback={this.onPublish}
          />
        </div>
      </div>
    );
  }
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Blogger | Article Update</title>
        </Helmet>
        {this.renderForm()}
      </Layout>
    );
  }
}

export default UpdateView;
