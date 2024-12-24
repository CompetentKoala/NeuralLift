const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");
const toggleChatButton = document.getElementById("toggle-chat");
const chatContainer = document.getElementById("chat-container");
const chatBot = document.getElementById("chat-bot");

const showContact = document.getElementById("open-form-button");
const mobileContactButton = document.getElementById(
  "mobile-contact-form-button"
);
const submitForm = document.getElementById("submit-form");
const closeForm = document.getElementById("close-form");

const openHome = document.getElementById("open-home");
const closeHome = document.getElementById("close-home");
const home = document.getElementById("home");

const openServices = document.getElementById("open-services");
const closeServices = document.getElementById("close-services");
const services = document.getElementById("services");

const openProcess = document.getElementById("open-process");
const closeProcess = document.getElementById("close-process");
const process = document.getElementById("process");

const openPricing = document.getElementById("open-pricing");
const closePricing = document.getElementById("close-pricing");
const pricing = document.getElementById("pricing");

const emailSuccess = document.getElementById("email-success");
const emailFail = document.getElementById("email-failure");

// Flag to check if the chat has been opened before
let chatOpened = false;

// Function to display messages in the chat window
function displayMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  if (message.includes("contact")) {
    if (submitForm.style.opacity === "0" || submitForm.style.opacity === "") {
      submitForm.style.opacity = "1"; // Make visible
      submitForm.style.visibility = "visible"; // Ensure it's visible
    }
  }
  messages.appendChild(messageDiv); // `messages` is the div that holds the chat content

  // Ensure we scroll to the bottom after the message is added
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight; // Scroll to the bottom of the container
  }, 100); // Small delay ensures the message is added before scrolling
}

// Function to display bot messages with a 1000ms delay
function displayBotMessage(message) {
  // Delay the display of the bot's message by 1000ms
  setTimeout(() => {
    displayMessage(message, "Ai Assistant"); // Show the bot's message in the chat
  }, 1000); // 1000ms delay
}

// Handle button click event for sending messages
sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    displayMessage(userMessage, "You"); // Show the user's message in the chat
    userInput.value = ""; // Clear the input field

    try {
      // Send the message to the backend
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST", // Make sure this is POST, not GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }), // Send the user's message
      });

      // Check if the response is valid
      if (response.ok) {
        const data = await response.json();
        displayBotMessage(data.message); // Show the bot's response with 1000ms delay
      } else {
        const errorMessage = await response.text();
        displayBotMessage(errorMessage); // Show the bot's error message with 1000ms delay
      }
    } catch (error) {
      console.error(error);
      displayBotMessage("Sorry, something went wrong. Please try again."); // Show bot error with 1000ms delay
    }
  }
});

// Optionally, handle the Enter key press to send the message
userInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    sendButton.click(); // Trigger the send button click event
  }
});

// Add click event to toggle chat window
toggleChatButton.addEventListener("click", () => {
  home.style.opacity = "0"; // Make invisible
  home.style.zIndex = "-100"; // Bring to back
  services.style.opacity = "0";
  services.style.zIndex = "-100";
  process.style.opacity = "0";
  process.style.zIndex = "-100";
  pricing.style.opacity = "0";
  pricing.style.zIndex = "-100";

  if (
    chatContainer.style.transform === "translateX(120%)" ||
    chatContainer.style.transform === ""
  ) {
    // Open chat window by sliding it up
    chatContainer.style.transform =
      window.innerWidth < 700 ? "translateX(8%)" : "translateX(-70%)";
    chatContainer.style.zIndex = "1000001"; // Bring to front
    chatBot.style.zIndex = "100000"; // Bring to front
    submitForm.style.zIndex = "-100"; // Bring to back
    toggleChatButton.textContent = "Close Chat"; // Change button text

    // If the chat has not been opened before, send a greeting message after 400ms
    if (!chatOpened) {
      setTimeout(() => {
        displayBotMessage("Hello! How can I assist you today?"); // Bot's greeting message with 1000ms delay
      }, 300); // Delay the greeting by 400ms
      chatOpened = true; // Set the flag to true so this doesn't run again
    }
  } else {
    // Close chat window by sliding it down
    chatContainer.style.transform =
      window.innerWidth < 700 ? "translateX(120%)" : "translateX(100%)";
    toggleChatButton.textContent = "Open Chat"; // Change button text
  }
});

showContact.addEventListener("click", () => {
  if (submitForm.style.opacity === "0" || submitForm.style.opacity === "") {
    submitForm.style.opacity = "1"; // Make visible
    submitForm.style.visibility = "visible"; // Ensure it's visible
    submitForm.style.zIndex = "1000"; // Bring to front
  }
});

if (window.innerWidth < 700) {
  mobileContactButton.addEventListener("click", () => {
    if (submitForm.style.opacity === "0" || submitForm.style.opacity === "") {
      submitForm.style.opacity = "1"; // Make visible
      submitForm.style.visibility = "visible"; // Ensure it's visible
      submitForm.style.zIndex = "100000"; // Bring to front
    }
  });
}

closeForm.addEventListener("click", () => {
  submitForm.style.opacity = "0"; // Make invisible
  submitForm.style.visibility = "hidden"; // Hide from view
  submitForm.style.zIndex = "1000"; // Bring to back
});

//MOBILE BUTTONS///////////////////////
if (window.innerWidth < 700) {
  // HOME
  openHome.addEventListener("click", () => {
    home.style.opacity = "1"; // Make visible
    home.style.visibility = "visible"; // Ensure it's visible
    home.style.zIndex = "100"; // Bring to front

    // Ensure services stays hidden
    services.style.opacity = "0";
    process.style.opacity = "0";
    pricing.style.opacity = "0";
  });

  closeHome.addEventListener("click", () => {
    home.style.opacity = "0"; // Make invisible
    home.style.visibility = "hidden"; // Hide from view
    home.style.zIndex = "-100"; // Bring to back
    console.log("close home");
  });

  // SERVICES
  openServices.addEventListener("click", () => {
    services.style.opacity = "1"; // Make visible
    services.style.visibility = "visible"; // Ensure it's visible
    services.style.zIndex = "100"; // Bring to front
    // Ensure home stays hidden
    home.style.opacity = "0";
    process.style.opacity = "0";
    pricing.style.opacity = "0";
  });

  closeServices.addEventListener("click", () => {
    services.style.opacity = "0"; // Make invisible
    services.style.visibility = "hidden"; // Hide from view
    services.style.zIndex = "-100";
  });

  // PROCESSES
  openProcess.addEventListener("click", () => {
    process.style.opacity = "1"; // Make visible
    process.style.visibility = "visible"; // Ensure it's visible
    process.style.zIndex = "100"; // Bring to front
    // Ensure home stays hidden
    home.style.opacity = "0";
    services.style.opacity = "0";
    pricing.style.opacity = "0";

    closeProcess.addEventListener("click", () => {
      process.style.opacity = "0"; // Make invisible
      process.style.visibility = "hidden"; // Hide from view
      process.style.zIndex = "-100";
    });
  });

  // // PRicing
  openPricing.addEventListener("click", () => {
    pricing.style.opacity = "1"; // Make visible
    pricing.style.visibility = "visible"; // Ensure it's visible
    pricing.style.zIndex = "100"; // Bring to front
    // Ensure home stays hidden
    home.style.opacity = "0";
    services.style.opacity = "0";
    process.style.opacity = "0";

    closePricing.addEventListener("click", () => {
      pricing.style.opacity = "0"; // Make invisible
      pricing.style.visibility = "hidden"; // Hide from view
      pricing.style.zIndex = "-100";
    });
  });
}

//mailer

document.getElementById("submit-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        // Show success message
        const emailSuccess = document.getElementById("email-success");
        if (emailSuccess) emailSuccess.style.display = "block";

        // Clear the input fields
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } else {
        // Show failure message
        const emailFail = document.getElementById("email-fail");
        if (emailFail) emailFail.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });
