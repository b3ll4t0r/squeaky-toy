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
 * This method will save a vertex object.
 *
 * @param {Object} vertex - A model object of type vertex (must contain a queryString method).  Cannot be null.
 * @param {Function} callback - The function that the model result will be returned to.  Can be null.
 */
function save(vertex, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isEntityValid(vertex)) {
        console.log('vertex is valid: ' + JSON.stringify(vertex));
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('POST','/graphs/consciousness/vertices?' + vertex.queryString),
            callback);
    } else {
        console.log('vertex is not valid:' + JSON.stringify(vertex));
    }
}

/**
 * This method will get all vertices of the specified type and return the results to the callback.
 *
 * @param {String} type - This is the type of the vertex that we are searching for.  Must match one of the known
 * vertex types in globalTypes.js and, hence, cannot be null.
 * @param {Function} callback - This is the function that the model will be returned to.  Cannot be null.
 */
function getAll(type, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isTypeValid(type)) {
        console.log('vertex type is valid:' + type);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('GET','/graphs/consciousness/vertices?type=' + type),
            callback);
    } else {
        console.log('vertex type is not valid:' + type);
    }
}

/**
 * This method will get the vertex with the specified id and return the results to the callback.
 *
 * @param {String} id - This is the _id of the vertex as it was assigned by Titan.
 * @param {Function} callback - This is the function that the model will be returned to.  Cannot be null.
 */
function g3t(id, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isIdValid(id)) {
        console.log('id is valid: ' + id);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('GET','/graphs/consciousness/vertices/' + id),
            callback);
    } else {
        console.log('id is not valid: ' + id);
    }
}

/**
 * This method will update a vertex object.
 *
 * @param {Object} vertex - A model object of type vertex (must contain a queryString method).  Cannot be null.
 * @param {Function} callback - The function that the model result will be returned to.  Can be null.
 */
function update(vertex, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isEntityValid(vertex)) {
        console.log('vertex is valid: ' + JSON.stringify(vertex));
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('PUT','/graphs/consciousness/vertices?' + vertex.queryString),
            callback);
    } else {
        console.log('vertex not is valid: ' + JSON.stringify(vertex));
    }
}

/**
 * This method will delete the vertex with the specified id and return the results to the callback.
 *
 * @param {String} id - This is the _id of the vertex as it was assigned by Titan.
 * @param {Function} callback - This is the function that the model will be returned to.  Can be null.
 */
function remove(id, callback) {
    //If we have good data, then make the call to Titan.
    if(util.isIdValid(id)) {
        console.log('id is valid: ' + id);
        //Here are the options to configure the request.
        util.processTitanCall(
            util.configureOptions('DELETE','/graphs/consciousness/vertices/' + id),
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