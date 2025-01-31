const pool = require("../database") // imports the database connection file

/* *******************************
 * Get all classification data
 *******************************/
async function getClassifications(){ // creates an asynchronous function that returns a promise w/ blocking the execution of the code
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name") // returns the result of the SQL query, which will be sent to the database server using a pool connection
}


/* *******************************
* Get all inventory items and classification_name by classification_id
*******************************/
async function getInventoryByClassificationId(classification_id) { // creates an asynchronous function and passes a variable
    try {
        const data = await pool.query( // creates an SQL query
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows // sends the data, as an array of all the rows back to where the function was called
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}

module.exports = {getClassifications, getInventoryByClassificationId}; // exports the function for use elsewhere