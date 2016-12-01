//Theme TV shows

// Initilize variable
var gifButtons;

$(document).ready(function(){

	// Public demo key for giphy API
	var apiKey = "dc6zaTOxFJmzC";
 	
 	// populating the array with some shows
	gifButtons = ["South Park", "Family Guy", "Archer",
 				"Game of Thrones", "Friends", "Daredevil",
		 		"Jessica Jones", "Futurama", "Seinfeld"
 				];

	// This function creates buttons of the shows in gifButton
	// array, and pushes them on the page
 	var createButtons = function(){
 		//empty the html
 		$("#gifButtons").empty();
 		// loop through the gifbutton array
 		for (var i = 0; i < gifButtons.length; i++){
			//create a button and add attributes to it
			var createButton = $("<button>");
			createButton.addClass("gifButton btn btn-default");
			createButton.attr({"value": gifButtons[i], "type":"button"});
			//Write the name of the show on the button
			createButton.html(gifButtons[i]);
			//push the button to the html
			$("#gifButtons").append(createButton);
		} // for loop to add button ends here
	} //createButtons function ends here.

	// adding an event listener to the button
	$("#gifButtons").on("click", ".gifButton", function(){
		//empty's the area where gifs are being displayed
		$("#gifDisplay").empty();

		var buttonValue = $(this).val();
		// replace the spaces in the show's name with + sign for search 
		var searchTerm = buttonValue.replace( /\s+/g, "+");
		// create a link for search
		var searchQuery = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm +"&api_key=" + apiKey + "&limit=10&offset=0";
		// making a call to API to get data
		$.ajax({
			url: searchQuery, method: "GET"
		})
		//when all the data has been acquired . . .
		.done(function(response){

			var results = response.data;
			// this loops through the array of the results object
			for (var i = 0; i < results.length; i++){
				// create a div to populate with a gif, and it's rating
				var gifDiv = $("<div>");
				gifDiv.addClass("gifDiv");
				// create an image HTML tag and give it attributes
				var gif = $("<img>");
				gif.attr({
					"src": results[i].images.fixed_height_still.url,
					"data-still": results[i].images.fixed_height_still.url,
					"data-animated": results[i].images.fixed_height.url,
					"data-state": "still",
				});
				gif.addClass("gif");


				var imageRating = results[i].rating;

				var p = "<p> Rating: " + imageRating + "</p>";
				// push the gif rating to the gifDiv
				gifDiv.html(p);
				// push the gif to the gifDiv
				gifDiv.append(gif);
				// push the gif to the page
				$("#gifDisplay").append(gifDiv);

			}
		}) // function after ajax call ends here						
	}) // event listener for the button ends here.
			
	//adds an event listener on the gif

	$(document).on("click", ".gif", function(){
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animated"));
			$(this).attr("data-state", "animate");	
		}

		else if (state !== "still") {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state","still");
		}		

	}) //event listener for gif click ends here

	//add event listener for the user to add a show
	$("#addButton").on("click", function(){
		var userInput = $("#addShow").val().trim();
		gifButtons.push(userInput);
		$("#addShow").val('');
		createButtons();
	}) // event listener to add a show ends here

	createButtons();

}); //document.ready function ends here