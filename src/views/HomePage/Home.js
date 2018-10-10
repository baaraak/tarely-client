import React from 'react';
import { connect } from 'react-redux';
import { Modal, Tabs } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { AwesomeButton } from 'react-awesome-button';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logo from '../../components/Logo';
import ForgotPassword from './components/auth/ForgotPassword';

import Swipe from './components/Swipe';
import Exchange from './components/Exchange';
import Match from './components/Match';
import Upload from './components/Upload';
import { login, signup, forgotPassword } from '../../redux/actions/auth.actions';

const INSTRUCTION_STEP = {
    UPLOAD: 'UPLOAD',
    SWIPE: 'SWIPE',
    MATCH: 'MATCH',
    EXCHANGE: 'EXCHANGE',
};

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginModalOpen: false,
            isForgot: false,
            instructionStep: INSTRUCTION_STEP.UPLOAD,
        };
        this.setStepRef = this.setStepRef.bind(this);
    }

    componentWillMount() {

        // clean url
        window.history.replaceState(
            {},
            document.title,
            `${window.location.protocol}//${window.location.host}`
        );
    }

    componentDidMount() {
        document.querySelectorAll('body')[0].classList.add('loaded', this.props.isMobile && 'mobile', 'hp');
    }

    toggleLoginModal = () => {
        this.setState({ loginModalOpen: !this.state.loginModalOpen })
    }

    onStepClick = (step) => {
        if (this.state.instructionStep === step) return;
        this.currentStepRef.classList.add('instructionStep--hide');
        this.setState({ instructionStep: step });
    }

    onForgotPassword = () => {
        this.setState({ isForgot: !this.state.isForgot })
    }

    setStepRef(ref) {
        this.currentStepRef = ref;
    }

    responseFacebook = (response) => {
        if (response && response.accessToken) {
            this.props.login({ ...response, type: 'facebook' });
        }
    }

    responseGoogle = (response) => {
        if (response && response.accessToken) {
            this.props.login({ ...response, type: 'google' });
        }
    }

    renderCurrentStep() {
        const { instructionStep } = this.state;
        if (instructionStep === INSTRUCTION_STEP.SWIPE) {
            return <Swipe setRef={this.setStepRef} />
        } else if (instructionStep === INSTRUCTION_STEP.MATCH) {
            return <Match setRef={this.setStepRef} />
        } else if (instructionStep === INSTRUCTION_STEP.EXCHANGE) {
            return <Exchange setRef={this.setStepRef} />
        } else if (instructionStep === INSTRUCTION_STEP.UPLOAD) {
            return <Upload setRef={this.setStepRef} />
        }
    }
    render() {
        const bars = Object.values(INSTRUCTION_STEP);
        const { instructionStep, isForgot } = this.state;
        return (
            <div className="homePage">
                <div className="topNav">
                    <Logo />
                    <AwesomeButton type="secondary" className="loginBtn" action={this.toggleLoginModal}>Login</AwesomeButton>
                </div>
                {this.renderCurrentStep()}
                <div className="bars">
                    {bars.map((v, i) => (
                        <div
                            key={v}
                            tabIndex={i}
                            className={`bar ${instructionStep === v && 'bar--active'}`}
                            onClick={() => this.onStepClick(v)}
                        >
                            <h3>{v}</h3>
                            <div className="bar__step" />
                        </div>
                    ))}
                </div>
                <Modal
                    footer={null}
                    className="loginModal"
                    destroyOnClose
                    maskClosable={false}
                    onCancel={this.toggleLoginModal}
                    visible={this.state.loginModalOpen}
                >
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Login" key="1">
                            {isForgot ?
                                <React.Fragment>
                                    <ForgotPassword submit={this.props.forgotPassword} error={this.props.forgotPasswordError} />
                                    <div className="forgot" onClick={this.onForgotPassword}>Click here to login</div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Login submit={this.props.login} error={this.props.loginError} />
                                    <div className="forgot" onClick={this.onForgotPassword}>Forgot your password?</div>
                                </React.Fragment>
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Sign up" key="2">
                            <Signup submit={this.props.signup} error={this.props.signupError} />
                        </Tabs.TabPane>
                    </Tabs>
                    <div className="authButton">
                        <FacebookLogin
                            appId="2232059320356745"
                            fields="name,email,picture,location{location}"
                            callback={this.responseFacebook}
                            className="authButton__faceboook"
                            render={props => (
                                <button onClick={props.onClick}>Continue with Facebook</button>
                            )}
                        />
                        <GoogleLogin
                            clientId="684720906646-0u39fiqg9i8pa8vj6gff55lq7naisp2n.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            className="authButton__google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    store => ({
        loginError: store.auth.loginError,
        signupError: store.auth.signupError,
        forgotPasswordError: store.auth.forgotPasswordError,
        isMobile: store.app.isMobile,
    }),
    { login, signup, forgotPassword }
)(Home);
