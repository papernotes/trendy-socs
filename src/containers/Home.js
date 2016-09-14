import React, {Component, PropTypes} from 'react';
import HomeStyles from '../styles/HomeStyles';
import SearchBar from '../components/SearchBar';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {Link} from 'react-router';

class Home extends Component {

    componentWillMount() {
        this.props.actions.setFlavorText();
        this.props.actions.resetSearch([]);
    }

    render() {
        return(
            <div style={HomeStyles.homepage}>
                <Link to='/'>
                    <h2 style={HomeStyles.title}>Trendy Socs</h2>
                </Link>
                <a style={HomeStyles.github} href='https://github.com/papernotes'>
                    <img role='presentation' src={require('../images/github32px.png')} />
                </a>
                <div style={HomeStyles.flavorText}>
                    <h1>Trendy Socs</h1>
                    <p>{this.props.home.text}</p>
                </div>
                <div style={HomeStyles.searchBar}>
                    <SearchBar {...this.props}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        home: state.default.home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

Home.propTypes = {
    home: PropTypes.shape({
        text: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

