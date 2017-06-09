var config = {
    apiKey: "AIzaSyBP7z9c2H5GUE1L5mxrdhONgy16wtxOM98",
    authDomain: "awe2-a3026.firebaseapp.com",
    databaseURL: "https://awe2-a3026.firebaseio.com",
    projectId: "awe2-a3026",
    storageBucket: "awe2-a3026.appspot.com",
    messagingSenderId: "147671377025"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var trainstination = "";
var firstTrain = "";
var frequency = 0;
var newTrain = $("#newTrain").val().trim();
var newDestination = $("#newDest").val().trim();
var newFreq = $("#newFreq").val().trim();
var newFirst = $("#newFirstTrain").val().trim(); 

	$("#trainBtn").on("click", function(){ //onsubmit 
		event.preventDefault();
		newTrain = $("#newTrain").val().trim();
		newDestination = $("#newDest").val().trim();
		newFreq = $("#newFreq").val().trim();
		newFirst = $("#newFirstTrain").val().trim(); 
		console.log("New Train: " + newTrain);
		console.log("New Destination: " + newDestination);
		console.log("New Frequency :" + newFreq);
		console.log("First Train: " + newFirst);
			
			database.ref("/trainTimes").push ({
				trainName: newTrain,
				destination: newDestination,
				frequency: newFreq,
				firstTrain: newFirst
				});		
	
		$("#newTrain").val("");
		$("#newDest").val("");
		$("#newFreq").val("");
		$("#newFirstTrain").val("");		
	});
		//Function for writing in the added trains values to the tbody
	database.ref("/trainTimes").on("child_added", function(snapshot, prevChildKey) {
	    var firstConverted = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
	    console.log(firstConverted);
   		var currentTime = moment();
   		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		var diffTime = moment().diff(moment(firstConverted), "minutes");
    	console.log("DIFFERENCE IN TIME: " + diffTime);
		var tRemainder = diffTime % snapshot.val().frequency;
		console.log("tR: " + tRemainder);
		var timeTillTrain = snapshot.val().frequency - tRemainder;
		console.log("Time until train: " + timeTillTrain);
		var nextTrain = moment().add(timeTillTrain, "minutes");
		var nextTrainx = moment(nextTrain).format("hh:mm");
		console.log("next train: " + moment(nextTrain).format("hh:mm"));
		
		var train = snapshot.val();
		var trainR = $("<tr>");
		//I really got tired of naming variables here lol
		var nTrain = $("<td>").append(train.trainName);
		var x = trainR.append(nTrain);

		var tDTrain = $("<td>").append(train.destination);
		var y = trainR.append(tDTrain);

		var tFTrain = $("<td>").append(train.firstTrain);
		var z = trainR.append(tFTrain);

		var xyz = $("<td>").append(train.frequency);
		var xz = trainR.append(xyz);

		var nxTrain = $("<td>").append(nextTrainx);
		var pageNext = trainR.append(nxTrain);

		var next = $("<td>").append(timeTillTrain);
		var nextx = trainR.append(next);


		$("#tbody").append(x);
		$("#tbody").append(y);
		$("#tbody").append(z);
		$("#tbody").append(xz);
		$("#tbody").append(pageNext);
		$("#tbody").append(nextx);
		//$("#tbody").append(moment().add(timeTillTrain, "minutes").format("YYYY-MM-DD"));
	});
	// trainWrite.on("value", function(snapshot){
	// 	console.log(snapshot.val());
	// 	var name = $("#tN");
	// 	name.append(snapshot.val().trainName);
	// })
	


// Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // //var currentTime = moment();
    // //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));