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

/**************************
 * Add a classification to the database
 * @param {string} classification_name
 * @returns {object} classification data
 * **************************/
async function addClassification(classification_name) {
  try {
    const sql =
      "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [classification_name]);
    return result.rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error occurred.");
  }
}


/**************************
 * Add an inventory item to the database
 * @param {object} data
 * @returns {object} inventory data
 * **************************/
async function addInventory(data) {
  try {
    const sql = `INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color,
    ];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {getClassifications, 
  getInventoryByClassificationId,
  getVehicleById,
  addClassification,
  addInventory
}; // exports the function for use elsewhere