// src/lib/pgConnection.js
const settings = require('./settings');
const { Pool } = require('pg');

var pgConnection = (function(settings) {
    var _pool;
    const DB_STATUS = {
        NG: settings.DB_STATUS.NG,
        OK: settings.DB_STATUS.OK
    };
    
    let init = function() {
        if (!_pool) {
            _pool = new Pool({
                max: settings.postgresql.connectionLimit,
                host: settings.postgresql.host,
                user: settings.postgresql.user,
                password: settings.postgresql.password,
                database: settings.postgresql.database,
                port: settings.postgresql.port
            });
        }
    };

    let query = function(...args) {
        // Check for query arguments
        let qry, cb, param;
        if (args.length > 0) qry = args[0];
        if (args.length > 1 && typeof args[1] === 'function') cb = args[1];
        if (args.length > 2 && Array.isArray(args[1])) {
            param = args[1];
            if (typeof args[2] === 'function') cb = args[2];
        }
    
        // Initialize connection pool if not already initialized
        if (!_pool) init();
    
        // Execute query
        if (cb) {
            // Callback version
            if (param) {
                _pool.query(qry, param)
                    .then(result => cb(null, result.rows))
                    .catch(err => cb(err, null));
            } else {
                _pool.query(qry)
                    .then(result => cb(null, result.rows))
                    .catch(err => cb(err, null));
            }
        } else {
            // Promise version
            return new Promise((resolve, reject) => {
                if (param) {
                    _pool.query(qry, param)
                        .then(result => resolve(result.rows))
                        .catch(reject);
                } else {
                    _pool.query(qry)
                        .then(result => resolve(result.rows))
                        .catch(reject);
                }
            });
        }
    };

    let queryAsync = function(qry, param) {
        return new Promise(function(resolve, reject) {
            if (!_pool) init();

            if (param) {
                _pool.query(qry, param)
                    .then(result => {
                        if (result.rows.length === 0) reject(new Error('no record found'));
                        else resolve(result.rows);
                    })
                    .catch(reject);
            } else {
                _pool.query(qry)
                    .then(result => {
                        if (result.rows.length === 0) reject(new Error('no record found'));
                        else resolve(result.rows);
                    })
                    .catch(reject);
            }
        });
    };
   
    return {
        query: query,
        queryAsync: queryAsync,
        init: init,
        DB_STATUS
    };
})(settings);

module.exports = pgConnection;
