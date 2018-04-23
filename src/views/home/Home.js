import React, {Component} from "react";
import { connect } from 'react-redux';
import {Spin} from 'antd';

import {getUserProducts} from '../../redux/actions/home.actions';

import HeroComponent from './components/HeroComponent';

import "./home.css"

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount() {
        this.props.getUserProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.products === null && Array.isArray(nextProps.products)) {
            this.setState({ isLoading: false })
        }
    }

    render() {
        console.log(this.props.products)
        return (
            <Spin spinning={this.state.isLoading}>
                <div className="home">
                    <HeroComponent/>
                    {this.props.products}
                </div>
            </Spin>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.home.products,
    };
};

export default connect(mapStateToProps, {getUserProducts})(Home);
