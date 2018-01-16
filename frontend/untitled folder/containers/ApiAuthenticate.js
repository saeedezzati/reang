// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from 'axios';
import _ from 'lodash';
import { setToken, requestUserInfo, receiveUserInfo, receiveUserTokenInfo, requestProfileInfo, receiveProfileInfo, clearUserInfo } from '../actions/actions'
import cookies from 'react-cookies';

import { URL, SID, FB_LOGIN, TOKEN, CONVERT_TOKEN, USER } from '../config/Api';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const clientId = {'facebook': '?????????????'}

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export function errorHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export const ApiAuthenticate = {
    getUserProfile: (token, socialId, dispatch) => {
        var appToken = token.access_token;
        
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                'X-CSRFToken': cookies.load('csrftoken'),
                'Authorization': 'Bearer ' + appToken,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                'f': 's'
            }
        }
        // dispatch(requestUserInfo());
        // dispatch(requestProfileInfo());
        return axios
            .get(URL + USER + socialId + '/', config)// login to website with user social id
            .then(function (response) {
                // var user_id = response.data.id
                dispatch(receiveUserTokenInfo(response.data, token));
                // dispatch(receiveProfileInfo(response.data));
                window.close()
                
            })
            .catch(function (error) { //URL + USER + social_id
                errorHandler(error)
            });
    },
    convertToken: (socialService, socialId, socialToken, dispatch) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        var body = new URLSearchParams();
        body.append('grant_type', 'convert_token');
        body.append('client_id', clientId[socialService]);
        body.append('backend', socialService);
        body.append('token', socialToken);

        return axios
            .post(URL + CONVERT_TOKEN, body, config)// convert fb token to app token
            .then(function (response) {
                // dispatch(setToken(response.data));
                var token = response.data;
                token.social_service = socialService;
                token.expiresAt = Date.now()+36000*1000;
                ApiAuthenticate.getUserProfile(token, socialId, dispatch)
            })
            .catch(function (error) { // URL + CONVERT_TOKEN,
                errorHandler(error)
            });
    },
    refreshToken: (token, dispatch, callback, args) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        var refreshToken = token.refresh_token;
        var socialService = token.social_service;

        var body = new URLSearchParams();
        body.append('grant_type', 'refresh_token');
        body.append('client_id', clientId[socialService]);
        body.append('backend', socialService);
        body.append('refresh_token', refreshToken);

        return axios
            .post(URL + TOKEN, body, config)// convert fb token to app token
            .then(function (response) {
                var token = response.data;
                token.social_service = socialService;
                token.expiresAt = Date.now()+36000*1000;
                dispatch(setToken(token));
                callback(token, ...args, dispatch)
            })
            .catch(function (error) { // URL + CONVERT_TOKEN,
                errorHandler(error)
            });
    },
    authenticate: (socialService, dispatch) => {
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                // 'X-Forwarded-Host': '4ren4.com:8000',
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        }
        return axios
            .get(URL + SID,  config)
            .then(function (response) {
                var extraData = (response.data[socialService].extra_data).slice(0);
                var socialId = response.data[socialService].uid;
                var socialToken = JSON.parse(extraData).access_token;
                ApiAuthenticate.convertToken(socialService, socialId, socialToken, dispatch)
                
            })
            .catch(function (error) { 
                errorHandler(error)
            });
    },
    deauthenticate: (dispatch) => {
        // dispatch(clearAppState());
        dispatch(clearUserInfo());
    }
}
