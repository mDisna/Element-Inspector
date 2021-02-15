# Element Selector v2.0

## Project Description

The purpose of this jQuery script is to allow users to inspect HTML elements without needing to fiddle with the browser Developer Tools and without needing to install an broswer plugins. When enabled, simply click on an element to find out it's classes, ID, and selector. This information will be shown in a sticky banner at the top or bottom of the browser window.

## Installation

### Script Setup

This script requires jQuery - if you do not already have jQuery included on your website, add the following within you `<head></head>` tags:

`<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>`

Next, add the `element-inspector.js` file, updating the file path to where you have uploaded the file:

`<script src="/element-inspector.js"></script>`

### Using the Script

To use the script, add the activation keyword to the end of the URL on the page you wish to use it on. The default activation keyword is `?inspect`.

While activated, links and buttons on the webpage will be disabled. Clicking on any element will bring up a modal window with the details about the selected element. Clicking on the displayed element tag will open a new window to the W3Schools.com entry for that element. To close the modal, click anywhere outside the modal.

To deactivate the script, click on the link in the yellow banner or remove the activation keyword from the URL and reload thepage.

## Advanced

### Changing the Activation Keyword

If you need to change the activation keyword, you can add the following JavaScript to your project

```
<script>
// Sets the activation kewword to look for in the URL
const activateKeyword = "?newActivationCode";
</scrit>
```

Change the `?newActivationCode` constant to something more fitting to your needs. Starting the keyword with a symbol such as "?" or "#" is recommended.
