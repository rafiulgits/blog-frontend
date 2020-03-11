import React from "react";
import { TextInput } from "../components/widgets/forms";
import { Button } from "../components/widgets/buttons";
import DateTimePicker from "react-datetime-picker";

import PropTypes from "prop-types";

class ArticleForm extends React.Component {
  static propTypes = {
    onPublishCallback: PropTypes.func.isRequired,
    data: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.data ? props.data.title : "",
      body: props.data ? props.data.body : "",
      createdOn: props.data ? new Date(props.data.createdOn) : new Date()
    };

    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleBodyInput = this.handleBodyInput.bind(this);
  }

  handleTitleInput(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleBodyInput(event) {
    this.setState({
      body: event.target.value
    });
  }

  handleDateTimeInputCallback = date => {
    this.setState({
      createdOn: date
    });
  };

  handleOnPublish = event => {
    event.preventDefault();
    if (this.state.createdOn === null) {
      alert("Time stamp is required");
      return;
    }
    var requestBody = {
      title: this.state.title,
      body: this.state.body,
      createdOn: this.state.createdOn
    };
    if (this.props.data) {
      requestBody["id"] = this.props.data.id;
    }
    this.props.onPublishCallback(requestBody);
  };

  renderTitleInputField() {
    return (
      <TextInput
        type="text"
        label="Title"
        onChange={this.handleTitleInput}
        minLength="1"
        maxLength="250"
        value={this.state.title}
        required={true}
      />
    );
  }

  renderBodyInputField() {
    return (
      <TextInput
        type="textarea"
        label="Body"
        onChange={this.handleBodyInput}
        minLength="1"
        style={{ minHeight: "200px" }}
        value={this.state.body}
        required={true}
      />
    );
  }

  renderTimeStampField() {
    return (
      <div className="mt-3">
        <span style={{ fontWeight: "400" }}>{"Timestamp "}</span>
        <DateTimePicker
          onChange={this.handleDateTimeInputCallback}
          value={this.state.createdOn}
        />
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleOnPublish}>
        {this.renderTitleInputField()}
        {this.renderBodyInputField()}
        {this.renderTimeStampField()}
        <Button
          className="mt-3 btn-green"
          type="submit"
          onSubmit={this.handleOnPublish}
        >
          Publish
        </Button>
      </form>
    );
  }
}

export { ArticleForm };
