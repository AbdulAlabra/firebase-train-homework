
var config = {
    apiKey: "AIzaSyA94fq2OBaQPVtcel3RZA8u1PbCkhMlc1Y",
    authDomain: "myfirstdbproject-ca43b.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-ca43b.firebaseio.com",
    projectId: "myfirstdbproject-ca43b",
    storageBucket: "myfirstdbproject-ca43b.appspot.com",
    messagingSenderId: "575926295004"
};

firebase.initializeApp(config);
var database = firebase.database();

$(".btn").on("click", function (event) {
    event.preventDefault();
    var randomTime = $(".time").val().trim();
    var randomFormat = "h:mm";

    //the time difference between the time chosen and current time
    var time_difference = moment().diff(moment(randomTime, randomFormat), "minutes");

    //this will display the time chosen in this format(1..12 am or pm) 
    var display_time_format = moment(moment(randomTime, randomFormat)).format("h:mm:a");
console.log(display_time_format);
    //this if statement will check if the difference is nagtive or not. Note "nagtive number means in the future" 
    if (time_difference < 0) {
        // so if it's nagtive then the time is right, and save it to the database.
        var postive_number = Math.abs(time_difference);

        database.ref().push({

            trainName: $(".trainName").val().trim(),
            Destination: $(".Destination").val().trim(),
            time: display_time_format,
            timeToArrive: postive_number,
            Frequency: $(".Frequency").val().trim()
        });
    }

    else {
        alert("time chosen is invalid! Choose another time");
    }

});

function success1(snapshot) {
// appending the new user input to the page
    var newRow = $("<tr>").append(
        $("<td>").text(snapshot.val().trainName),
        $("<td>").text(snapshot.val().Destination),
        $("<td>").text(snapshot.val().time),
        $("<td>").text(snapshot.val().Frequency),
        $("<td>").text(snapshot.val().timeToArrive)
    );
    $("tbody").append(newRow);
}
function failed(errorObject) {
    console.log(cerrorObject.code);
}

database.ref().on("child_added", success1, failed);
