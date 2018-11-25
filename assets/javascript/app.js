$(document).ready(function() {
  // Initial array of Aquatic Animals
  var topics = [
    "Dolphin",
    "Turtle",
    "Seahorse",
    "Starfish",
    "Whale",
    "Penguin"
  ];

  // Function to display Acquatic Animals data
  function renderButton() {
    // Deleting the Aquatic buttons prior to adding new Aquatic buttons(this is necessary otherwise we will have repeat buttons)
    $("#aquatic-view").empty();
    //looping through the array of Aquatic Animals
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      //adding a class
      a.addClass(topics);
      // Adding a data-attribute with a value of the topic at index i
      a.attr("data-name", topics[i]);
      a.attr("class", "btn btn-info");
      // Providing the button's text with a value of the topic at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#aquatic-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-aquatic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var topic = $("#aquatic-input")
      .val()
      .trim();
    // The new button from the textbox is then added to our array
    if (topic === "") {
    } else {
      topics.push(topic);
    }

    // calling renderButtons which handles the processing of our movie array
    renderButton();
    $("#aquatic-input").val("");
  });
  // Calling the renderButtons function at least once to display the initial list of movies

  renderButton();

  //$("button").on("click", function() {
  $(document).on("click", "button", function() {
    $("#gifs-appear-here").empty();

    var aquatic = $(this).attr("data-name");
    console.log(aquatic);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      aquatic +
      "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.attr("class", "img-div");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var aquaticImages = $("<img>");
        aquaticImages.attr("src", results[i].images.fixed_height_still.url);
        aquaticImages.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        aquaticImages.attr("data-animate", results[i].images.fixed_height.url);
        aquaticImages.attr("data-state", "still");
        aquaticImages.attr("class", "gif");
        gifDiv.prepend(p);
        gifDiv.prepend(aquaticImages);
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  });
});
//ask about this.
//click event does not work after ajax call.
//https://stackoverflow.com/questions/17715274/jquery-click-function-doesnt-work-after-ajax-call
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    var dataAnimate = $(this).attr("data-animate");
    $(this).attr("src", dataAnimate);
    $(this).attr("data-state", "animate");
  } else if (state === "animate") {
    var dataStill = $(this).attr("data-still");
    $(this).attr("src", dataStill);
    $(this).attr("data-state", "still");
  }
});
