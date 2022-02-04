const { Pool } = require("pg");

const PG_URI=
  "postgres://llunvtum:cje-fpX2AD0y7OxYaSm71gTlWMSmZugN@fanny.db.elephantsql.com/llunvtum";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
