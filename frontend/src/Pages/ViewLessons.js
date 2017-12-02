import React, {Component} from 'react';
import Modal from 'react-modal';
import updateService from './../services/updateService';
import deleteService from './../services/deleteService';


class ViewLessons extends Component {

  constructor(props) {
      super(props);
      this.state =  {
            legoParts: [],
            modalIsOpen: false,
            piece: '',
            type: '',
            id: 0
        }
      this.componentDidMount.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.logChange = this.logChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/testing", {
      method: 'GET',
      headers: {
        'Content-Type': '"application/json'
        }
       })
       .then(response => {
        response.json()
       .then(data => {
       this.setState({legoParts: data});
        }
      );

      })
      .catch(function(err) {
       console.log("i failed");
        });
    }

onSubmit(event){
  event.preventDefault()
  console.log("here!!")
       var data = {
           piece: this.state.piece,
           type: this.state.type,
           id: this.state.id
       }
  updateService.updateLego(data);
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

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }



  render() {
      return (
      <div>
        <table>
        <thead>
        <tr>
        <th>
        Piece
        </th>
        <th>
        Type
        </th>
        </tr>
        </thead>
        <tbody>
        {this.state.legoParts.map(legoPart =>
         <tr key={legoPart.id}>
           <td>
           {legoPart.piece}
           </td>
           <td>
           {legoPart.type}
           </td>
           <td>
           <a onClick={() => this.openModal(legoPart)}>Edit</a>
           <a onClick={() => deleteService.deleteLego(legoPart)}>Delete</a>
           </td>
         </tr>
       )}
       <Modal
           isOpen={this.state.modalIsOpen}
           onRequestClose={this.closeModal}
           contentLabel="Example Modal" >
       <form onSubmit={this.onSubmit}>
           <label>Piece</label>
           <input onChange={this.logChange} className="form-control" value={this.state.piece} placeholder='Piece' name='piece'/>
           <label>Type</label>
           <input onChange={this.logChange} className="form-control" value={this.state.type} placeholder='Type' name='type'/>
           <div className="submit-section">
           <button className="btn btn-uth-submit">Submit</button>
           </div>
       </form>
       </Modal>
        </tbody>
        </table>
      </div>
      );
    }
}


export default ViewLessons;
