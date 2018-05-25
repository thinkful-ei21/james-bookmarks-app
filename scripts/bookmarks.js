/* global store, api */

'use strict';


const bookmarks = (function (){

    function generateBookmarkElement(item) {
        if (item.expanded) {

            return `<li class="bookmark" id="${item.id}">
            <div class="">
                <div class="bookmark-title">${item.title}</div>
                <div class="bookmark-url">${item.url}</div>
                <div class="bookmark-desc">${item.desc}</div>
                <div class="bookmark-rating">${item.rating} Stars</div>
                <button class="delete-bookmark js-bookmark-delete">
                    <span class="delete-button-label">Delete</span>
                </button>
            </div>
        </li>`;
        } else {
            return `<li class="bookmark" id="${item.id}">
                    <div class="">
                        <div class="bookmark-title">${item.title}</div>
                        <div class="bookmark-rating">${item.rating} Stars</div>
                        <button class="delete-bookmark js-bookmark-delete">
                            <span class="delete-button-label">Delete</span>
                        </button>
                    </div>
                </li>`;
        }
    }
 
    function generateBookmarksString(bookmarks) {
        const items = bookmarks.map((item) => generateBookmarkElement(item));
        return items.join('');
    }


    function handleAddButtonClicked() {
        $('.add-bookmark').click(function(event){
            store.toggleAddingBookmark();
            render();
        });
    }

    function handleDiscardButton(){
        $('.addbookmark-form-container').on('click', '.discard-button', function(event) {
            store.toggleAddingBookmark();
            render();
        });
    }


    function handleNewBookmarkSubmit() {
        $('.addbookmark-form-container').on('submit','.input-form', function(event){
            event.preventDefault();
            const title = $(event.currentTarget).find('.article-title').val();
            const url = $(event.currentTarget).find('.article-url').val();
            const desc = $(event.currentTarget).find('.article-desc').val();
            const rating = $(event.currentTarget).find('.article-rating').val();

            api.createNewBookmark(title, url, desc, rating, newBookmark =>{
                store.addItem(newBookmark);
                render();
            });
            event.target.reset();
        });
    }

    function handleDeleteButtonClick() {
        $('.js-bookmarks').on('click', 'li', function(event) {
            const bookmarkId = event.currentTarget.id;
            api.deleteBookmark(bookmarkId, bookmark => {
                store.findAndDelete(bookmarkId);
                render();
            });
        });
    }

    function handleBookmarkClicked() {
        $('ul').on('click', 'li', function(event) {
            const bookmarkId = $(event.currentTarget).attr('id');
            store.toggleExpanded(bookmarkId);
            bookmarks.render();
        });
    }


    function generateAddingNewBookmarkHtml(){
        return `<form class="input-form " id="input-form">
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
            <input type="text" name="desc-box" class="article-desc" placeholder="Insert description text here">
        </div>

        <div>
            <label for="rating-box" class="rating-box">Rating:</label>
            <input type="text" name="rating-box" class="article-rating" placeholder="Rating 1 - 5">
        </div>

        <div class="input-form-buttons">
            <button class="discard-button">Discard</button>
            <input type="submit" class="add-to-list" value="Add to list" />
        </div>
    </form>`;
    }

    function render() {
        let bookmarks = store.items;

        

        if (store.addingBookmark) {
            $('.addbookmark-form-container').html(generateAddingNewBookmarkHtml());
        } else {
            $('.addbookmark-form-container').html('');
        }
        const bookmarkString = generateBookmarksString(bookmarks);

        $('.js-bookmarks').html(bookmarkString);
    }

    function bindEventListeners(){
        handleAddButtonClicked();
        handleDiscardButton();
        handleNewBookmarkSubmit();
        handleBookmarkClicked();
        handleDeleteButtonClick();
    }

    return {
        bindEventListeners,
        render,
    };
}());