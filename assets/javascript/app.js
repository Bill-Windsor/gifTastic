      var giphyTopics = ["Frisbee", "Bicycling", "Apples", "Oranges", "Funny Puppy", "Funny Kitten"];

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=frisbee&api_key=dc6zaTOxFJmzC&limit=10";

      // Function for displaying GIPHY data
      function renderButtons() {
        // Deleting the giphy buttons prior to adding new giphy buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#giphys-view").empty();
        // Looping through the array of giphys
        for (var i = 0; i < giphyTopics.length; i++) {
          // Then dynamicaly generating buttons for each giphy in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class
          newButton.addClass("giphy");
          // Adding a data-attribute with a value of the giphy at index i
          newButton.attr("data-name", giphyTopics[i]);
          // Providing the button's text with a value of the giphy at index i
          newButton.text(giphyTopics[i]);
          // Adding the button to the HTML
          $("#giphys-view").append(newButton);
        }
      }

      // This function handles events where one of the buttons is clicked
      $("#add-giphy").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var giphyInput = $("#giphy-input").val().trim();
        // The movie from the textbox is then added to our array
        giphyTopics.push(giphyInput);
        console.log(giphyTopics);

        $("#giphy-input").val('');
        // Calling renderButtons which handles the processing of our giphy array
        renderButtons();
      });
      // Calling the renderButtons function at least once to display the initial list of giphys
      renderButtons();

/*
Pseudo-code to complete further functionality:
  (1) I have only enabled the first button to generate the GIPHY API Query. 
   Next is to construct the buttons in a button array, so that I can reference each button 
   as an array element to generate a GIPHY API Query.

  (2) Function for displaying the giphy info
      Using $(document).on to add event listeners to dynamically generated elements
  $(document).on("click", ".buttons", displayGiphyInfo);

  (3) Function for dumping the JSON content for each button into the div
    function displayGiphyInfo() {
      var movie = $(this).attr("data-name");

  (4) Add new buttons and enable buttons to generate GIPHY API query 
      - on button click
      - this.attr
      - query https:  incliuding GIPHY API key
      - ajax (then)
      - var response = response.data
      - ratings check
*/

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            console.log(response);

            for (var i=0; i < response.data.length; i++)  {
              var newImg = $('<img>');
              newImg.addClass('gif');
              var still = response.data[i].images.fixed_height_still.url;
              var moving = response.data[i].images.fixed_height.url;
              newImg.attr('src', still);
              newImg.attr('data-state', "still");
              newImg.attr('data-still', still);
              newImg.attr('data-moving', moving);
              $('.gifs').append(newImg);
            }
            console.log(response.data[0].images.fixed_height.url);

          });

        $(document).on('click', '.gif', function()  {

          if ($(this).attr('data-state') === 'still')  {
            $(this).attr('src', $(this).attr('data-moving'));
            $(this).attr('data-state', 'moving');
            }
            else if ($(this).attr('data-state') === 'moving')  {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');           
          }
        });
