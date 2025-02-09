require('dotenv').config();
const invModel = require("../models/inventory-model") // requires the inventory-model file so we can get data from the database
const Util = {} // create an empty Util object

/* *******************************
 * Constructs the nav HTML unordered list
 *******************************/
Util.getNav = async function (req, res, next) { // creates an asynchronous function, which accepts the request, response and next methods as parameters
  let data = await invModel.getClassifications(); // calls the getClassifications() function and stores the returned resultset into the data variable
  let list = "<ul>"; // start an unordered list
  list += '<li><a href="/">Home</a></li>' // add home link
  
  data.rows.forEach((row) => { // loop through classifications
    list += "<li>" // open list item
    list += 
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>" // close anchor and list item
  });
  
  list += "</ul>"; // close unordered list
  return list; // return generated html list
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = ''
    data.forEach(vehicle => { 
      grid += ''
      grid +=  ''
      grid += ''
      grid += ''
      grid += ''
      grid += '' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ''
      grid += ''
      grid += '$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + ''
      grid += ''
      grid += ''
    })
    grid += ''
  } else { 
    grid += 'Sorry, no matching vehicles could be found.'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;