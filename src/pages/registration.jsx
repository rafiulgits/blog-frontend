import React from "react";
import { Layout } from "../components/base";
import { Helmet } from "react-helmet";
import { TextInput } from "../components/widgets/forms";
import { Button, SpinnerButton } from "../components/widgets/buttons";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      blogName: null,
      password: null,
      confirmPassword: null,
      isLogging: false
    };

    this.bindAllHandlers();
  }

  bindAllHandlers() {
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleBlogNameInput = this.handleBlogNameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(
      this
    );
    this.handleSignupAttempt = this.handleSignupAttempt.bind(this);
  }

  handleFirstNameInput(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastNameInput(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleBlogNameInput(event) {
    this.setState({
      blogName: event.target.value
    });
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleSignupAttempt(event) {
    event.preventDefault();
    this.setState({
      isLogging: true
    });
  }

  getCurrentButton() {
    if (this.state.isLogging) {
      return (
        <SpinnerButton smallSpin className="disabled btn-block mt-3 btn-green">
          Creating
        </SpinnerButton>
      );
    }
    return (
      <Button
        type="submit"
        onSubmit={this.handleSignupAttempt}
        className="btn-block btn-green mt-3"
      >
        Signup
      </Button>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSignupAttempt}>
        <TextInput
          type="text"
          label="First Name"
          onChange={this.handleFirstNameInput}
        />
        <TextInput
          type="text"
          label="Last Name"
          onChange={this.handleLastNameInput}
        />
        <TextInput
          type="email"
          label="Email"
          onChange={this.handleEmailInput}
        />
        <TextInput
          type="text"
          label="Blog Name"
          onChange={this.handleBlogNameInput}
        />
        <TextInput
          type="password"
          label="Password"
          onChange={this.handlePasswordInput}
        />

        <TextInput
          type="password"
          label="Confirm Password"
          onChange={this.handleConfirmPasswordInput}
        />
        {this.getCurrentButton()}
      </form>
    );
  }
}

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Signup | Blogger</title>
      </Helmet>
      <div className="flex-center mt-5">
        <div className="col-md-4 list-group-item">
          <RegistrationForm />
          <p className="mt-3">
            Already have an account?{" "}
            <a className="font-weight-bold" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};
