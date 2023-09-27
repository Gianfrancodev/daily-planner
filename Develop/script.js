// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

$(document).ready(function() {
  // Function to update the time blocks based on the current time
  function updateBlocks() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function() {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function() {
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
      const savedEvent = localStorage.getItem(`event-${blockHour}`);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Function to save events to local storage
  $(".saveBtn").click(function() {
    const blockHour = parseInt($(this).closest(".time-block").attr("id").split("-")[1]);
    const eventText = $(this).closest(".time-block").find(".description").val();

    if (eventText.trim() !== "") {
      localStorage.setItem(`event-${blockHour}`, eventText);
      alert("Event saved!");
    }
  });

  // Update the time blocks and load events when the page loads
  updateBlocks();
  loadEvents();

  // Update the time blocks every minute to reflect the current time
  setInterval(updateBlocks, 60000);

  // Display the current date and time
  function displayCurrentTime() {
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  displayCurrentTime();

  // Update the current date and time every second
  setInterval(displayCurrentTime, 1000);
});


