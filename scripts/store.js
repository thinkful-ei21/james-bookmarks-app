'use strict';

const store = (function (){

    function addItem(item) {
        this.items.push(item);
    }
    
    function toggleAddingBookmark() {
        this.addingBookmark = !this.addingBookmark;
    }
    return {
        items: [],
        addingBookmark: false,
        toggleAddingBookmark,
        addItem,
    };

}());