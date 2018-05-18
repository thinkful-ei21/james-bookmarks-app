/* global store */

'use strict';


const bookmarks = (function (){

    function handleAddButtonClicked() {
        $('.add-bookmark').click(function(event){
            store.toggleAddingBookmark();
            render();
        });
    }

    function handleDiscardButton(){
        $('.addbookmark-form-container').on('click', '.discard-button', function(event) {
            console.log('delete button clicked');
        });
    }
    
    function handleAddToListButtonClicked() {
        $('.addbookmark-form-container').on('click', '.add-to-list', function(event){
            console.log('add to list clicked');
        });
    }

    function generateAddingNewBookmarkHtml(){
        return `<div class="input-form" id="input-form">
        <div class="article-title-container">
            <label for="article-title" class="title-label">Title:</label>
            <input type="text" name="article-title" class="article-title" placeholder="title of article">
        </div>

        <div class="article-url-container">
            <label for="article-url" class="url-label">Url:</label>
            <input type="text" name="article-url" class="article-url" placeholder="http://www.example.com">
        </div>

        <div>
            <label for="desc-box" class="desc-box">Description:</label>
            <input type="text" name="desc-box" class="desc-box" placeholder="Insert description text here">
        </div>

        <div class="input-form-buttons">
            <button class="discard-button">Discard</button>
            <button class="add-to-list">Add to list</button>
        </div>
    </div>`;
    }

    function render() {
        let bookmarks = store.items;

        if (store.addingBookmark) {
            $('.addbookmark-form-container').html(generateAddingNewBookmarkHtml());
        }
    }

    function bindEventListeners(){
        handleAddButtonClicked();
        handleDiscardButton();
        handleAddToListButtonClicked();
    }

    return {
        bindEventListeners,
        render,
    };
}());