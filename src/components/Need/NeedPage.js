import React, { Component } from "react";
import { MyContext } from "../Context/Context";
import config from "../../config";
import InventoryList from "../Inventory/InventoryList";

export default class Needpage extends Component {
  static contextType = MyContext;

  handleClick = () => {
    document.getElementById("showForm").style.display = "block";
    document.getElementById("requestBtn").style.display = "none";
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const need = {
      user_name: e.target.name.value,
      email: e.target.email.value,
      tampons: e.target.tampons.value,
      pads: e.target.pads.value,
      zipcode: e.target.zipcode.value,
    };
    //post
    const postOptions = {
      method: "POST",
      body: JSON.stringify(need),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };
    fetch(`${config.API_ENDPOINT}/needs`, postOptions).then((res) =>
      res.json().then((need) => this.context.handleAddNeed(need))
    );

    document.getElementById("requestBtn").style.display = "block";
    document.getElementById("showForm").style.display = "none";
  };

  render() {
    return (
      <div>
        <p>
          Here is a list of our local inventory, before making a new need
          request, check out what your neighbors have to offer.
        </p>
        <InventoryList />
        <ul className="list"></ul>
        <div id="showForm">
          <h1>What do you need?</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">
                <b>name</b>
                <br />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  name="name"
                  required
                />
              </label>
              <br />
              <label htmlFor="email">
                <b>email</b>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder={"name@gmail.com"}
                  required
                />
              </label>
              <br />
              <label htmlFor="tampons">
                <b>tampons</b>
                <br />
                <input
                  put
                  type="number"
                  name="tampons"
                  placeholder="number of tampons"
                />
              </label>
              <br />
              <label htmlFor="pads">
                <b>pads</b>
                <br />
                <input type="number" name="pads" placeholder="number of pads" />
              </label>
              <br />
              <label htmlFor="zip">
                <b>zip code</b>
                <br />
                <input
                  name="zipcode"
                  type="number"
                  placeholder='e.g., "78758"'
                />
              </label>
              <br />
              <button id="submitBtn">submit</button>
            </div>
          </form>
        </div>
        <button onClick={() => this.handleClick()} id="requestBtn">
          New Need
        </button>
      </div>
    );
  }
}
