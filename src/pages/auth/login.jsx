import React from "react";
import { Layout } from "../../components/base";
import { Helmet } from "react-helmet";
import { TextInput } from "../../components/widgets/forms";
import { Button, SpinnerButton } from "../../components/widgets/buttons";
import { login } from "../../actions/auth";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      isLogging: false,
      hasError: false,
      errorMessages: []
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

    const body = {
      email: this.state.email,
      password: this.state.password
    };
    login(this.loginCallBack, body);
  }

  loginCallBack = (err, payload) => {
    this.setState({ isLogging: false });
    if (!err) {
      window.location.replace("/");
    } else {
      this.manageErrors(err);
    }
  };

  manageErrors = err => {
    if (err.response) {
      var errorMessages = [];
      if (err.response.data.Email) {
        errorMessages.push(err.response.data.Email.errors[0]["errorMessage"]);
      }
      if (err.response.data.Password) {
        errorMessages.push(
          err.response.data.Password.errors[0]["errorMessage"]
        );
      }
      this.setState({
        hasError: true,
        errorMessages: errorMessages
      });
      return;
    } else {
      alert(err);
      return;
    }
  };

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

  getErrorMessages() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          {this.state.errorMessages.map((item, index) => (
            <strong key={index}>{item}</strong>
          ))}
        </div>
      );
    }
    return <span />;
  }

  render() {
    return (
      <div>
        {this.getErrorMessages()}
        <form method="POST" onSubmit={this.handleLoginAttempt}>
          <TextInput
            type="email"
            label="Email"
            onChange={this.handleEmailInput}
          />
          <TextInput
            type="password"
            label="Password"
            onChange={this.handlePasswordInput}
            required={true}
            minLength="8"
          />
          {this.getCurrentButton()}
        </form>
      </div>
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
