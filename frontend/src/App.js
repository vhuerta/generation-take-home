import React, { Component } from "react";
import axios from "axios";

import "font-awesome/css/font-awesome.min.css";
import "bulma/css/bulma.css";
import "./styles.css";

import { StoreMap } from "./StoreMap";
import { FavoriteStoresList } from "./FavoriteStoresList";
import { AppTitle } from "./AppTitle";

import Storage from "./util/localStorage";

export default class App extends Component {
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

  onStoreClick(index) {
    this.setState({
      selectedStoreIndex: this.state.selectedStoreIndex === index ? null : index
    });
  }

  onStoreCloseClick(index) {
    this.setState({
      selectedStoreIndex: null
    });
  }

  onStoreOver(index) {
    this.setState({
      activeStoreIndex: index
    });
  }

  onStoreOut(index) {
    this.setState({
      activeStoreIndex: null
    });
  }

  onAddFavoriteClick(index) {
    this.setState(s => {
      const favorites = s.favorites.concat(index);
      Storage.set("favorites", favorites);
      return { favorites };
    });
  }

  onRemoveFavoriteClick(index) {
    this.setState(s => {
      const favorites = s.favorites.filter(i => i !== index);
      Storage.set("favorites", favorites);
      return { favorites };
    });
  }

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
