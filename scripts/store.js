'use strict';

const store = (function (){

    function addItem(item) {
        this.items.push(item);
    }
    
    function toggleAddingBookmark() {
        this.addingBookmark = !this.addingBookmark;
    }

    function findById(id) {
        return this.items.find(item => item.id === id);
    }

    function toggleExpanded(id) {
        const item = this.findById(id);
        console.log(item);
        item.expanded = !item.expanded;
    }



    return {
        items: [],
        addingBookmark: false,
        toggleAddingBookmark,
        addItem,
        findById,
        toggleExpanded,
    };

}());