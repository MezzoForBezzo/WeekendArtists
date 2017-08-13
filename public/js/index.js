$(function () {
// Add js functionality to the mobile responsive menu:
	$('#dropClick').on('click',function() {
		$('#menuItems')[0].classList.toggle("show");
	});
});

function showSearch(){
	$('#overlay').toggle();
}

function doSearch(event){
	this.event.preventDefault();
	window.location.href = `/?q=${$('#search').val()}`;
}