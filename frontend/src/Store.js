import React, { Component } from "react";

import { StoreInfoWindow } from "./StoreInfowindow";

/**
 * Store component, this component generates a marker and StoreInfoWindow
 * for the stores map
 * 
 * @export
 * @class Store
 * @extends {Component}
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
export class Store extends Component {

  /**
   * Hook than check if the component need to rerender, this verify active, favorite and selected flags
   * 
   * @param {Object} nextProps 
   * @param {Object} nextState 
   * @returns {Boolean} true if the component needs to be rendered, false if not
   */
  shouldComponentUpdate(nextProps, nextState) {
    const should =
      this.props.active !== nextProps.active ||
      this.props.favorite !== nextProps.favorite ||
      this.props.selected !== nextProps.selected;
    return should;
  }

  /**
   * Return the component to rerender
   * 
   * @returns Store component
   */
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
