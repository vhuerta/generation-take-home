import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Store } from "./Store";

/**
 * Functional component StoreMap, generates the map 
 * and render all the markers over it using the Store 
 * component
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
export const StoreMap = ({
  center, // Center of the map
  zoom = 10, // Zoom of the map
  stores = [], // Stores array
  favorites = [], // Favorites array
  onStoreClick = () => {}, // Store click handler
  onStoreCloseClick = () => {}, // Store infowindow close click handler
  onStoreOver = () => {}, // Store hover handler
  onStoreOut = () => {}, // Store out handler
  onAddFavoriteClick = () => {}, // Store add to favorites
  onRemoveFavoriteClick = () => {}, // Store remove favorites
  selectedStoreIndex = null, // Actual selected store
  activeStoreIndex = null // Actual acitive store
}) => {

  /**
   * Function than maps over stores and return an array of Storees components
   * 
   * @returns Array of component Store
   */
  const renderStores = () =>
    stores.map((s, index) => (
      <Store
        key={s.name}
        name={s.name}
        selected={selectedStoreIndex === index}
        favorite={favorites.indexOf(index) > -1}
        active={activeStoreIndex === index}
        address={s.address}
        lat={s.geolocation.lat}
        lng={s.geolocation.lng}
        onClick={() => onStoreClick(index)}
        onMouseOver={() => onStoreOver(index)}
        onMouseOut={() => onStoreOut(index)}
        onCloseClick={() => onStoreCloseClick(index)}
        onAddFavoriteClick={() => onAddFavoriteClick(index)}
        onRemoveFavoriteClick={() => onRemoveFavoriteClick(index)}
      />
    ));

  return (
    <GoogleMapReact
      defaultCenter={center}
      defaultZoom={zoom}
      bootstrapURLKeys={{
        key: "AIzaSyDu0Oh8YYyTfam1l4eJZR2gLQbRtaisp6o"
      }}
    >
      {renderStores()}
    </GoogleMapReact>
  );
};
