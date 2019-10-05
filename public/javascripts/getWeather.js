// Outputs reponse to page with given class name and message
// if output element exists
function outputResponse(className, message) {
  var outputElement = document.querySelector("#response-output");

  if (!outputElement) {
    return;
  }

  outputElement.classList = className;
  outputElement.innerHTML = message;
}

// Handles the response of the weather API call
function handleFormResponse(data) {
  if (data.weather) {
    // TODO: Add temperature to response output
    var temperature = data.main.temp.toFixed(1); //decimal point control to 1 dec
    //my code^
    var description = data.weather[0].description;
    var weatherOutput = `${temperature}°C ${description} ANDY IS THE BEST`; //you need to do ${} cuz this will be run in a server. on a terminal.

    outputResponse("weather", weatherOutput);
  } else {
    var errorOutput = data.message;

    outputResponse("error", errorOutput);
  }
}

// Returns the value of the city name input if it exists
// (returns empty string otherwise)
function getCityInputValue() {
  var cityInputElement = document.querySelector("input[name='city']");

  if (!cityInputElement) {
    return "";
  }

  return cityInputElement.value;
}

// Handles form submission by making API call to weather endpoint
// with given city name
function handleFormSubmit(event) {
  event.preventDefault();
  document.activeElement.blur();

  // DONE: Add loading state output
  outputResponse("loading", "..."); //shows ... when loading. im assuming loading is a valid param. 

  // TODO: Add loading state output
  fetch(`/weather/${getCityInputValue()}`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(r => r.json()) //get rrequest happens, then the output becomes r, then r becomes data in the next line
    .then(data => handleFormResponse(data));
}

// Creates event listener for form submission once the page
// has loaded and form element exists
document.addEventListener("DOMContentLoaded", function() {
  var weatherFormElement = document.querySelector("#weather-form");

  if (weatherFormElement) {
    weatherFormElement.addEventListener("submit", handleFormSubmit); //this calls handleFormSubmit every time the submit button is pressed
  }
});
