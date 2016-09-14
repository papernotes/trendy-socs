import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import TrendsStyles from '../styles/TrendsStyles';
import HomeStyles from '../styles/HomeStyles';
import TrendsContainer from '../components/TrendsContainer';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';
import * as colors from '../constants/Colors';
import * as fields from '../constants/CourseFields';
import randomColor from 'randomcolor';

import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

import DataFormatter from '../utils/DataFormatter';
require ('../styles/GraphStyles.css')
require ('../styles/Loading.css')


class Trends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resourcesActive: false,
            limitActive: false,
            waitlistActive: true,
            graph: this.generateCourseGraph(this.props.home.result)
        }
    }

    componentWillMount() {
        // on the case that the user goes to /result without a search query
        if (this.props.home.query === "") {
            browserHistory.push('/');
        }
    }


    generateLines(data) {
        var arr = [];

        for (var i in data) {
            if (!arr.includes(data[i].section_id)) {
                arr.push(data[i].section_id);
            }
        }

        return arr.map((item, index) => {
            return (<Line type="linear" key={index} dataKey={item} stroke={this.getRandomColor()} />)
        })
    }

    getRandomColor() {
        return randomColor({
            luminosity: 'light'
        })
    }

    resetActive() {
        this.setState({'resourcesActive': false});
        this.setState({'limitActive': false});
        this.setState({'waitlistActive': false});
    }

    setActive(key) {
        this.resetActive();
        this.setState({[key]: true});
    }

    handleClick(key) {
        this.setActive(key)
    }

    handleBack() {
        browserHistory.push('/')
    }

    addSectionButtons() {
        return (
            <div>
                <ButtonGroup>
                    <Button onClick={this.handleClick.bind(this, 'waitlistActive')} disabled={this.state.waitlistActive}>Waitlist size</Button>
                    <Button onClick={this.handleClick.bind(this, 'resourcesActive')} disabled={this.state.resourcesActive}>Resources</Button>
                    <Button onClick={this.handleClick.bind(this, 'limitActive')} disabled={this.state.limitActive}>Course limit</Button>
                </ButtonGroup>
            </div>
        )
    }

    setActiveField() {
        if (this.state.waitlistActive)
            return fields.WAITLIST_SIZE
        else if (this.state.resourcesActive)
            return fields.RESOURCES
        return fields.COURSE_LIMIT
    }

    setNewTitle(title, result) {
        return result[0].name + ' (' + title + ')'
    }

    generateCourseGraph(data) {
        if (this.props.home.loading) {
            return (
                <div>
                    <h4>This might take a while...</h4>
                    <Glyphicon className='glyphicon-refresh-animate' glyph='refresh'/>
                </div>
            );
        }

        // 404 and no data
        if (this.props.home.loading === false && data.length === 0) {
            return (
                <div>
                    <br/>
                    <h4>jk I found no data for "{this.props.home.unmodifiedQuery}"</h4>
                    <br/>
                    <p>Maybe go back and try searching again?</p>
                    <Button onClick={this.handleBack}>Back</Button>
                </div>
            );
        }

        var field = this.setActiveField();

        var buttons = this.addSectionButtons();

        var formatter = new DataFormatter();
        var lines = this.generateLines(data);
        var ref = formatter.formatLineChart(data, field);

        var w = document.documentElement.clientWidth * 0.70;
        var h = document.documentElement.clientHeight * 0.55;

        return (
            <div>
                {buttons}
                <div id='container'>
                    <LineChart width={w} height={h} data={ref} margin={{top: 5, right: 50, left: 50, bottom: 5}}>
                        <XAxis stroke={colors.highlight} dataKey="name"/>
                        <YAxis stroke={colors.highlight}/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip wrapperStyle={{backgroundColor: colors.dark}}/>
                        <Legend wrapperStyle={{right: 35, bottom: -40}}/>
                        {lines}
                    </LineChart>
                </div>
            </div>
        )
    }

    render() {
        const graph = this.generateCourseGraph(this.props.home.result);
        var title = this.props.home.query;
        if (this.props.home.searchedByID) {
            title = this.setNewTitle(title, this.props.home.result)
        }

        return(
            <div style={HomeStyles.homepage}>
                <Link to='/'>
                    <h2 style={HomeStyles.title}>Trendy Socs</h2>
                </Link>
                <a style={HomeStyles.github} href='https://github.com/papernotes'>
                    <img role='presentation' src={require('../images/github32px.png')} />
                </a>
                <div style={TrendsStyles.block}>
                    <h3>Trends for {title} FA16</h3>
                    <TrendsContainer width={'100%'} id={'graphContainer'} component={graph} loading={this.props.home.loading} data={this.props.home.result}/>
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

Trends.propTypes = {
    home: PropTypes.shape({
        result: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        searchedByID: PropTypes.bool.isRequired,
        query: PropTypes.string,
        unmodifiedQuery: PropTypes.string
    })
}

export default connect(mapStateToProps,null)(Trends);