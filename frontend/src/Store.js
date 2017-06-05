import React, { Component } from "react";

import { StoreInfoWindow } from "./StoreInfowindow";

export class Store extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const should =
      this.props.active !== nextProps.active ||
      this.props.favorite !== nextProps.favorite ||
      this.props.selected !== nextProps.selected;
    return should;
  }

  render() {
    let {
      name,
      address,
      onClick,
      onMouseOver,
      onMouseOut,
      onCloseClick,
      onAddFavoriteClick,
      onRemoveFavoriteClick,
      favorite,
      selected,
      active,
      markerActive = "img/marker-active.png",
      markerNormal = "img/marker.png",
      markerFavorite = "img/star.png"
    } = this.props;

    const zIndex = selected || active ? 99 : 1;

    return (
      <div style={{ zIndex, width: 2, height: 2 }}>
        <StoreInfoWindow
          name={name}
          address={address}
          active={active}
          selected={selected}
          favorite={favorite}
          onCloseClick={e => (e.preventDefault(), onCloseClick())}
          onAddFavoriteClick={e => (e.preventDefault(), onAddFavoriteClick())}
          onRemoveFavoriteClick={e =>
            (e.preventDefault(), onRemoveFavoriteClick())}
        />
        <img
          className="store-marker"
          style={{ zIndex }}
          src={
            favorite
              ? markerFavorite
              : selected || active ? markerActive : markerNormal
          }
          onMouseOver={e => (e.preventDefault(), onMouseOver())}
          onMouseOut={e => (e.preventDefault(), onMouseOut())}
          onClick={e => (e.preventDefault(), onClick())}
        />
      </div>
    );
  }
}
