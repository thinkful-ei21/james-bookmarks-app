/* global store */

'use strict';


const bookmarks = (function (){

    function handleAddButtonClicked() {
        $('.add-bookmark').click(function(event){
            store.toggleAddingBookmark();
            render();
        });
    }

    function generateAddingNewBookmarkHtml(){
        return `<input type="text" name="article-title" class="article-title" placeholder="title of article">
        <input type="text" name="article-url" class="article-url" placeholder="http://www.example.com">`;
    }

    function render() {
        let bookmarks = store.items;

        // if (store.addingBookmark) {
        //     generateAddingNewBookmarkHtml();
        // }
        // use jquery html() to append generated form on the html page after add button is clicked

        if (store.addingBookmark) {
            $('.js-bookmarks').html(generateAddingNewBookmarkHtml());
        } else {
            $('.js-bookmarks').html();
        }
    }

    function bindEventListeners(){
        handleAddButtonClicked();
    }

    return {
        bindEventListeners,
        render,
    };
}());