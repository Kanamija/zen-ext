// <!-- /  Description 
// Zen-Ext is a Chrome extension designed to create a focused, distraction-free browsing experience. 
// When the user clicks the extension icon in the Chrome toolbar, a small popup window opens displaying the extension’s HTML interface. 
//  This popup includes a button that triggers the popup.js script, which communicates with Chrome and injects the content.js script into the active tab. 
//  Once injected,the content script can modify the page, block distracting elements, or apply Zen Mode behavior to help the user stay focused 
//  -->
// <!-- pseudo code 
//   1.button - event listener - takes to argument - callback (async funct to find the current tap we are on)
//   2. another Chrome method to inject css methods to the page
    //  another Chrome to inject JS into the page 
//    -->

// Find the button in popup.html
const button = document.getElementById("activate");

//find audio element in popup.html
const audio = document.getElementById("zen-audio");

// When button is clicked run this function
button.addEventListener("click", async () => {

  // Try to start the background music at low volume.
  // If the browser blocks or fails to play the audio,
  // catch the error and log it instead of breaking the extension.
   try {
      audio.volume = 1;
      audio.play();
    } catch (err) {
      console.log("Audio failed to play:", err);
    }

  //call a Chrome Extensions API method and ask for access to the tab that is active
  //chrome returns an array with result objects
  //take first object in the array and store it in tab variable using destructuring
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!tab?.id) return;

  //use another Chrome Extension API to inject CSS into current tab
  await chrome.scripting.insertCSS({
    //pass in an object with a target that specicies which tab to inject CSS file into
    target: { tabId: tab.id },
    //and specific file name that has CSS that needs to be injected in an array (supports injecting multiple scripts)
    files: ["content.css"]
  });


  //Call another Chrome Extenstions API to inject JS into active browser tab
  //this method runs a JS file from our extention inside the webpage
  await chrome.scripting.executeScript({
    //this method receives an object with two properties
    //first one tells chrome which tab the script will run in
    target: { tabId: tab.id },
    //second tells chrome which JS file should be executed, in an array
    files: ["content.js"]
  });

});