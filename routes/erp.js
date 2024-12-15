var express = require('express');
var router = express.Router();
var connection = require('./connection.js');
var jwt = require("jsonwebtoken");

var dotenv = require('dotenv');
dotenv.config();

function getResult(res, results) {
  res.json({ results, token: jwt.sign({ results }, process.env.JWT_SECRET, { expiresIn: "1hr" }) });
}

router.get('/getall', async function(req, res, next) {
  try {
    connection.query('SELECT * FROM customer', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.get('/get/:id', async function(req, res, next) {
  try {
    connection.query(`SELECT * FROM customer WHERE id = "${req.params.id}"`, function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.post('/post', async function(req, res) {
  try {
    let customer = req.body;
    const result = connection.query(
      `INSERT INTO customer (name, phone, sellerid) VALUES ("${customer.name}", "${customer.phone}", "${customer.sellerid}")`,
      function (error, results, fields) {
        getResult(res, results);
      }
    );
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.put('/put/:id', async function(req, res, next) {
  try {
    let customer = req.body;
    connection.query(
      `UPDATE customer SET name = "${customer.name}", phone = "${customer.phone}", sellerid = "${customer.sellerid}" WHERE id = "${req.params.id}"`,
      function (error, results, fields) {
        getResult(res, results);
      }
    );
  } catch (err) {
      res.json({ message: 'error query'});
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  try {
    connection.query(
      `DELETE FROM customer WHERE id="${req.params.id}"`,
      function (error, results, fields) {
        getResult(res, results);
      }
    );
  } catch (err) {
      res.json({ message: 'error query'});
  }
});

router.get('/get/cron/year', async function(req, res, next) {
  try {
    connection.query('SELECT YEAR(regdate) FROM customer GROUP BY YEAR(regdate)', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.get('/get/cron/month', async function(req, res, next) {
  try {
    connection.query('SELECT * FROM customer GROUP BY MONTH(regdate)', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.get('/get/cron/week', async function(req, res, next) {
  try {
    connection.query('SELECT * FROM customer GROUP BY WEEK(regdate)', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.get('/get/cron/day', async function(req, res, next) {
  try {
    connection.query('SELECT * FROM customer GROUP BY DAY(regdate)', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

router.get('/get/cron/hour', async function(req, res, next) {
  try {
    connection.query('SELECT * FROM customer GROUP BY HOUR(regdate)', function (error, results, fields) {
      getResult(res, results);
    });
  } catch (err) {
    res.json({ message: 'error query'});
  }
});

module.exports = router;