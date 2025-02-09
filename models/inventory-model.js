const pool = require("../database/"); // imports the database connection file

/* *******************************
 * Get all classification data
 *******************************/
async function getClassifications(){ // creates an asynchronous function that returns a promise w/ blocking the execution of the code
    return await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    ) // returns the result of the SQL query, which will be sent to the database server using a pool connection
}

  /* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) { // creates an asynchronous function
  try {
    const data = await pool.query( // calls the query() function
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows // returns the result of the SQL query
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/**************************
 * Get a single vehicle by vehicle_id
 * @param {number} vehicle_id
 * @returns {object} vehicle data
 * **************************/
async function getVehicleById(vehicle_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [vehicle_id]
    );
    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error", +error);
  }
}

module.exports = {getClassifications, 
  getInventoryByClassificationId,
  getVehicleById
}; // exports the function for use elsewhere