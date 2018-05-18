'use strict';

// eslint-disable-next-line no-unused-vars

const Item = (function(){

    function validateTitle(title){
        if (!title) {
            throw new TypeError('Title required.');
        }
    }

    function validateUrl(Url){
        if (!url) throw new TypeError('Url required');
        if (!url.includes('http://')) throw new TypeError('Url ust include http://');
    } 

    return {
        validateTitle,
        validateUrl,
    };

}());