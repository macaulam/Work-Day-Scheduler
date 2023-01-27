// Aquire the time and date
var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

// Show the current day and time on page
$("#currentDay").text(currentTime);

// Create array for the work hours (9am-5pm)
var workHours = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

// Loop through work hours and create timeblocks for each hour
for (var i = 0; i < workHours.length; i++) {
  // Create new row for each timeblock
  var row = $("<div>").addClass("row time-block");
  var hour = $("<div>")
    .addClass("col-2 hour")
    .text(workHours[i]);
  var description = $("<textarea>").addClass("col-8 description");
  var saveBtn = $("<button>")
    .addClass("col-2 saveBtn")
    .html("<i class='fas fa-save'></i>");

  // Append the hour, description, and save button to row
  row.append(hour, description, saveBtn);

  // Append the row to container
  $(".container").append(row);

  // Check if current time is past, present, or future
  var currentHour = moment().hour();
  var timeblockHour = workHours.indexOf(workHours[i]) + 9;

  if (timeblockHour < currentHour) {
    description.addClass("past");
  } else if (timeblockHour === currentHour) {
    description.addClass("present");
  } else {
    description.addClass("future");
  }
}

// Get that SAVED button click event
$(".saveBtn").on("click", function() {
  var timeblockIndex = $(".saveBtn").index(this);
  var timeblockDescription = $(".description")
    .eq(timeblockIndex)
    .val();
  localStorage.setItem(workHours[timeblockIndex], timeblockDescription);
});

// Retrieve that saved data from local storage and display in appropriate timeblock
for (var i = 0; i < workHours.length; i++) {
  var savedDescription = localStorage.getItem(workHours[i]);
  $(".description")
    .eq(i)
    .val(savedDescription);
}
