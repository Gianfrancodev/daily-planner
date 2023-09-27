$(document).ready(function() {
  function updateBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  function loadEvents() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      var savedEvent = localStorage.getItem(`event-${blockHour}`);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  $(".saveBtn").click(function() {
    var blockHour = parseInt($(this).closest(".time-block").attr("id").split("-")[1]);
    var eventText = $(this).closest(".time-block").find(".description").val();

    if (eventText.trim() !== "") {
      localStorage.setItem(`event-${blockHour}`, eventText);
      alert("Event saved to local storage!");
    }
  });

  updateBlocks();
  loadEvents();

  setInterval(updateBlocks, 60000);

  function displayCurrentTime() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  displayCurrentTime();

  setInterval(displayCurrentTime, 1000);
});


