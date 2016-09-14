import {baseURL} from '../constants/API';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export default class APIWrapper {

    getClassByName(course) {
        var queryTitle = course.split(' ').join('%20');
        var queryURL = baseURL + '/name/' + queryTitle;

        return fetch(queryURL)
            .then(function(response) {
                if (response.status >= 400) {
                    return {data: []};
                }
                return response.json();
            })
            .then(function(result) {
                return result.data;
            })
    }

    getClassByID(courseID) {
        var queryURL = baseURL + '/id/' + courseID;
        return fetch(queryURL)
            .then(function(response) {
                if (response.status >= 400) {
                    return {data: []};
                }
                return response.json();
            })
            .then(function(result) {
                return result.data;
            })
    }
}