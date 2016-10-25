$(document).ready(function() {

  $('form').submit(function(evt){
    evt.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');
    
    $searchField.prop('disable',true);
    $submitButton.attr('disable',true).val("searching.....");
    //the AJAX part
     var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var searchTerm= $searchField.val();
    var flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    function displayPhotos(data) {
      
      var photoHTML = '<h1>Here are pictures of '+searchTerm+' on Flickr.</h1><ul>';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.val("");
      $searchField.prop('disable',false);
      $submitButton.attr('disable',false).val("search");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  });
  
  
}); // end ready


//add no found message 