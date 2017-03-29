// Initialize Firebase
var config = {
    apiKey: "AIzaSyALqYE4GJX0O6Y1yXJqUpMzSvSO3Xfd3Vo",
    authDomain: "coders-bay-dc8f0.firebaseapp.com",
    databaseURL: "https://coders-bay-dc8f0.firebaseio.com",
    storageBucket: "coders-bay-dc8f0.appspot.com",
    messagingSenderId: "1047080161594"
};
firebase.initializeApp(config);


// Initial Values
var database = firebase.database();
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        // Set the initial variables for highBidder equal to the stored values.
        highBidder = snapshot.val().highBidder;
        highPrice = parseInt(snapshot.val().highPrice);



        // Change the HTML to reflect the initial value
        $("#highest-price").html(highPrice);
        $("#highest-bidder").html(highBidder);

        // Print the initial data to the console.
        console.log(highBidder);
        console.log(highPrice);

    }

    // Keep the initial variables for highBidder equal to the initial values
    else {



        // Change the HTML to reflect the initial value
        $("#highest-price").html("$" + highPrice);
        $("#highest-bidder").html(highBidder);

        // Print the initial data to the console.
        console.log(highBidder);
        console.log(highPrice);


    }


    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values
    var bidderName = $("#bidder-name").val().trim();

    var bidderPrice = parseInt($("#bidder-price").val().trim());

    // Log the Bidder and Price (Even if not the highest)
    if (bidderPrice > highPrice) {

        // Alert
        alert("You are now the highest bidder.");

        // Save the new price in Firebase
        database.ref().set({
            highBidder: bidderName,
            highPrice: bidderPrice
        });


        // Log the new High Price
        console.log(bidderPrice);
        console.log(bidderName);


        // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
        highBidder = bidderName;
        highPrice = parseInt(bidderPrice);

        // Change the HTML to reflect the new high price and bidder
        $("#highest-price").html("$" + bidderPrice);
        $("#highest-bidder").html(bidderName);


    } else {
        // Alert
        alert("Sorry that bid is too low. Try again.");
    }

});