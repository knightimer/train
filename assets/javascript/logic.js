 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCoOlLYBYk9I5cjI3Nc_SZbRoleDHtNCdk",
  authDomain: "t-schedule.firebaseapp.com",
  databaseURL: "https://t-schedule.firebaseio.com",
  projectId: "t-schedule",
  storageBucket: "t-schedule.appspot.com",
  messagingSenderId: "509348350493"
};
firebase.initializeApp(config);

  var database = firebase.database();

//  Button for adding train
  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var nextArrival = $("#train-arrival").val().trim();
    var tFrequency = $("#tFrequency").val().trim();

  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      train: trainName,
      frequency: tFrequency,
      arrival: nextArrival,
      destination: destination,
    };
  
    // Uploads trains data to the database
    database.ref().push(newTrain);{
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.tFrequency);
    console.log(newTrain.nextArrival);
    console.log(newTrain.destination);
    
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-arrival").val("");
    $("#tFrequency").val("");
  };
  
  // 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var newTrain = childSnapshot.val().train;
    var newDestination = childSnapshot.val().destination;
    var newArrival = childSnapshot.val().arrival;
    var newFrequency = childSnapshot.val().frequency;
  
    // new train info
    console.log(newTrain);
    console.log(newDestination);
    console.log(newArrival);
    console.log(newFrequency);

   

  var tFrequency = newFrequency;

  var firstTime = newArrival;

 
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);


  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);


  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#train-info").append("<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
  newFrequency + "</td><td>" + (moment(nextTrain).format("hh:mm")) + "</td><td>" + tMinutesTillTrain + "</td>");

  })

  });