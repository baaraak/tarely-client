import React from 'react';
import { connect } from 'react-redux';
import { Card, Modal, Button } from 'antd';

import Login from './components/Login';
import Signup from './components/Signup';
import Swipe from './components/Swipe';
import Exchange from './components/Exchange';
import Match from './components/Match';

import { login, signup } from '../../redux/actions/auth.actions';

import './homePage.css';

const INSTRUCTION_STEP = {
  SWIPE: 'SWIPE',
  MATCH: 'MATCH',
  EXCHANGE: 'EXCHANGE',
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModalOpen: false,
      instructionStep: INSTRUCTION_STEP.SWIPE,
    };
    this.setStepRef = this.setStepRef.bind(this);
  }
  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  componentWillMount() {
    // clean url
    window.history.replaceState(
      {},
      document.title,
      `${window.location.protocol}//${window.location.host}`
    );
  }

  toggleLoginModal = () => {
    this.setState({ loginModalOpen: !this.state.loginModalOpen })
  }

  onStepClick = (step) => {
    if (this.state.instructionStep === step) return;
    this.currentStepRef.classList.add('instructionStep--hide');
    setTimeout(() => this.setState({ instructionStep: step }), 1000);
  }

  setStepRef(ref) {
    this.currentStepRef = ref;
  }

  renderCurrentStep() {
    const { instructionStep } = this.state;
    if (instructionStep === INSTRUCTION_STEP.SWIPE) {
      return <Swipe setRef={this.setStepRef} />
    } else if (instructionStep === INSTRUCTION_STEP.MATCH) {
      return <Match setRef={this.setStepRef} />
    } else if (instructionStep === INSTRUCTION_STEP.EXCHANGE) {
      return <Exchange setRef={this.setStepRef} />
    }
  }

  render() {
    const bars = Object.values(INSTRUCTION_STEP);
    return (
      <div className="homePage">
        <div className="topNav">
          <div className="logo">tarely</div>
          <Button className="loginBtn" onClick={this.toggleLoginModal} >Login</Button>
        </div>
        {this.renderCurrentStep()}
        <div className="bars">
          {bars.map(v => (
            <div className={`bar ${this.state.instructionStep === v && 'bar--active'}`} key={v} onClick={() => this.onStepClick(v)}>
              <h3>{v}</h3>
              <div className="bar__step" />
            </div>
          ))}
        </div>
        <Modal
          okText="Send"
          onCancel={this.toggleLoginModal}
          visible={this.state.loginModalOpen}
        >
          <Card title="Login">
            <Login submit={this.props.login} error={this.props.loginError} />

          </Card>
          <Card title="Sign up">
            <Signup submit={this.props.signup} error={this.props.signupError} />
          </Card>
        </Modal>
      </div >
    );
  }
}

export default connect(
  store => ({
    loginError: store.auth.loginError,
    signupError: store.auth.signupError,
  }),
  { login, signup }
)(HomePage);
