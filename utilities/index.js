const invModel = require("../models/inventory-model") // requires the inventory-model file so we can get data from the database
const Util = {} // create an empty Util object

/* *******************************
 * Constructs the nav HTML unordered list
 *******************************/
Util.getNav = async function (req, res, next) { // creates an asynchronous function, which accepts the request, response and next methods as parameters
  let data = await invModel.getClassifications() // calls the getClassifications() function and stores the returned resultset into the data variable
  let list = "<ul>" // start an unordered list
  list += '<li><a href="/">Home</a></li>' // add home link
  
  data.rows.forEach((row) => { // loop through classifications
    list += `<li>` // open list item
    list += `<a href="/classification/${row.classification_id}" title="View our ${row.classification_name} inventory">` // create anchor
    list += `${row.classification_name}` // add classification name
    list += `</a></li>` // close anchor and list item
  })
  
  list += "</ul>" // close unordered list
  return list // return generated html list
}

module.exports = Util