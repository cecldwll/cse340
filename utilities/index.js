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

/* *******************************
 * Build the classification view HTML
 *******************************/
Util.buildClassificationGrid = async function(data) { // declares function as asynchronous and expects a data array as a parameter
  let grid // clares a variable to hold a string
  if(data.length > 0){ // an 'if' to see if the array is not empty
    grid = '<ul id="inv-display">' // creates an unordered list
    data.forEach(vehicle => { // loops through the data array
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

module.exports = Util