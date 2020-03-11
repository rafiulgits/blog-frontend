import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../../components/base";
import { ArticleForm } from "../../components/forms";
import { createArticle } from "../../actions/article";

class CreateArticle extends React.Component {
  onPublish = body => {
    createArticle(this.onCreateActionCallback, body);
  };

  onCreateActionCallback = (err, data) => {
    if (err) {
      alert(err);
      return;
    }
    let articleLocation = `/article/${data.id}`;
    window.location.replace(articleLocation);
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Create Article | Blogger</title>
        </Helmet>

        <div className="flex-center mt-5">
          <div className="col-md-6 list-group-item">
            <ArticleForm onPublishCallback={this.onPublish} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default CreateArticle;
