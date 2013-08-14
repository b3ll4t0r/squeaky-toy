/**
 * TODO: Enter comments
 *
 * @author: <a href="mailto:billbraski1999@rocketmail.com">83||470r</a>
 * Created on: Jupiter
 */

'use strict';

var util = require('./util');

//-----------DAO functions
/**
 * This method will save a edge object.
 *
 * @param {Object} edge - A model object of type edge (must contain a queryString method).  Cannot be null.
 * @param {Function} callback - The function that the model result will be returned to.  Can be null.
 */
function save(edge, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isEntityValid(edge)) {
        console.log('edge is valid: ' + JSON.stringify(edge));
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('POST','/graphs/consciousness/edges?' + edge.queryString),
            callback);
    } else {
        console.log('edge is not valid:' + JSON.stringify(edge));
    }
}

/**
 * This method will get all vertices of the specified type and return the results to the callback.
 *
 * @param {String} type - This is the type of the edge that we are searching for.  Must match one of the known
 * edge types in globalTypes.js and, hence, cannot be null.
 * @param {Function} callback - This is the function that the model will be returned to.  Cannot be null.
 */
function getAll(type, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isTypeValid(type)) {
        console.log('edge type is valid:' + type);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('GET', '/graphs/consciousness/edges?type=' + type),
            callback);
    } else {
        console.log('edge type is not valid:' + type);
    }
}

/**
 * This method will get the edge with the specified id and return the results to the callback.
 *
 * @param {String} id - This is the _id of the edge as it was assigned by Titan.
 * @param {Function} callback - This is the function that the model will be returned to.  Cannot be null.
 */
function g3t(id, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isIdValid(id)) {
        console.log('id is valid: ' + id);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('GET', '/graphs/consciousness/edges/' + id),
            callback);
    } else {
        console.log('id is not valid: ' + id);
    }
}

/**
 * This method will update a edge object.
 *
 * @param {Object} edge - A model object of type edge (must contain a queryString method).  Cannot be null.
 * @param {Function} callback - The function that the model result will be returned to.  Can be null.
 */
function update(edge, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isEntityValid(edge)) {
        console.log('edge is valid: ' + JSON.stringify(edge));
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('PUT', '/graphs/consciousness/edges?' + edge.queryString),
            callback);
    } else {
        console.log('edge not is valid: ' + JSON.stringify(edge));
    }
}

/**
 * This method will delete the edge with the specified id and return the results to the callback.
 *
 * @param {String} id - This is the _id of the edge as it was assigned by Titan.
 * @param {Function} callback - This is the function that the model will be returned to.  Can be null.
 */
function remove(id, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isIdValid(id)) {
        console.log('id is valid: ' + id);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('DELETE', '/graphs/consciousness/edges/' + id),
            callback);
    } else {
        console.log('id is not valid: ' + id);
    }
}

//-----------Exports
module.exports = {
    'get': g3t,
    'getAll': getAll,
    'save': save,
    'update': update,
    'delete': remove
};