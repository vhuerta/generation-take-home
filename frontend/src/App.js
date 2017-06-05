"use strict";

import React, { Component } from "react";
import axios from "axios";

import "font-awesome/css/font-awesome.min.css";
import "bulma/css/bulma.css";
import "./styles.css";

import { StoreMap } from "./StoreMap";
import { FavoriteStoresList } from "./FavoriteStoresList";
import { AppTitle } from "./AppTitle";

import Storage from "./util/localStorage";

/**
 * Mexico center cords
 */
const mexicoCenter = {
  lat: 19.39068,
  lng: -99.2836984
}

/**
 * App component, this component wrap all the app and handle the state
 * 
 * @export
 * @class App
 * @extends {Component}
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
export default class App extends Component {

  /**
   * Creates an instance of App, 
   * and set the initial state
   * 
   * @param {Object} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stores: [],
      favorites: [],
      center: {
        lat: 19.39068,
        lng: -99.2836984
      },
      activeStoreIndex: null,
      selectedStoreIndex: null
    };
  }

  /**
   * Hook to listen when the component is mounted, 
   * fetch the stores data from the server and add it to the state
   * 
   * @memberof App
   */
  componentDidMount() {
    axios
      .get("https://generation-challange.herokuapp.com/stores")
      .then(response => {
        this.setState({
          loading: false,
          stores: response.data.stores,
          favorites: Storage.get("favorites") || []
        });
      });
  }

  /**
   * Handle when a stores is clicked
   * 
   * @param {Array} index Store index of array
   */
  onStoreClick(index) {
    this.setState({
      selectedStoreIndex: this.state.selectedStoreIndex === index ? null : index
    });
  }


  /**
   * Handle when a store infowindow close button is clicked
   * 
   * @param {Array} index Store index of array
   */
  onStoreCloseClick(index) {
    this.setState({
      selectedStoreIndex: null
    });
  }

  /**
   * Handle when the cursor is over a store
   * 
   * @param {Array} index Store index of array
   */
  onStoreOver(index) {
    this.setState({
      activeStoreIndex: index
    });
  }

  /**
   * Handle when the cursor leaves a store
   * 
   * @param {Array} index Store index of array
   */
  onStoreOut(index) {
    this.setState({
      activeStoreIndex: null
    });
  }


  /**
   * Handle when add to favorites is clicked
   * 
   * @param {Array} index Store index of array
   */
  onAddFavoriteClick(index) {
    this.setState(s => {
      const favorites = s.favorites.concat(index);
      Storage.set("favorites", favorites);
      return { favorites };
    });
  }

  /**
   * Handle when remove from favorites is clicked
   * 
   * @param {Array} index Store index of array
   */
  onRemoveFavoriteClick(index) {
    this.setState(s => {
      const favorites = s.favorites.filter(i => i !== index);
      Storage.set("favorites", favorites);
      return { favorites };
    });
  }

  /**
   * Render the App component
   * 
   * @returns The component
   */
  render() {
    const {
      favorites,
      stores,
      center,
      activeStoreIndex,
      selectedStoreIndex
    } = this.state;

    return (
      <div className="columns">
        <div className="column is-two-thirds is-paddingless">
          <StoreMap
            center={center}
            stores={stores}
            favorites={favorites}
            selectedStoreIndex={selectedStoreIndex}
            activeStoreIndex={activeStoreIndex}
            onStoreClick={this.onStoreClick.bind(this)}
            onStoreOver={this.onStoreOver.bind(this)}
            onStoreOut={this.onStoreOut.bind(this)}
            onStoreCloseClick={this.onStoreCloseClick.bind(this)}
            onAddFavoriteClick={this.onAddFavoriteClick.bind(this)}
            onRemoveFavoriteClick={this.onRemoveFavoriteClick.bind(this)}
          />
        </div>
        <div className="column">

          <div className="section" style={{ overflow: "auto" }}>
            <AppTitle />

            <FavoriteStoresList
              stores={stores}
              favorites={favorites}
              onStoreOver={this.onStoreOver.bind(this)}
              onStoreOut={this.onStoreOut.bind(this)}
              onStoreClick={this.onStoreClick.bind(this)}
              onRemoveFavoriteClick={this.onRemoveFavoriteClick.bind(this)}
            />
          </div>

        </div>
      </div>
    );
  }
}
