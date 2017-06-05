import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Store } from "./Store";

export const StoreMap = ({
  center,
  zoom = 10,
  stores = [],
  favorites = [],
  onStoreClick = () => {},
  onStoreCloseClick = () => {},
  onStoreOver = () => {},
  onStoreOut = () => {},
  onAddFavoriteClick = () => {},
  onRemoveFavoriteClick = () => {},
  selectedStoreIndex = null,
  activeStoreIndex = null
}) => {
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
