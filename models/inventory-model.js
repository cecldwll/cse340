const pool = require("../database") // imports the database connection file

/* *******************************
 * Get all classification data
 *******************************/
async function getClassifications(){ // creates an asynchronous function that returns a promise w/ blocking the execution of the code
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name") // returns the result of the SQL query, which will be sent to the database server using a pool connection
}

module.exports = {getClassifications} // exports the function for use elsewhere