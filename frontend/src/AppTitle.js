import React from "react";

export const AppTitle = () => {
  return (
    <div>
      <h1 className="title is-1">Take-Home</h1>
      <h2 className="subtitle">Generation challange</h2>

      <strong>Instructions:</strong>
      {" "}
      <ul>
        <li>
          <strong>
            &gt;
          </strong>
          {" "}
          Place the over the markers to see the store name
        </li>
        <li>
          <strong>
            &gt;
          </strong>
          {" "}
          Click on a marker to see more information of the store and the button to add to favorites that store
        </li>
      </ul>
      <hr />
    </div>
  );
};
