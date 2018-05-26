/* global store, api, Item */

'use strict';


const bookmarks = (function (){

    function generateBookmarkElement(item) {
        if (item.expanded) {

            return `<li class="bookmark" id="${item.id}">
            <div class="">
                <div class="bookmark-title bookmark-info">${item.title}</div>
                <a href="${item.url}" class="bookmark-info" target="_blank">Visit Page</a>
                <div class="bookmark-desc bookmark-info">${item.desc}</div>
                <div class="bookmark-rating bookmark-info">${item.rating} Stars</div>
                <button class="delete-bookmark js-bookmark-delete">
                    <span class="delete-button-label">Delete</span>
                </button>
            </div>
        </li>`;
        } else {
            return `<li class="bookmark" id="${item.id}">
                    <div class="">
                        <div class="bookmark-title bookmark-info">${item.title}</div>
                        <div class="bookmark-rating bookmark-info">${item.rating} Stars</div>
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
                // try {
                //     Item.validateTitle(title);
                // } catch(error) {
                //     console.log(error);
                // }
                store.addItem(newBookmark);
                render();
            });
            event.target.reset();
        });
    }

    function handleDeleteButtonClick() {
        $('.js-bookmarks').on('click', '.js-bookmark-delete', function(event) {
            console.log(event.target);
            const bookmarkId = $(event.currentTarget).closest('li').attr('id');
            console.log(bookmarkId);
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
            <label for="article-title" class="title-label">Title</label>
            <input type="text" name="article-title" class="article-title box" placeholder="title of bookmark" required>
        
            <label for="article-url" class="url-label">Url</label>
            <input type="url" name="article-url" class="article-url box" placeholder="http(s)://" required>
        

            <label for="desc-box" class="desc-box">Description</label>
            <input type="text" name="desc-box" class="article-desc box" placeholder="Description" required>

            <label for="rating-box" class="rating-box">Rating</label>
            <input type="number" min="1" max="5" name="rating-box" class="article-rating box" required>

        <div class="input-form-buttons">
            <button class="discard-button">Discard</button>
            <input type="submit" class="add-to-list" value="Add to list" />
        </div>
    </form>`;
    }

    function render() {
        let bookmarks = store.items.filter(item => {
            return item.rating >= store.minimumRating;
        });

        // handleDropdownFilter();

        if (store.addingBookmark) {
            $('.addbookmark-form-container').html(generateAddingNewBookmarkHtml());
        } else {
            $('.addbookmark-form-container').html('');
        }
        const bookmarkString = generateBookmarksString(bookmarks);

        $('.js-bookmarks').html(bookmarkString);
    }

    function handleDropdownFilter() {
        $('.select').change(function(event) {
            const ratingFilter = $(event.currentTarget).val();
            store.minimumRating = ratingFilter;
            render();
        });
    }

    function bindEventListeners(){
        handleAddButtonClicked();
        handleDiscardButton();
        handleNewBookmarkSubmit();
        handleBookmarkClicked();
        handleDeleteButtonClick();
        handleDropdownFilter();
    }

    return {
        bindEventListeners,
        render,
    };
}());