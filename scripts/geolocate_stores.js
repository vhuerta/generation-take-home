/**
 * Script to get the geolocation of the stores from the google maps API
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import axios from "axios";
import {
  MongoClient
} from "mongodb";
import storesDirectory from "./store_directory.json";

const baseURL = "https://maps.googleapis.com";
const key = process.env.GOOGLE_API_KEY;
const mongoUri = process.env.MONGODB_URI;

const request = axios.create({
  baseURL
});


// Connect to mongo and the start to send request to google api
MongoClient.connect(mongoUri, (err, db) => {
  const geolocate = (store, index) => {
    let {
      Address: address,
      Name: name
    } = store;

    return new Promise((resolve, reject) => {

      // Set a timeout beacuse google API has a rate limit
      setTimeout(() => {
        request
          .get("maps/api/geocode/json", {
            params: {
              address,
              key
            }
          })
          .then(response => {
            let geolocation;
            if (response.data.status === "OK") { // If has results, get the first
              geolocation = response.data.results.shift();
            }
            console.log(`Geolocating: ${name}, result: ${response.data.status}`);
            db
              .collection("stores")
              .update({
                name
              }, {
                name,
                address,
                geolocation
              }, {
                upsert: true
              });
            resolve();
          });
      }, 100 + 100 * index);
    });
  };

  // Generates a promise for every store and after all send process exit signal
  const promises = Promise.all(storesDirectory.map(geolocate))
    .then(() => console.log("Stores geolocated!"))
    .then(process.exit);
});