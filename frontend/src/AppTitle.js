import React from "react";

/**
 * Functional component, App title 
 * is just the information about the App, title
 * and usage instructions
 * 
 * @author Victor Hyerta <vhuertahnz@gmail.com>
 */
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
