//  Description 
// Zen-Ext is a Chrome extension designed to create a focused, distraction-free browsing experience. 
// When the user clicks the extension icon in the Chrome toolbar, a small popup window opens displaying the extension’s HTML interface. 
//  This popup includes a button that triggers the popup.js script, which communicates with Chrome and injects the content.js script into the active tab. 
//  Once injected,the content script can modify the page, block distracting elements, or apply Zen Mode behavior to help the user stay focused 

// pseudo 
//   write the zen blurring logic overlay - Haiko box  dev and class name 
    // turning the zen mod on and off 
    // if we have time we can add music 

    // Check if Zen Mode is already active
const existing = document.getElementById("zen-overlay");

if (existing) {
  // If it exists, remove it (turn off Zen Mode)
  existing.remove();
  document.body.classList.remove("zen-mode");
} else {
  // Turn on Zen Mode
  document.body.classList.add("zen-mode");

  // Create the haiku box
  const overlay = document.createElement("div");
  overlay.id = "zen-overlay";

  overlay.innerText = `Nothing moves but text.
  Stillness holds what once was said.
  Screen becomes silence.`;

  // Add it to the page
  document.body.appendChild(overlay);
}