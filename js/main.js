// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    // local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        // When setting, JSON.stringify will turn JSON into a string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        // When getting, JSON.parse will turn a string into JSON
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmarks(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }   
    // Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-secondary" target="_blank" href="'+url+'">Visit</button> ' +
                                        ' <a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</button> ' +
                                        '</h3>'+
                                        '</div>';
    }
}

// Validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}