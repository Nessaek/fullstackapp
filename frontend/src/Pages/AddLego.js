import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import postService from "./../services/postService";
import convertTimestamp from "./../services/convertTimeStamp";

class AddLego extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <h4>Add a Lego Piece</h4>
        <form
          onSubmit={e => {
            e.preventDefault();
            store.fetchLegoParts();
          }}
        >
          <label>
            startDate:
            <Datetime
              type="date"
              value={store.startDate}
              id="startDate"
              onChange={e => store.addLego("startDate", e)}
            />
          </label>
          <label>
            EndDate:
            <Datetime
              type="date"
              value={store.endDate}
              id="endDate"
              onChange={e => {
                console.log(e);
                store.addLego("endDate", e);
              }}
            />
          </label>
          <br />
          <label>
            Piece:
            <input
              type="text"
              value={store.piece}
              id="piece"
              onChange={e => store.addLego("piece", e.target.value)}
            />
          </label>
          <br />
          <label>
            Type:
            <input
              type="text"
              value={store.type}
              id="type"
              onChange={e => store.addLego("type", e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default inject("store")(observer(AddLego));
