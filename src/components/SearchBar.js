import React, {Component, PropTypes} from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import { browserHistory } from 'react-router';


class SearchBar extends Component {

    componentWillMount() {
        this.props.actions.setSearchQuery('');
    }


    handleChange(e) {
        this.props.actions.setSearchQuery(e.target.value);
    }

    preventDefault(e) {
        e.preventDefault();
        if (this.props.home.query !== '') {
            var regSecPatt = new RegExp(/\d{6}/i);
            if (regSecPatt.test(this.props.home.query))
                this.props.actions.searchClassByID(this.props.home.query);
            else
                this.props.actions.searchClassByName(this.props.home.query);
            browserHistory.push('/result');
        }
    }

    render() {
        return(
            <form onSubmit={this.preventDefault.bind(this)}>
                <FormGroup>
                    <FormControl type='text' placeholder='Course Name or Section ID   -  (CSE 11, cse11, or 882255)' onChange={this.handleChange.bind(this)}>
                    </FormControl>
                </FormGroup>
            </form>
        );
    }
}

SearchBar.propTypes = {
    actions: PropTypes.shape({
        setSearchQuery: PropTypes.func.isRequired,
        searchClassByName: PropTypes.func.isRequired
    }),
    home: PropTypes.shape({
        query: PropTypes.string.isRequired
    })
}

export default SearchBar;