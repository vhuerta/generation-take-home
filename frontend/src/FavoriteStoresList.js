import React, { Component } from "react";

import { FavoriteStore } from "./FavoriteStore";

export class FavoriteStoresList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.favorites.length !== this.props.favorites.length;
  }

  renderFavorites() {
    const {
      favorites,
      stores,
      onRemoveFavoriteClick,
      onStoreOver,
      onStoreOut,
      onStoreClick
    } = this.props;

    return favorites.length
      ? favorites.map(f => (
          <FavoriteStore
            key={f}
            name={stores[f].name}
            address={stores[f].address}
            onClickRemove={() => onRemoveFavoriteClick(f)}
            onMouseOver={() => onStoreOver(f)}
            onMouseOut={() => onStoreOut(f)}
            onClick={() => onStoreClick(f)}
          />
        ))
      : <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>Not favorites yet</strong>
              </p>
            </div>
          </div>
        </article>;
  }

  render() {
    return (
      <div>
        <h1 className="title is-3">Favorites</h1>
        {this.renderFavorites()}
      </div>
    );
  }
}
