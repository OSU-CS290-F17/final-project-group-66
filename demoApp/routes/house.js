var express = require('express');
var router = express.Router();

var houseDao = require('../dao/houseDao');

/* GET houses listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/addhouse', function (req, res, next) {
  houseDao.add(req, res, next);
});

router.get('/queryAll', function (req, res, next) {
  houseDao.queryAll(req, res, next);
});

router.get('/queryByFilter', function (req, res, next) {
  houseDao.queryByFilter(req, res, next);
});

router.get('/queryById', function (req, res, next) {
  houseDao.queryById(req, res, next);
});

router.get('/deletehouse', function (req, res, next) {
  houseDao.delete(req, res, next);
});

router.get('/updatehouse', function (req, res, next) {
  houseDao.update(req, res, next);
});

router.get('/updatehousePage', function(req, res, next) {
  res.render('updatehouse', { title: 'Express' });
});

module.exports = router;
