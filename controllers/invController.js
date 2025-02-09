const invModel = require("../models/inventory-model"); // requires the inventory-model file
const utilities = require("../utilities/"); // requires the utilities file

const invCont = {}; // creates an empty invCont object

/* ***************************
 *  Build inventory by classification view
 ***************************/
invCont.buildByClassificationId = async function (req, res, next) { // creates an asynchronous function
  const classification_id = req.params.classificationId; // assigns the classification_id to the classification_id variable
  const data = await invModel.getInventoryByClassificationId(classification_id); // calls the getInventoryByClassificationId() function
  const grid = await utilities.buildClassificationGrid(data); // calls the buildClassificationGrid() function
  let nav = await utilities.getNav(); // calls the getNav() function
  
  const className = data[0].classification_name; // assigns the classification_name to the className variable
  
  res.render("./inventory/classification", { // uses EJS to render the classification view
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build vehicle detail view
 ***************************/
invCont.buildVehicleDetail = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId;
  console.log(vehicle_id);
  const vehicle = await invModel.getVehicleById(vehicle_id);
  console.log(vehicle);
  const vehicleHtml = utilities.buildVehicleDetail(vehicle);
  let nav = await utilities.getNav();
  
  res.render("./inventory/vehicleDetail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleHtml,
    vehicle_id
  });
};

module.exports = invCont;