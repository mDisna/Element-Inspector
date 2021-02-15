/*
  Element Inspector (c) Matthieu Disna
  V.2.0.0

  USAGE: Include jQuery and this file in your header.
  Add activation keyword to your URL to use.
  Click on elements to find their CSS information.
*/

/***** CONSTANTS & VARIABLES *****/

// Sets the activation keyword to look for in the URL
if (typeof activateKeyword === "undefined") {
  activateKeyword = "?inspect";
}

const inspectorRunningDiv =
  '<div id="inspectorRunning"><strong>The Element Inspector is running.</strong> <a href="' +
  window.location.href.replace(activateKeyword, "") +
  '">Click here to exit</a>.</div>';

const inspectorModal =
  '<div id="inspectorModalBackgroundHolder"><div id="inspectorModalBackground"></div><div id="inspectorModalContent"><div id="inspectorModalDetails"></div></div></div>';

/***** START *****/

$(document).ready(function () {
  // Check for activation keyword in URL
  if (window.location.href.indexOf(activateKeyword) > -1) {
    startDev();
  }
});

/***** MAIN FUNCTION *****/

startDev = () => {
  // Add details div to page body
  $("body").prepend(inspectorRunningDiv);
  $("body").prepend(inspectorModal);

  // Add CSS
  setCSS();

  // Cancel all onclicks
  $("*").attr("onclick", "").unbind("click");
  $("tr").attr("onclick", "").unbind("click");

  // Intercept all page clicks
  $("body").on("click", "*", function (event) {
    // Use only the topmost element
    event.stopPropagation();

    // Store clicked element ID
    let clickedID = $(this).attr("id");
    // Store clicked element class names
    let clickedClass = $(this).attr("class");

    // Store clicked element type
    let clickedType = $(this).prop("nodeName");

    // Obtain CSS path of clicked element
    completePath = getPath(this);

    // Ensure clicked element is not inspector container
    if (
      completePath.indexOf("#inspectorRunning") == -1 &&
      completePath.indexOf("#inspectorModalContent") == -1
    ) {
      // Show element information
      displyPath(completePath, clickedID, clickedClass, clickedType);

      // This prevents the function from firing multiple times for nested elements
      return false;
    }
  });
};

function displyPath(cssPath, elID, elClass, elType) {
  if (/(h[1-9])/i.test(elType)) {
    elLink = "hn";
  } else {
    elLink = elType;
  }
  elInfo =
    "<h3>Selected Element: <a id='inspectorElLink' target='_blank' href='https://www.w3schools.com/tags/tag_" +
    elLink +
    ".asp'>&#12296;" +
    elType +
    "&#12297;</a></h3>";
  if (cssPath.lastIndexOf("#") > -1) {
    // If the path contains an ID, start path from there
    cssPath = cssPath.substring(cssPath.lastIndexOf("#"));
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
  elInfo = elInfo + "<p><b>Selector Path:</b> " + cssPath + "</p>";
  console.log(elInfo);
  // Display modal
  $("#inspectorModalContent").html(elInfo);
  $("#inspectorModalContent,#inspectorModalBackground").toggleClass("active");
  setCSS();
  // Hide modal
  $("#inspectorModalBackground").click(function () {
    $("#inspectorModalContent,#inspectorModalBackground").toggleClass("active");
    setCSS();
  });
}

// Get full CSS path
function getPath(el) {
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

  elementPath = path.join(" > ");
  elementPath = elementPath.substring(elementPath.lastIndexOf("body:"));
  return elementPath;
}

/***** CSS Styling *****/
// Styles done via JS to avoid needing multiple files
setCSS = () => {
  $("#inspectorRunning").css({
    color: "#8a6d3b",
    backgroundColor: "#fcf8e3",
    borderColor: "#faebcc",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid transparent",
    borderRadius: "4px",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 99999,
  });
  $("#inspectorRunning a").css({
    color: "#66512c",
    textDecoration: "none",
  });

  $("#inspectorModalBackground").css({
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: ".50",
    filter: "alpha(opacity=50)",
    zIndex: 99990,
  });

  $("#inspectorModalContent").css({
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 20px 0 #222",
    display: "none",
    height: "240px",
    left: "50%",
    margin: "-120px 0 0 -300px",
    padding: "10px",
    position: "fixed",
    top: "50%",
    width: "600px",
    zIndex: 99995,
  });

  $("#inspectorModalContent a").css({
    textDecoration: "none",
  });

  $("#inspectorModalBackground.active, #inspectorModalContent.active").css({
    display: "block",
  });
};
