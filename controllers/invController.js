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
  try {
    const vehicle_id = req.params.vehicleId;
    console.log(vehicle_id);

    // check if vehicle_id is missing or invalid
    if (!vehicle_id) {
      throw new Error("Vehicle ID is required");
    }

    const vehicle = await invModel.getVehicleById(vehicle_id);
    console.log(vehicle);

    // check if vehicle is undefined (i.e., not found in the database)
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const vehicleHtml = utilities.buildVehicleDetail(vehicle);
    let nav = await utilities.getNav();

    res.render("./inventory/vehicleDetail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicleHtml,
      vehicle_id
    });
  } catch (error) {
    next(error); // pass error to error-handling middleware
  }
};

/* ***************************
 *  Build the inventory management view
 ***************************/
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  const messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    classificationSelect,
    messages,
  });
};


/* ***************************
 *  Build the add classification view
 ***************************/
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

/* ***************************
 *  Process adding a classification to the database
 ***************************/
invCont.addClassification = async function (req, res, next) {
  try {
    const { classification_name } = req.body;
    const result = await invModel.addClassification(classification_name);

    if (result) {
      req.flash("success", "Classification added successfully.");
      res.redirect("/inv");
    } else {
      req.flash("error", "Failed to add classification.");
      res.redirect("/inv/add-classification");
    }
  } catch (error) {
    req.flash("error", "Failed to add classification: " + error.message);
    res.redirect("/inv/add-classification");
  }
};

/* ***************************
 *  Build the add inventory view
 ***************************/
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    classifications,
    errors: null,
    classification_id: "",
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
  });
};

/* ***************************
 *  Process adding an inventory item to the database
 ***************************/
invCont.addInventory = async function (req, res, next) {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;
  const result = await invModel.addInventory({
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  });

  if (result) {
    req.flash("success", "Inventory item added successfully.");
    res.redirect("/inv");
  } else {
    req.flash("error", "Failed to add inventory item.");
    res.redirect("/inv/add-inventory");
  }
};



module.exports = invCont;