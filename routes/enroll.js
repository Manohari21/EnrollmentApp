var express = require('express');
var router = express.Router();
var axios = require("axios");
const { response } = require('express');

router.get('/', (req, res) => {
  let apiUrl = "http://localhost:8080/getAllPolicies";
  axios.get(apiUrl)
    .then(function (response) {
      console.log("Requesting policy url: " + apiUrl);
      let data = [];
      for (let item of response.data) {
        let value = {};
        value.policyName = item.policyName;
        value.policyId = item.policyId;
        data.push(value);
      }
      console.log("ENrollment Page requested");
      res.render('enroll.ejs', { data: data });
    });
});

router.post('/register', (req, res) => {

  var name = {
    firstName: req.body.firstname,
    lastName: req.body.lastname
  };
  var dependentName = {
    firstName: req.body.dependentfirstname,
    lastName: req.body.dependentlastname
  };

  var address = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
  };
  var dependentAddress = {
    street: req.body.dependentstreet,
    city: req.body.dependentcity,
    state: req.body.dependentstate,
    country: req.body.dependentcountry
  };

  console.log(req.body);

  let apiUrl = `http://localhost:8080/getBenefitService?policyId=${req.body.policy}`;
  axios.get(apiUrl).then(function (response) {
    var benefits = {
      id: response.data.id,
      policyId: response.data.policyId,
      policyName: response.data.policyName,
      policyBenefits: response.data.policyBenefits,
      totalEligibleAmount: response.data.claimableAmount,
      claimedAmount: 0,
      currentEligibleAmount: response.data.claimableAmount
    }
    var subscribers = {
      subscriberId: req.body.subscriberId,
      name: name,
      address: address,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateofbirth,
      benefits: [benefits],
      dependentId: req.body.dependentId,
      dependentName: dependentName,
      dependentAddress: dependentAddress,
      dependentDateOfBirth: req.body.dependentdateofbirth,
      dependentBenefits: [benefits]
    }
    
    console.log(subscribers.name.firstName);

    let url = "http://localhost:8080/enrollment";
    axios({
      method: 'POST',
      url,
      data: subscribers
    }).then((response) => {
      if (response.data.status) {
        console.log(response.data.data);
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  //   if (response.data.status) {
  //     console.log(response.data.data);
    
  //   }
  // }).catch((error) => {
  //   console.log(error);
  //   res.status(500).send(error);
  });
});

module.exports = router;
