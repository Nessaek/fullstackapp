import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import ReactTable from "react-table";

class ViewLegos extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.store.getAllLegoParts();
  }

  render() {
    const columns = [
      {
        Header: "Piece",
        accessor: "piece"
      },
      {
        Header: "Type",
        accessor: "type"
      }
    ];
    return (
      <div>
        {this.props.store.legoParts.state === "pending" ? (
          <h3>No data to display!</h3>
        ) : (
          <ReactTable
            defaultPageSize={10}
            className="-striped -highlight"
            data={this.props.store.legoParts.value}
            columns={columns}
          />
        )}
      </div>
    );
  }
}

export default inject("store")(observer(ViewLegos));
