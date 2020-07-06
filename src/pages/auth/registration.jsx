import React from "react";
import { Layout } from "../../components/base";
import { Helmet } from "react-helmet";
import { TextInput } from "../../components/widgets/forms";
import { Button, SpinnerButton } from "../../components/widgets/buttons";
import { registration } from "../../actions/auth";

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
      isRequesting: false,
      hasError: false,
      errorMessages: []
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
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords are not same");
      return;
    }
    this.setState({
      isRequesting: true
    });

    let body = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email.trim(),
      blogName: this.state.blogName.trim(),
      password: this.state.password
    };
    registration(this.registrationCallback, body);
  }

  registrationCallback = (err, payload) => {
    this.setState({ isRequesting: false });
    if (!err) {
      window.location.replace("/");
    } else {
      this.manageErrors(err);
    }
  };

  manageErrors = err => {
    if (err.response) {
      var errorMessages = [];
      if (err.response.data) {
        Object.keys(err.response.data).forEach(function(key) {
          errorMessages.push(err.response.data[key][0]);
        });
        this.setState({
          hasError: true,
          errorMessages: errorMessages
        });
        return;
      }
    }
    alert(err);
    return;
  };

  getCurrentButton() {
    if (this.state.isRequesting) {
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

  getErrorMessages() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          {this.state.errorMessages.map((item, index) => (
            <p>
              <strong key={index}>{item}</strong>
              <br />
            </p>
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

        <form onSubmit={this.handleSignupAttempt}>
          <TextInput
            type="text"
            label="First Name"
            onChange={this.handleFirstNameInput}
            minLength="1"
            maxLength="128"
            required={true}
          />
          <TextInput
            type="text"
            label="Last Name"
            onChange={this.handleLastNameInput}
            minLength="1"
            maxLength="128"
            required={true}
          />
          <TextInput
            type="email"
            label="Email"
            onChange={this.handleEmailInput}
            required={true}
          />
          <TextInput
            type="text"
            label="Blog Name"
            onChange={this.handleBlogNameInput}
            minLength="3"
            maxLength="30"
            required={true}
          />
          <TextInput
            type="password"
            label="Password"
            onChange={this.handlePasswordInput}
            minLength="8"
            required={true}
          />

          <TextInput
            type="password"
            label="Confirm Password"
            onChange={this.handleConfirmPasswordInput}
            minLength="8"
            required={true}
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
