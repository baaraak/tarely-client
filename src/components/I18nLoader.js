import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import callApi from '../services/api';

export class I18nLoader extends React.Component {
    constructor() {
        super();
        this.state = {
            translations: null,
        };
    }

    componentWillMount() {
        this.loadMessages(this.props.locale);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.locale !== this.props.locale) {
            this.loadMessages(newProps.locale);
        }
    }

    loadMessages(locale) {
        callApi(`/dictionary?language=${locale}`)
            .then((translations) => {
                this.setState({ translations });
            });
    }

    render() {
        if (!this.state.translations) {
            return null;
        }

        return (
            <IntlProvider locale={this.props.locale} messages={this.state.translations}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
I18nLoader.propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
    ]).isRequired,
};
I18nLoader.defaultProps = {
    locale: 'en',
};

const getLocale = state => state.locale || 'en';

export default connect(state => ({
    locale: getLocale(state),
}))(I18nLoader);
