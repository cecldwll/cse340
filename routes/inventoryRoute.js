// Needed Resources
const express = require("express"); // brings expresss into the scope of the file
const router = new express.Router(); // use express to create a new Router object
const invController = require("../controllers/invController"); // brings the inventory controller into this router document's scope
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId)); // get indicates that the route will listen for the GET method, /type/... is the route being watched for, invController.... indicates the function within the invController will be used to fulfill the request

// Route to build vehicle detail view
router.get("/detail/:vehicleId", invController.buildVehicleDetail);

// Route to build inventory management view
router.get("/", invController.buildManagementView);

// Route to build classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));

// Route to process adding a classification
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
  );

// Route to build inventory  view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView));

// Route to process adding an inventory item
router.post(
    "/add-inventory",
    invValidate.vehicleRules(),
    invValidate.checkVehicleData,
    utilities.handleErrors(invController.addInventory)
  );

// Route for error testing
router.get("/cause-error", utilities.handleErrors(invController.buildVehicleDetail));

module.exports = router; // exports the router object