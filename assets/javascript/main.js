

    // ========================================== START CODING BELOW!!

    // Initialize Firebase
        
    var firebaseConfig = {
        apiKey: "AIzaSyB6cTXpIoolU5BEkWnzsgA9XkgnKi9-3DU",
        authDomain: "bidapp-d0e47.firebaseapp.com",
        databaseURL: "https://bidapp-d0e47.firebaseio.com",
        projectId: "bidapp-d0e47",
        storageBucket: "bidapp-d0e47.appspot.com",
        messagingSenderId: "267755342923",
        appId: "1:267755342923:web:4016317921dd365a"
      };
     
    
     // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainName = "";
var destinationTrain = "";
var firstTrainHour= "";
var frecuencyTrain = "";

// Capture Button Click
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  trainName = $("#train-name-input").val().trim();
  destinationTrain = $("#destination-input").val().trim();
  firstTrainHour = $("#first-train-hour-input").val().trim();
  frecuencyTrain = $("#frecuency-input").val().trim();

 // Creates local "temporary" object for holding train data
 var newTrain = {
    
    name : trainName,
    destination: destinationTrain,
    firstTrain: firstTrainHour,
    frecuency : frecuencyTrain,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frecuency);
  console.log(newTrain.dateAdded);

  alert("train successfully added");

  // Clears all of the text-boxes
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("first-train-hour-input").val("");
  $("#frecuency-input").val(0);
});

  

// 3. Create Firebase event for adding Trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartHour = childSnapshot.val().firstTrain;
  var trainFrecuency = childSnapshot.val().frecuency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartHour);
  console.log(trainFrecuency);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainStartHour, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrecuency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrecuency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var nextTrainDisplay = moment(nextTrain).format("hh:mm");

  //   // Prettify the employee start

//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStartHour),
    $("<td>").text(trainFrecuency),
    $("<td>").text(nextTrainDisplay),
    $("<td>").text(tMinutesTillTrain)
    
  );

  // Append the new row to the table
  $("tbody").append(newRow);
});



// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is today 6/14/2019


// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

     
     
     
     
     
     
     
     
     
     
     
     
     
    
   
    {/* // Firebase watcher .on("child_added")
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.starthour);
      console.log(sv.frecuency);
      console.log(sv.dateAdded);

      // Change the HTML to reflect
      $("#train-name-display").text(sv.traiName);
      $("#destination-display").text(sv.destination);
      $("#first-train-display").text(sv.first-train);
      $("#frecuency-train-display").text(frecuency-train);
      $("#dateAdded-train-display").text(dateAdded-train);
    )};

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    



 */}



  