import {SET_FLAVOR_TEXT, SET_SEARCH_QUERY, SET_RESULT, SET_LOADING} from '../constants/ActionTypes';

const initialState = {
    text: 'Find bi-weekly trends for your favorite class',
    query: '',
    loading: false,
    result: [],
    searchedByID: false,
    unmodifiedQuery: ''
}

const flavorTexts = [
    'Find out how many people dropped after the first midterm',
    'Find bi-weekly trends for your favorite class',
    'Maybe you\'ll get that class...',
    'Kinda useful for around two weeks each quarter',
    'TFW all of your friends have enrollment earlier than you do',
    '#IBregrets',
    'I named this site just for the pun',
    'In case you were wondering: Socs = Schedule of Classes Scraper'
]


// from developer.mozilla
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function home(state = initialState, action) {
    switch(action.type) {

        case SET_FLAVOR_TEXT:
            var index = getRandomInt(0, flavorTexts.length);
            var newFlavorText = flavorTexts[index];

            return Object.assign({}, state, {
                text: newFlavorText
            });

        case SET_SEARCH_QUERY:
            var newTitle = action.string.toUpperCase();
            var match = newTitle.match(/\d/);
            if (!newTitle.includes(' ') && match && match.index !== 0) {
                var index = match.index;
                newTitle = newTitle.substring(0, index) + ' ' + newTitle.substring(index);
            }
            return Object.assign({}, state, {
                query: newTitle,
                unmodifiedQuery: action.string
            });

        case SET_RESULT:
            var newResult = action.classData
            var newSearchedByID = action.searchedByID
            return Object.assign({}, state, {
                result: newResult,
                loading: false,
                searchedByID: newSearchedByID
            });

        case SET_LOADING:
            return Object.assign({}, state, {
                loading: action.value
            })

        default:
            return state
    }

}
