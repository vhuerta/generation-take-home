import React from "react";

/**
 * FavoriteStores, component to render a favorite store 
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
export const FavoriteStore = ({
  name,
  address,
  onClick,
  onClickRemove,
  onMouseOver,
  onMouseOut
}) => {
  return (
    <article
      className="media media-hover"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <br />
            {address}
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" onClick={onClickRemove} />
      </div>
    </article>
  );
};
