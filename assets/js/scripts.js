// custom js scripts

$(document).ready(function() {

	// make img.img-card into cards and display alt text as caption
	$("main img").each(function() {
		$(this).wrap("<div class='card image-card-wrap d-block my-2 mx-0 mx-md-2 float-md-right'></div>");
		$(this).addClass("card-img-top");
		var imageCaption = $(this).attr("alt");
		var imageSRC = $(this).attr("src");
		if (imageCaption == null ) {
			$("<div class='card-body'><small class='card-text'><i>Caption not available</i><a class='mg-popup ml-1 text-secondary' title='Caption not available' href='" + imageSRC + "'><i class='fas fa-search-plus'></i></a></small></div>").insertAfter(this);
		} else {
			$("<div class='card-body'><small class='card-text' role='note'>" + imageCaption + "<a class='mg-popup ml-1 text-secondary' href='" + imageSRC + "' title='" + imageCaption +"'><i class='fas fa-search-plus'></i></a></small></div>").insertAfter(this);
		}
	});			
	
	$('main').magnificPopup({
		delegate: 'a.mg-popup',
		type:'image',
		gallery:{
			enabled:true
		},
		callbacks: {
			open: function() {
				$('html, body').addClass('modal-open');
			},
			close: function() {
				$('html, body').removeClass('modal-open');
			}
		},
	});
	

	// more code here

});


// initialise typeahead

$(function () {

  function initSearchBox() {
    var pages = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace(['title', 'abstract']),
      // datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,

      prefetch: '/search.json'
    });

    $('#search-box').typeahead({
	minLength: 3,
	highlight: true,
	classNames: {
		menu: 'w-100',
		dataset: 'dropdown-menu show shadow mt-1 w-100',
		suggestion: 'dropdown-item small text-truncate',
		highlight: 'border-bottom border-success',
	},
    }, {
        name: 'pages',
        display: 'title',
        source: pages
      });

    $('#search-box').bind('typeahead:select', function (ev, suggestion) {
      window.location.href = suggestion.url;
    });
  }

  initSearchBox();
});
