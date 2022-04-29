const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// IBM API
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// NOTE: you must manually enter your API_KEY below using information retrieved from your IBM Cloud
const API_KEY = "LvqNa-ckF4ux2KApqH2_rw6HHdahwQSkCpTbLQDIHFLf";

function getToken(errorCallback, loadCallback) {
	const req = new XMLHttpRequest();
	req.addEventListener("load", loadCallback);
	req.addEventListener("error", errorCallback);
	req.open("POST", "https://iam.cloud.ibm.com/identity/token");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Accept", "application/json");
	req.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + API_KEY);
}

function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", "Bearer " + token);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

// JSON middleware
app.use(express.json());
app.use(express.urlencoded());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

app.post("/api/character", (req, res) => {
    getToken((err) => console.log(err), function () {
        let tokenResponse;
        try {
            tokenResponse = JSON.parse(this.responseText);
        } catch(ex) {
            // TODO: handle parsing exception
        }

        // NOTE: manually define and pass the array(s) of values to be scored in the next line
        const payload = JSON.stringify(req.body);
        const scoring_url = "https://eu-de.ml.cloud.ibm.com/ml/v4/deployments/marvel_bad_characters1/predictions?version=2022-04-21";
        apiPost(scoring_url, tokenResponse.access_token, payload, function (resp) {
            /*
            let parsedPostResponse;
            try {
                parsedPostResponse = JSON.parse(this.responseText);
            } catch (ex) {
                // TODO: handle parsing exception
            } */

            console.log(this.responseText);
            res.status(200).send(this.responseText);
        }, function (error) {
            console.log(error);
        });

    });
});

