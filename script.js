// This ensures the script runs after the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Find the button in the HTML by its ID
    const interactiveButton = document.getElementById('interactive-button');

    // Check if the button exists to avoid errors
    if (interactiveButton) {
        // Add a 'click' event listener to the button
        interactiveButton.addEventListener('click', function() {
            // When the button is clicked, show a pop-up alert
            alert('Thank you for clicking! This is your JavaScript in action.');
        });
    }

    // You can also log a message to the browser's developer console
    console.log("Website loaded successfully!");

});
