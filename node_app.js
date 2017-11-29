/*
In order to run, first install Node, NPM and PostgreSQL

Next install the required node packages:
$ npm install pg
$ npm install pg-format
$ npm install express --save

Once dependencies are installed, use the following command to run:
$ node node_app.js <db_username> <db_password> <company_name>

You may want to use the database/seeds.sql file to insert some test data.
*/

const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  // Headers you wish to allow in requests
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();


});
// Handles post requests
app.use(bodyParser.json());
// Handles put requests
// app.use(express.methodOverride());

var pg = require('pg')
var format = require('pg-format')

var PGDATABASE = 'csr_lookup'

// Command line inputs
// var PGUSER = process.argv[2]
// var PGPASSWORD = process.argv[3] == '%' ? null : process.argv[3];
// var companyName = process.argv[4]

// Direct inputs
var PGUSER = 'postgres'
var PGPASSWORD = 123456
var companyName = 'ESRI'

if (false) {
  console.log("Error: arguments must not be blank")
  console.log("Usage: node_app.js <db_username> <company_name>")
} else {
  var config = {
    user: PGUSER,            // name of the user account
    password: PGPASSWORD,    // password of the user account
    database: PGDATABASE,    // name of the database
    max: 10,                 // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

  var pool = new pg.Pool(config)
  var myClient

  pool.connect(function (err, client, done) {
    if (err) console.log(err)

    // Define our main route, HTTP "GET /" which will print "hello"
    app.get('/', function (req, res) {
      res.send('Hello world!');
    });

    // Company route handler
// * Return a subset of companies
    app.get('/companies/users/:userId/search/:companyName', function (req, res) {
      var companyName = req.params.companyName;
      var userId = req.params.userId;
      var query = format("SELECT * FROM vw_companies_information WHERE name like '%" + companyName + "%'")
      console.log("\n" + query);
      console.log("\nuser:" + userId);

      myClient.query(query, function (err, result) {
        if (err) console.log(err)
        var result_rows = result.rows;
        if(!result_rows || result_rows.length == 0)
        {
          res.send(null);
          return;
        }
        var companiesIds = result_rows.map(comp => comp.id);
        var ratingQuery = "SELECT * FROM rating_records where fk_company_id  in (" + companiesIds.join(',') + ")";
        myClient.query(ratingQuery, function (errFromRatingQuery, ratingResult) {
          var rating_rows = ratingResult.rows;
          for (var company of result_rows) {
            var rating_record = rating_rows.find(ra => ra.fk_company_id == company.id && ra.fk_created_by == userId);
            if(rating_record)
              company.user_rated = true;
          }
          if (result_rows.length == 0) {
            response = `${query} returned no results!`;
          } else {
            response = JSON.stringify(result.rows);
          }

          res.send(response);
          console.log("=> " + response);
        })
    });
  });

    // * Return a single company
    app.get('/companies/:id', function (req, res) {
      var id = req.params.id;
      var query = format('SELECT * FROM companies WHERE id = %L', id)
      console.log("\n" + query);

      myClient.query(query, function (err, result) {
        if (err) console.log(err)
        var result_rows = result.rows

        if (result_rows.length == 0) {
          response = `${query} returned no results!`;
        } else {
          response = JSON.stringify(result.rows[0]);
        }

        res.send(response);
        console.log("=> " + response);
      })
    });

    // * Add a company
    app.post('/companies', function (req, res) {
      console.log("\n=> Result:")
      console.log(req.body)
      name = req.body.name
      wikipedia_name = req.body.wikipedia_name
      industry = req.body.industry

      var query = format('INSERT INTO companies (name, wikipedia_name, industry) VALUES (\'%s\', \'%s\', \'%s\')', name, wikipedia_name, industry)
      console.log("\n" + query);

      myClient.query(query, function (err, result) {
        if (err) console.log(err)
        var result_rows = result.rows

        if (result_rows.length == 0) {
          response = `${query}`;
        } else {
          response = JSON.stringify(result.rows[0]);
        }

        res.send(response);
        console.log("=> " + response);
      })
    });
    // * Rate company
    app.post('/companies/:id/rate', function (req, res) {
      var companyId = req.params.id;
      var userId = req.body.userId;
      var rated = req.body.rated;
      var rating = req.body.rating;
      //if user has rated the company before just update his rating
      if(rated){
        var query = format('UPDATE rating_records SET rating = \'%s\' where fk_created_by = \'%s\' AND fk_company_id = \'%s\'', rating, userId, companyId )
        console.log("\n" + query);

        myClient.query(query, function (err, result) {
          getCompanyInformation(companyId, function(companyInfo){
            res.send(companyInfo.rating);
          })
        });
      }
      else {
        //if user hasn't rated the company before, create a new record with his rating in the rating_records table
        var query = format('INSERT INTO rating_records (fk_created_by, fk_company_id, rating) VALUES (\'%s\', \'%s\', \'%s\')', userId, companyId, rating)
        console.log("\n" + query);

        myClient.query(query, function (err, result) {
          getCompanyInformation(companyId, function(companyInfo){
            res.send(companyInfo.rating);
          })
        });
      }
    });
    function getCompanyInformation(id, callback) {
      var query = format("SELECT * FROM vw_companies_information WHERE id = " + id);
      myClient.query(query, function (err, result) {
        if(result && result.rows && result.rows.length > 0)
          callback(result.rows[0]);
      });
    }
    // * Return all evidence_records for a given company
    app.get('/companies/:id/evidence_records', function (req, res) {
      var id = req.params.id;
      var query = format('SELECT * FROM evidence_records WHERE fk_company_id = %L', id)
      console.log("\n" + query);

      myClient.query(query, function (err, result) {
        if (err) console.log(err)
        var result_rows = result.rows
        var response;

        if (result_rows.length == 0) {
          response = `${query} returned no results!`;
        } else {
          response = JSON.stringify(result.rows);
        }

        res.send(response);
        console.log("=> " + response);
      })
    });


    // Start listening
    app.listen(3000, function () {
      console.log('Listening on 3000...')
    })


    // Small test query
    myClient = client
    var companyQuery = format("SELECT * FROM vw_companies_information WHERE name like '%" + companyName + "%'")

    myClient.query(companyQuery, function (err, result) {
      if (err) console.log(err)
      var result_rows = result.rows

      if (result_rows.length == 0) {
        console.log(`No companies in our database have the name "${companyName}".`)
      } else {
        var companyIndustry = result.rows[0]['industry']
        console.log(`${companyName} is a company in the ${companyIndustry} industry.`)
      }
    })
  })
}
