// this is the entry point for all actions
import * as types from '../constants/ActionTypes';
import APIWrapper from '../utils/APIWrapper';

function setWrapperResult(classData, searchedByID) {
    return {
        type: types.SET_RESULT, classData, searchedByID
    }
}

function setLoadingData(value) {
    return {
        type: types.SET_LOADING, value
    }
}

export function resetSearch(classData) {
    var searchedByID = false;
    return {
        type: types.SET_RESULT, classData, searchedByID
    }
}

export function searchClassByName(string) {
    return (dispatch, getState) => {
        const stateQuery = getState().default.home.query;
        var wrapper = new APIWrapper();

        dispatch(setLoadingData(true));

        return wrapper.getClassByName(stateQuery).then(function(result) {
            dispatch(setWrapperResult(result, false))
        })
    }
}

export function searchClassByID(string) {
    return (dispatch, getState) => {
        const stateQuery = getState().default.home.query;
        var wrapper = new APIWrapper();

        dispatch(setLoadingData(true));

        return wrapper.getClassByID(stateQuery).then(function(result) {
            dispatch(setWrapperResult(result, true))
        })
    }
}

export function setSearchQuery(string) {
    return {
        type: types.SET_SEARCH_QUERY, string
    }
}

export function setFlavorText() {
    return {
        type: types.SET_FLAVOR_TEXT
    }
}