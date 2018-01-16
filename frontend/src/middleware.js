//https://medium.com/@Scarysize/syncing-redux-stores-across-browser-tabs-fff04f975423

import {RECEIVE_USER_TOKEN_INFO, SET_LOGIN_ERROR, CLEAR_USER_INFO } from "./actionTypes/actionTypes";
const sourceId = Math.floor(Math.random() * 10000);

const storageKey = 'redux-tab-sync';
const validActionTypes = [RECEIVE_USER_TOKEN_INFO, SET_LOGIN_ERROR, CLEAR_USER_INFO]
export function storageMiddleware() {
    return () => next => action => {
        if(validActionTypes.includes(action.type)){
            if(!action.counter){
                action.counter=1
                action.sourceId = sourceId
            }else{
                action.counter+=1
            }
            localStorage.setItem(
                storageKey,
                JSON.stringify(action)
            );
        }
        next(action);
    };
}

export function createOnStorage(store) {
    return () => {
        const action = JSON.parse(localStorage.getItem(storageKey));
        if (action && action.sourceId !== sourceId && action.counter<3) {
            store.dispatch(action);
        }
    }
}