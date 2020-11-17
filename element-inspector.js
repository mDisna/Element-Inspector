/*
  Element Inspector (c) Matthieu Disna
  V.1.0.0

  USAGE: Include jQuery and this file in your header.
  Add activation keyword to your URL to use.
  Add "-top" after your activation keyword in URL to
  show details continaer at top of window.
  Click on elements to find their CSS information.
*/

/***** CONSTANTS & VARIABLES *****/

// Sets the activation kewword to look for in the URL
const ActivateKeyword = "?dev";
// Sets the ID for the details container
const DetailsDivId = "el-details";
// Sets up the details container with initial message
const DetailsDiv =
  '<div id="' + DetailsDivId + '"><h1>Click on an element to begin</h1></div>';

/***** START *****/

$(document).ready(function () {
  // Check for activation keyword in URL
  if (window.location.href.indexOf(ActivateKeyword) > -1) {
    startDev();
  }
});

/***** MAIN FUNCTION *****/

startDev = () => {
  // Add details div to page body
  $("body").prepend(DetailsDiv);
  // Add CSS to created div
  setCSS();

  // INtercept all page clicks
  $("body").on("click", "*", function (event) {
    // Store clicked element ID
    let clickedID = $(this).attr("id");
    // Store clicked element class names
    let clickedClass = $(this).attr("class");

    // Obtain CSS path of clicked element
    completePath = getPath(this);

    // Ensure clicked element is not details container
    if (completePath.indexOf("#" + DetailsDivId) == -1) {
      // Cancel default action for clicked element
      event.preventDefault();
      // Show element information
      displyPath(completePath, clickedID, clickedClass);
    }

    // This prevents the function from firing multiple times for nested elements
    return false;
  });
};

/***** CSS PATH FUNCTION *****/
// FROM: https://stackoverflow.com/questions/3620116/get-css-path-from-dom-element

getPath = (el) => {
  let path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += "#" + el.id;
    } else {
      let sib = el,
        nth = 1;
      while (
        sib.nodeType === Node.ELEMENT_NODE &&
        (sib = sib.previousSibling) &&
        nth++
      );
      selector += ":nth-child(" + nth + ")";
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(" > ");
};

/***** FORMAT & DISPLAY DETAILS FUNCTION *****/

displyPath = (cssPath, elID, elClass) => {
  elInfo = "";
  if (cssPath.indexOf("#") > -1) {
    // If the path contains an ID, start path from there
    cssPath = cssPath.substring(cssPath.indexOf("#"));
  }
  if (elID) {
    // If clicked element has ID, display it
    elInfo = elInfo + "<p><b>Element ID:</b> #" + elID + "</p>";
  }
  if (elClass) {
    // If clicked element has classes, display them
    elInfo =
      elInfo +
      "<p><b>Element Class(es):</b> ." +
      elClass.split(" ").join(" .") +
      "</p>";
  }
  // Display CSS path
  elInfo = elInfo + "<p><b>CSS Path:</b> " + cssPath + "</p>";
  // Add to details container
  $("#" + DetailsDivId).html(elInfo);
};

/***** CSS Styling *****/
// Styles done via JS to avoid needing multiple files
setCSS = () => {
  $("#" + DetailsDivId).css({
    border: "5px solid #000",
    width: "100%",
    background: "#fff",
    color: "#000",
    position: "fixed",
    padding: "20px",
    "z-index": 999,
  });

  // Show details container at top or bottom of viewport based on activation keyword
  if (window.location.href.indexOf(ActivateKeyword + "-top") > -1) {
    $("#" + DetailsDivId).css({ top: 0 });
    $("body").css({ "padding-top": "150px" });
  } else {
    $("#" + DetailsDivId).css({ bottom: 0 });
    $("body").css({ "padding-bottom": "150px" });
  }
};
