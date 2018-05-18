/* global store */

'use strict';


const bookmarks = (function (){

    function handleAddButtonClicked() {
        $('.add-bookmark').click(function(event){
            store.toggleAddingBookmark();
            render();
        });
    }

    // function generateAddingNewBookmarkHtml(){
    //     return ` <div class="input-form" id="input-form">
    //     <div class="article-title-container">
    //         <label for="article-title" class="title-label">Title:</label>
    //         <input type="text" name="article-title" class="article-title" placeholder="title of article">
    //     </div>

    //     <div class="article-url-container">
    //         <label for="article-url" class="url-label">Url:</label>
    //         <input type="text" name="article-url" class="article-url" placeholder="http://www.example.com">
    //     </div>

    //     <div>
    //         <label for="desc-box" class="desc-box">Description:</label>
    //         <input type="text" name="desc-box" class="desc-box" placeholder="Insert description text here">
    //     </div>
    // </div>`;
    // }

    function render() {
        let bookmarks = store.items;

        // if (store.addingBookmark) {
        //     $('.js-bookmarks').html(generateAddingNewBookmarkHtml());
        // }
    }

    function bindEventListeners(){
        handleAddButtonClicked();
    }

    return {
        bindEventListeners,
        render,
    };
}());