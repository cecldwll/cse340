const invModel = require("../models/inventory-model") // requires the inventory-model file so we can get data from the database
const Util = {} // create an empty Util object

/* *******************************
 * Constructs the nav HTML unordered list
 *******************************/
Util.getNav = async function (req, res, next) { // creates an asynchronous function, which accepts the request, response and next methods as parameters
    let data =  await invModel.getClassifications() // calls the getClassifications() function and stores the returned resultset into the data variable
    let list = "" // creates a JavaScript string
    list += 'Home' //the list variable has an addition string added to what already exists
    data.rows.forEach((row) => { // uses a forEach loop to move through the rows of the data array
        list += " " // appends an opening list item to the string in the lsit variable
        list += // appends the code that is found on lines 14 through 20 as a string to the list variable
          ' ' + // a string that includes the beginning of an HTML anchor
          row.classification_name + // classification_name being displayed between the opening and closing HTML
          " " 
        list += " " //
    })
    list += " "
    return list
}

module.exports = Util