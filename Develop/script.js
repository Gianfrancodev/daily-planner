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
  // Define working hours (9am to 5pm)
  const workingHours = Array.from({ length: 9 }, (_, i) => 9 + i);

  // Function to generate time slots
  function generateTimeSlots() {
      const timeSlotsContainer = $('.time-slots');

      workingHours.forEach(hour => {
          const timeSlot = $('<div class="time-slot">');
          const timeLabel = $('<label>').text(hour + ':00');
          const eventInput = $('<input type="text" placeholder="Add event">');
          const saveButton = $('<button>').text('Save');

          // Event handler to save the event
          saveButton.click(function() {
              const eventText = eventInput.val();
              if (eventText.trim() !== '') {
                  // Save the event to local storage or any preferred data storage
                  // For simplicity, we'll use local storage here
                  localStorage.setItem(`event-${hour}`, eventText);
                  alert('Event saved!');
              }
          });

          timeSlot.append(timeLabel, eventInput, saveButton);
          timeSlotsContainer.append(timeSlot);

          // Retrieve and display any saved events
          const savedEvent = localStorage.getItem(`event-${hour}`);
          if (savedEvent) {
              eventInput.val(savedEvent);
          }
      });
  }

  // Initialize the calendar
  generateTimeSlots();
});

