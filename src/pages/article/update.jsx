import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../../components/base";
import { ArticleForm } from "../../components/forms";
import { fetchArticleItem, updateArticle } from "../../actions/article";
import { Loader, NotFound, Forbidden } from "../../components/misc";
import { PROFILE } from "../../actions/config";
import { filterHttpErrorMessages } from "../../util";

class UpdateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      data: null,
      isLoaded: false,
      isLoading: false
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

  onPublish = body => {
    this.setState({ isLoading: true });
    updateArticle(this.onUpdateActionCallback, body);
  };

  onUpdateActionCallback = (err, data) => {
    this.setState({ isLoading: false });
    if (err) {
      let messages = filterHttpErrorMessages(err);
      alert(messages);
      return;
    }
    let articleLocation = `/article/${data.id}`;
    window.location.replace(articleLocation);
  };

  renderForm() {
    if (!this.state.isLoaded) {
      return <Loader />;
    }
    if (this.state.data === null) {
      return <NotFound />;
    }
    if (localStorage.getItem(PROFILE) === null) {
      return <Forbidden />;
    }
    let user = JSON.parse(localStorage.getItem(PROFILE));
    if (user.id !== this.state.data.authorId) {
      return <Forbidden />;
    }

    return (
      <div className="flex-center mt-5">
        <div className="col-md-6 list-group-item">
          <h3 className="text-center">Update your article</h3>
          <ArticleForm
            data={this.state.data}
            onPublishCallback={this.onPublish}
            buttonName="Update"
            isLoading={this.state.isLoading}
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
