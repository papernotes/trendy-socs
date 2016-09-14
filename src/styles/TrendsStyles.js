import * as colors from '../constants/Colors';

const TrendsStyles = {
    block: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -40%)',
        textAlign: 'center',
        width: '75vw',
        height: '60vh',
        color: colors.highlight
    },
    container: {
        position: 'relative',
        backgroundColor: colors.base,
        height: '100%',
        display: 'inline-block'
    }
}

export default TrendsStyles