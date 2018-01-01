import React, { Component } from "react";
import { Table } from "react-bootstrap";
import convertTimestamp from "./../elements/ConvertTimeStamp";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.componentDidMount.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  openModal(part) {
    this.setState({
      modalIsOpen: true,
      piece: part.piece,
      type: part.type,
      id: part.id
    });
  }

  openDelete(part) {
    this.setState({
      modalIsOpen: true,
      piece: part.piece,
      type: part.type,
      id: part.id
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("here!!");
    var data = {
      piece: this.state.piece,
      type: this.state.type,
      id: this.state.id
    };
    updateService.updateLego(data);
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Update Form"
      >
        <form onSubmit={this.onSubmit}>
          <label>Piece</label>
          <input
            onChange={this.logChange}
            className="form-control"
            value={this.state.piece}
            placeholder="Piece"
            name="piece"
          />
          <label>Type</label>
          <input
            onChange={this.logChange}
            className="form-control"
            value={this.state.type}
            placeholder="Type"
            name="type"
          />
          <div className="submit-section">
            <button className="btn btn-uth-submit">Submit</button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default ModalForm;
