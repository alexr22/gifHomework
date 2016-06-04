
var buttons = ["basketball", "hockey", "skating"];

//empties the array so it does not repeat itself
//$("#sportButtons").empty();

//a function to create buttons on user input
function renderButtons(){
for (i = 0; i < buttons.length; i++) {

	//creates a variable and makes it a button element
	var a = $("<button>");

	//gives the button a class
	a.addClass('sport');
	a.attr('id', buttons[i]);
	//
	a.attr('dataname', buttons[i]);
	a.text(buttons[i]);
	$("#sportButtons").append(a);
	}

}
//adds a sport to the buttons array
$("#addSport").on("click", function() {
	$("#sportButtons").empty();
	var sports = $("#sport-input").val().trim();
	if (sports !== "") {
	buttons.push(sports);
	$('#sport-input').val('');
	renderButtons();
	return false;

	}else if(sports == "") {
		renderButtons();
		return false
	}
})

renderButtons();
//
// how do I get all the images to work instead of just every other one
//
$("#sportButtons").on("click", function() {
	//need to figure out how to assign this to specific buttons
	var sport = event.target.id;
	console.log(sport);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10"
	$('#sports').empty();

		$.ajax({url: queryURL, method: 'GET'})

			.done(function(response) {

				var imageUrl = response.data
				console.log(imageUrl)
				


				for (var i = 0; i < imageUrl.length; i++) {
					var gifDiv = $('<div class="item">');

					var rating = imageUrl[i].rating;

					var sport = $("<p>").text("Rating: " + rating);
					var sportImage = $('<img>');
					

                    sportImage.attr('src', imageUrl[i].images.fixed_height_still.url);
                    sportImage.attr('data-still', imageUrl[i].images.fixed_height_still.url);
					sportImage.attr('data-animate', imageUrl[i].images.fixed_height.url);
					sportImage.attr('data-state', 'still');
           			sportImage.attr('class', 'images')

                    gifDiv.append(sport);
                    gifDiv.append(sportImage);
                    $('#sports').prepend(gifDiv);
                    gifDiv.addClass('gif');
                    console.log(gifDiv);

                    

					$('img').on("click", function() {
						//console.log(imageUrl[i].url);

						var state = $(this).attr('data-state');
							//console.log(state);
						if (state == 'still') {
							console.log(this);
						   $(this).attr('src', $(this).data('animate'));
						   $(this).attr('data-state', 'animate');
						}else{
						    $(this).attr('src', $(this).data('still'));
						    $(this).attr('data-state', 'still');
						}
					})



				}
			})

			return false;


})

//"http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10"

//"http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=10"