/**
 * Script to get the geolocation of the stores
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
import axios from "axios";
import { MongoClient } from "mongodb";
import storesDirectory from "./store_directory.json";

const baseURL = "https://maps.googleapis.com";
const key = process.env.GOOGLE_API_KEY;
const mongoUri = process.env.MONGODB_URI;

const request = axios.create({ baseURL });

/**
 * Receives a store object, cleans the address return a new object
 * 
 * @param {Object} store The store object
 */
const cleanAddress = address => {
  return address
    .replace(/ +(?= )/g, "") // Replace double spaces
    .replace(/[Cc]\.[Pp]\.\s?/g, "CP ") // Replace cp
    .replace(/[#\-\.]/g, "") // Replace characters
    .replace(/\w+\./g, "") // Replace abreviations
    .trim();
};

MongoClient.connect(mongoUri, (err, db) => {
  const geolocate = (store, index) => {
    let { Address: address, Name: name } = store;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        request
          .get("maps/api/geocode/json", {
            params: { address, key }
          })
          .then(response => {
            let geolocation;
            if (response.data.status === "OK") {
              geolocation = response.data.results.shift();
            }
            console.log(
              `Geolocating: ${name}, result: ${response.data.status}`
            );
            db
              .collection("stores")
              .update(
                { name },
                { name, address, geolocation },
                { upsert: true }
              );
            resolve();
          });
      }, 100 + 100 * index);
    });
  };

  const promises = Promise.all(storesDirectory.map(geolocate))
    .then(() => console.log("Stores geolocated!"))
    .then(process.exit);
});
