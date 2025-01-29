const invModel = require("../models/inventory-model") // brings inventory-model into scope and stores functionality
const utilities = require("../utilities/") // brings utilities >> index.js into scope and stores functionality

const invCont = {} // creates an empty object in variable

/* *******************************
 * Build inventory by classification view
 *******************************/
invCont.buildByClassificationId = async function (req, res, next) { // creates an asynchronous function which accepts the request and response objects, along with the Express next function as parameters
    const classification_id = req.params.classificationId // collects the classification_id that has been sent
    const data = await invModel.getInventoryByClassificationId(classification_id) // calls the function and passes the classification_id as a parameter
    const grid = await utilities.buildClassificationGrid(data) // calls a utility function to build the grid
    let nav = await utilities.getNav() // calls the function to build the navigation bar for use in the view
    const className = data[0].classification_name // extracts the name of the classification
    res.render("./inventory/classification", { // calls the Express render function to return a view to the browser
        title: className + " vehicles", // build the title value to be used in the head partial
        nav,
        grid,
    })
}

module.exports = invCont