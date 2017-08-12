$(function () {
// Add js functionality to the mobile responsive menu:
	$('#dropClick').on('click',function() {
		$('#menuItems')[0].classList.toggle("show");
	});
});

// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});
