var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '/' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: '/login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'register' });
});

router.get('/feeling', (req, res) => {
  res.render('feeling', { title: '/feeling' });
});

router.get('/account', (req, res) => {
  res.render('account', { title: '/account' });
});

module.exports = router;
