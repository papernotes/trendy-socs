import React, {Component, PropTypes} from 'react';
import TrendsStyles from '../styles/TrendsStyles';

class TrendsContainer extends Component {

    render() {
        const containerStyle = TrendsStyles.container;
        const widthStyle = {width: this.props.width};

        return(
            <div id={this.props.id} style={Object.assign(containerStyle, widthStyle)}>
                {this.props.component}
            </div>
        );
    }
}

TrendsContainer.propTypes = {
    width: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
}

export default TrendsContainer;