/**
 * TODO: Enter comments
 *
 * @author: <a href="mailto:billbraski1999@rocketmail.com">83||470r</a>
 * Created on: Jupiter
 */

'use strict';

var http = require('http');
var config = require('./config');


//-----------Validation functions
/**
 * This function will test to see if a {String} is undefined, null, empty or blank and return true if so.
 * @param pString {String} the {String} to test against.
 * @returns {Boolean} True if the string is undefined, null, empty or blank.
 */
function isBlank(pString){
    if (!pString || pString.length === 0) {
        return true;
    }
    // checks for a non-white space character
    // which I think [citation needed] is faster
    // than removing all the whitespace and checking
    // against an empty string
    return !/[^\s]+/.test(pString);
}

/**
 * This method will return true if the entity contains valid values.  This is accomplished by ensuring that the
 * entity is not null and defined, that is contains a function called <code>qureyString</code> and that the
 * <code>entity.constructor</code> property is not one of: <ul><li>Array</li><li>Object</li><li>Function</li>
 * <li>String</li><li>Number</li><li>Boolean</li></ul>
 *
 * @param {Object} entity A model object.  Cannot be null.
 * @returns {Boolean} True if the entity contains the attributes and data needed to perform the operation.
 */
function isEntityValid(entity) {
    if(entity === null || entity === undefined) {
        console.error('No entity was supplied.');
        return false;
    }
    if(isBlank(entity.queryString)) {
        console.error('There was no entity data supplied in the query string.');
        return false;
    }
    return isTypeValid(entity.constructor);
}

/**
 * Validates that the parameter a constructed type and not a existing JavaScript construct.
 * @param {Number} type - The type of the entity.
 * @returns {Boolean} True if the type is valid.
 */
function isTypeValid(type) {
    if(type === Array || type === Object || type === Function || type === String || type === Number ||
        type === Boolean) {
        console.log('type is not valid: ' + type);
        return false;
    }
    console.log('type is valid: ' + type);
    return true;
}

/**
 * Validates that and id is not null or empty.
 * @param {String} id - The _id value to be searched for.
 * @returns {Boolean} True if the id is valid.
 */
function isIdValid(id) {
    if(isBlank(id)) {
        console.error('An id was not supplied.');
        return false;
    }
    return true;
}
/**
 * Validates that the supplied method is one of the HTTP methods that Rexster supports.
 * @param {String} method The supplied HTTP method.
 * @returns {Boolean} True if method is one of: <ul><li>GET</li><li>PUT</li><li>POST</li><li>DELETE</li></ul>
 */
function isHTTPMethodValid(method) {
    if(isBlank(method)) {
        console.log('no method was provided.');
        return false;
    }
    return (method === 'GET' || method === 'PUT' || method === 'POST' || method === 'DELETE');
}

//-----------Heavy lifting functions
/**
 * Shortcut to get request options pre-populated with the host and port of titan.  If an incorrect <code>method</code>
 * is supplied then this method will default to <code>GET</code>.
 * @param method The HTTP method for the request.  To be validated with <code>isHTTPMethodValid</code>
 * @param path The path which should include any query string needed.
 * @returns {{hostname: *, port: *, path: *, method: *}}
 */
function configureOptions(method, path) {
    if(isHTTPMethodValid(method)) {
        console.log('method is valid: ' + method);
    } else {
        console.log('method is not valid: ' + method);
        console.log('defaulting to GET');
        method  = 'GET';
    }
    return {
        hostname:config.titan.host,
        port:config.titan.port,
        path: path,
        method: method
    };
}

/**
 * This method will process the HTTP request and response objects and pass the data onto the callback function if it
 * is not null.
 * @param {Object} options - The HTTP request options object.  Cannot be null.
 * @param {Function} callback - The callback method to return the results to.  Can be null.
 *
 * @return {Object} request - The configured request that has been sent.
 */
function processTitanCall(options, callback) {
    console.log("Entering processTitanCall with " + JSON.stringify(options));
    //TODO: I'd like to pass in a response processing function as the callback.  However, I'd need to also give the
    //TODO: callback function as a parameter to the same function...  Not sure how to do this.
    //Set up the request and the callback to process the response.
    var request = http.request(options, function (response) {
        //Log the response data for debugging.
        console.log('response code: ' + response.statusCode);
        console.log('response headers: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        //Set up the temp to cram the results into. TODO: If there is no callback then do I need this var?
        var responseData = [10];
        //Every time we get data from the response append it to the temp.
        response.on('data', function (chunk) {
            responseData.push(chunk);
        });
        //If we get an error log it and report it up to the callback.
        response.on('error', function (chunk) {
            console.error('There was an error in the response: ' + response.error);
            console.error(JSON.stringify(chunk));
            if(callback !== null) {
                //Flip!  Shoot back the error.
                callback(null, response.error);
            }
        });
        //Sweet, we got all the data without errors.
        response.on('end', function () {
            var responseText = responseData.join('');
            //Log it up.
            console.log('responseJSON=' + JSON.parse(responseText));
            if(callback !== null) {
                //Shoot back the results.
                callback(JSON.parse(responseText).results, null);
            }
        });
    });
    request.on('error', function (error) {
        console.error('There was an error in the request: ' + error);
        if(callback !== null) {
            //Flip!  Shoot back the error.
            callback(null, error);
        }
    });
    //Request that the request be executed.  Executed!
    request.end();
    return request;
}

//-----------Exports
module.exports = {
    'isEntityValid': isEntityValid,
    'isTypeValid': isTypeValid,
    'isIdValid': isIdValid,
    'configureOptions': configureOptions,
    'processTitanCall': processTitanCall
};
