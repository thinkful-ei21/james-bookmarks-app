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
        item.expanded = !item.expanded;
    }

    // function deleteItem(id) {
    //     const item = this.findById(id);
    //     this.items.splice(id, 1);
    // }

    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
    };


    return {
        items: [],
        addingBookmark: false,
        toggleAddingBookmark,
        addItem,
        findById,
        toggleExpanded,
        findAndDelete,
    };

}());