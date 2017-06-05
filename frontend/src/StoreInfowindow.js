import React, { Component } from "react";

export const StoreInfoWindow = ({
  name,
  address,
  active,
  selected,
  favorite,
  onAddFavoriteClick,
  onRemoveFavoriteClick,
  onCloseClick
}) => {
  const renderCloseButton = () =>
    (selected
      ? <a className="delete is-small pull-right" onClick={onCloseClick} />
      : null);

  const renderInfo = () =>
    (selected
      ? <p><strong>Address:</strong> {address}</p>
      : <p><i>Click for more information</i></p>);

  const renderFavoriteControl = () =>
    (!favorite
      ? <a className="level-item" onClick={onAddFavoriteClick}>
          <i className="fa fa-star" />
          &nbsp;&nbsp;
          Add to favorites
        </a>
      : <a className="level-item" onClick={onRemoveFavoriteClick}>
          <i className="fa fa-star-o" />
          &nbsp;&nbsp;
          Remove from favorites
        </a>);

  const renderControls = () =>
    (selected
      ? <nav className="level is-mobile">
          <div className="level-left">
            {renderFavoriteControl()}
          </div>
        </nav>
      : null);

  const zIndex = active || selected ? 99 : 1;
  const display = active || selected ? "block" : "none";

  return (
    <div className="box infowindow" style={{ zIndex, display }}>
      {renderCloseButton()}
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong>
              <br />
            </p>
            {renderInfo()}
          </div>
          {renderControls()}
        </div>
      </article>
    </div>
  );
};
