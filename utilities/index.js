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
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.buildVehicleDetail = function (vehicle) {
  return `
    <div class="vehicle-detail">

      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${
    vehicle.inv_model
  }">
      <div class="details">
      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(
          vehicle.inv_price
        )}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Mileage:</strong> 
          ${vehicle.inv_miles}
         miles</p>
      </div>
    </div>`
  ;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;