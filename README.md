# Element Selector

## Project Description

The purpose of this jQuery script is to allow users to inspect HTML elements without needing to fiddle with the browser Developer Tools and without needing to install an broswer plugins. When enabled, simply click on an element to find out it's classes, ID, and CSS Path. This information will be shown in a sticky banner at the top or bottom of the browser window.

## Installation

### Script Setup

This scritp requires jQuery - if you do not already have jQuery included on your website, add the following within you `<head></head>` tags:

`<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>`

Next, add the `element-inspector.js` file, updating the file path to where you have uploaded the file:

`<script src="/element-inspector.js"></script>`

### Using the Script

To use the script, add the activation keyword to the end of the URL on the page you wish to use it on. The default activation keyword is `?dev`. This will load the page with a white banner across the bottom of the webpage. While activated all links and buttons will no longer function, and clicking on an element will display it's information in the banner. If the banner is blocking a element, add "-top" to the end of the activation keyword, for example: `?dev-top` to display the banner at the top of the browser.

To deactivate the script, simple remvove the keyword from the URL.

## Advanced

### Changing the Activation Keyword

If you need to change the activation keyword, edit the `element-inspector.js` file and look for the following near the top of the file:

```
// Sets the activation kewword to look for in the URL
const ActivateKeyword = "?dev";
```

Change the `ActivateKeyword` constant to something more fitting to your needs. Starting the keyword with a symbol such as "?" or "#" is recommended.

### Changing the ID of the Details Banner

If you need to change the ID used for the details banner, edit the `element-inspector.js` file and look for the following near the top of the file:

```
// Sets the ID for the details container
const DetailsDivId = "el-details";
```

Change the `DetailsDivId` constand to something more fitting to your needs.

### Changing the Initial Banner Content

You can change the default text shown in the banner when it firsts loads. To do this, edit the `element-inspector.js` file and look for the following near the top of the file:

```
// Sets up the details container with initial message
const DetailsDiv =  '<div id="' + DetailsDivId + '"><h1>Click on an element to begin</h1></div>';
```

Change the text `<h1>Click on an element to begin</h1>` to whatever you like. This can container HTML tags.

### Changing the CSS of the Details Banner

The CSS for the banner is contained within the `element-inspector.js` file. To change it, edit the file and look for a function called `setCSS` at the bottom of the file. Here you can adjust the CSS using JavaScript notation.
