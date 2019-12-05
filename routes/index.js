var express = require('express');
var router = express.Router();
var request = require('request');
var requestsync = require('sync-request');
var phoneNumbers;

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {phoneNumbers: phoneNumbers});
});

/* POST Add Phone Number */
router.post('/addPhoneNumber', function (req, res, next) {
  var phoneNumber = req.body.phoneNumber;
  var name = req.body.name;
  var success = addPhone(phoneNumber, name);
  response = getAllPhoneNumbers();
  var messageNewPhone;
  console.log('success= ' + success);
  if (success == 'true') {
      messageNewPhone = 'Record inserted!'
  }
  else{
      messageNewPhone = 'Number already exists!'
  }
  res.render('index', {phoneNumbers: response, messageNewPhone : messageNewPhone});
});

/* GET search phone by name */
router.post('/searchByName', function(req, res, next) {
    var searchName = req.body.searchName;
    response = getPhoneNumbersByName(searchName)
    res.render('index', { title: 'Code Challenge', phoneNumbers: response});
});

/* GET refresh all names */
router.get('/refresh', function(req, res, next) {
    response = getAllPhoneNumbers()
    res.render('index', {phoneNumbers: response});
});

function getAllPhoneNumbers (){
    var res = requestsync('GET', 'http://localhost:8080/getAllPhoneNumbers', {});
    json = JSON.parse(res.getBody('utf8'))
    jsonPhoneNumbers = json.phoneNumbers
    phoneNumbers: jsonPhoneNumbers
    return jsonPhoneNumbers
}

function getPhoneNumbersByName (customerName){
    console.log(customerName)
    var res = requestsync('GET', 'http://localhost:8080/getPhoneNumbersByCustomer/' + customerName, {});
    json = JSON.parse(res.getBody('utf8'))
    jsonPhoneNumbers = json.phoneNumbers
    phoneNumbers: jsonPhoneNumbers
    return jsonPhoneNumbers
}

function addPhone(phoneNumber, customerName){
    var res = requestsync('POST', 'http://localhost:8080/addPhoneNumber', {
        json: {
            phoneNumber: phoneNumber,
            customerName: customerName
        }
    });
    return res.getBody()
}