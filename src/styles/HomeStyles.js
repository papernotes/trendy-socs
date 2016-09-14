import * as colors from '../constants/Colors';

const HomeStyles = {
    homepage: {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        backgroundColor: colors.base,
        zIndex: '-1',
    },
    flavorText: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -35%)',
        textAlign: 'center',
        color: colors.highlight
    },
    searchBar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '50vw'
    },
    github: {
        position: 'absolute',
        right: '0',
        margin: '10px'
    },
    title: {
        position: 'absolute',
        margin: '10px',
        color: colors.link
    }
}

export default HomeStyles