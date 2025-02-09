const { Pool } = require("pg"); // import the 'pool' functionality from "pg" package
const dotenv = require("dotenv");
dotenv.config(); // import the  "dotenv" package

/* ******************************* // multiline comment about the ssl code found in the connection pool function
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 *******************************/
let pool; // creates a local pool variable to hold the Pool connection
if (process.env.NODE_ENV == "development") { // an if test to see if the code exists in a dev environment
    pool = new Pool({ // creates a new pool instance from the imported Pool class
        connectionString: process.env.DATABASE_URL, //indicates how the pool will ocnnect to the database
        ssl: {
            rejectUnauthorized: false
        } // describe how the ssl is used in the connection to the database
    });

    // Added for troubleshooting queries
    // during development
    module.exports = { // exports and asynchronous query function that accepts the text of the query and any parameters
        async query(text, params) {
            try {
                const res = await pool.query(text, params)
                console.log("executed query", { text })
                return res
            } catch (error) {
                console.error("error in query", { text })
                throw error
            }
        },
    };
} else {
    pool = new Pool({ // creates a new pool instance from the Pool class
        connectionString: process.env.DATABASE_URL, // indicates the value of the connection string will be found in an environment variable
    })
    module.exports = pool   //exports the pool object to be used whenever a database connection is needed
}
