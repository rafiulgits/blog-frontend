import React from "react";
import { Layout } from "../components/base";
import { Helmet } from "react-helmet";
import { TextInput } from "../components/widgets/forms";
import { Button, SpinnerButton } from "../components/widgets/buttons";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      isLogging: false
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLoginAttempt(event) {
    event.preventDefault();
    this.setState({
      isLogging: true
    });
  }

  getCurrentButton() {
    if (this.state.isLogging) {
      return (
        <SpinnerButton smallSpin className="disabled btn-block mt-3 btn-green">
          Logging
        </SpinnerButton>
      );
    }
    return (
      <Button
        type="submit"
        onSubmit={this.handleLoginAttempt}
        className="btn-block btn-green mt-3"
      >
        Login
      </Button>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleLoginAttempt}>
        <TextInput
          type="email"
          label="Email"
          onChange={this.handleEmailInput}
        />
        <TextInput
          type="password"
          label="Password"
          onChange={this.handlePasswordInput}
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
        <title>Login | Blogger</title>
      </Helmet>
      <div className="flex-center mt-5">
        <div className="col-md-4 list-group-item">
          <LoginForm />
          <p className="mt-3">
            To create a new account{" "}
            <a className="font-weight-bold" href="/signup">
              Signup
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};
