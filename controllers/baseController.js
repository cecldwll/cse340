const utilities = require("../utilities"); // imports an index.js from a utilities folder
const baseController = {}; // creates an empty object

baseController.buildHome = async function(req, res) { // creates an asynchronous function and assigns it to buildHome which acts as a method of the object
    const nav = await utilities.getNav() // calls a getNav() function and the results, when returned will be stored into the nav variable
    req.flash("notice", "This is a flash message.") 
    res.render("index", {title: "Home", nav}) // the Express command to use EJS to send the index view back to the client
};

module.exports = baseController; // exports the baseController object for use elsewhere