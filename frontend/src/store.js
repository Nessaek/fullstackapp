// Utils
import { action, extendObservable, observable, runInAction } from "mobx";
import { fromPromise } from "mobx-utils";
import convertTimestamp from "./services/convertTimeStamp";
class Store {
  constructor() {
    extendObservable(this, {
      // store
      legoParts: fromPromise.resolve([]),
      piece: "",
      type: "",
      startDate: "",
      endDate: ""
    });
  }

  fetchLegoParts = action("fetchLego", () => {
    this.legoParts = fromPromise(
      fetch("http://localhost:8000/LegoPieces", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: convertTimestamp(this.startDate),
          endDate: convertTimestamp(this.endDate),
          piece: this.piece,
          type: this.type
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          console.log(response);
          alert("system successfully added!");
        })
        .catch(function(err) {
          console.log("didn't work" + err);
        })
    );
  });

  addLego = action("addLego", (storeName, value) => {
    this[storeName] = value;
  });

  getAllLegoParts = action("get all lego", () => {
    this.legoParts = fromPromise(
      fetch("http://localhost:8000/LegoPieces", {
        method: "GET",
        cache: "no-store"
      }).then(response => response.json())
    );
  });
}

export default new Store(); // export as singleton
