import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../../components/base";
import { ArticleForm } from "../../components/forms";
import { createArticle } from "../../actions/article";
import { Forbidden } from "../../components/misc";
import { PROFILE } from "../../actions/config";
import { filterHttpErrorMessages } from "../../util";

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isCreated: false
    };
  }

  onPublish = body => {
    this.setState({
      isLoading: true
    });
    createArticle(this.onCreateActionCallback, body);
  };

  onCreateActionCallback = (err, data) => {
    this.setState({
      isLoading: false
    });
    if (err) {
      let messages = filterHttpErrorMessages(err);
      alert(messages);
      return;
    }
    this.setState({
      isCreated: true
    });

    let articleLocation = `/article/${data.id}`;
    window.location.replace(articleLocation);
  };

  formRenderer() {
    return (
      <div className="col-md-6 list-group-item">
        <h3 className="text-center">Share your thoughts</h3>
        <ArticleForm
          onPublishCallback={this.onPublish}
          buttonName="Publish"
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }

  contentRenderer() {
    if (localStorage.getItem(PROFILE) == null) {
      return <div className="flex-center mt-5">{this.errorRenderer()}</div>;
    }

    return <div className="flex-center mt-5">{this.formRenderer()}</div>;
  }

  errorRenderer() {
    return (
      <div className>
        <Forbidden />
        <h4 className="text-center">Login first</h4>
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Create Article | Blogger</title>
        </Helmet>
        {this.contentRenderer()}
      </Layout>
    );
  }
}

export default CreateArticle;
