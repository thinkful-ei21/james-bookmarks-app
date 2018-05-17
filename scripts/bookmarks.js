/* global store */

'use strict';


const bookmarks = (function (){

    function handleAddButtonClicked() {
        $('.add-bookmark').click(function(event){
            
        });
    }
    
    function render() {
        let bookmarks = store.items;


    }

    function bindEventListeners(){
        handleAddButtonClicked();
    }

    return {
        bindEventListeners,
        render,
    };
}());