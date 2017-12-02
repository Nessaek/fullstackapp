import React, {Component} from 'react';

class ViewLessons extends Component {

  constructor(props) {
      super(props);
      this.state = {
        legoParts : [
          {id: 2, piece: "hair", type: "body", edited: false},
          {id: 3, piece: "tree", type: "garden", edited: false},
          {id: 4, piece: "test", type: "test", edited: false}
        ]
      };
      // this.componentDidMount.bind(this);
  }

  // componentDidMount() {
  //   fetch("http://localhost:8000/testing", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': '"application/json'
  //       }
  //      })
  //      .then(response => {
  //       response.json()
  //      .then(data => {
  //      this.setState({legoParts: data});
  //       }
  //     );
  //
  //     })
  //     .catch(function(err) {
  //      console.log("i failed");
  //       });
  //   }



editPart(id) {
    this.setState({ editingPart: id });
  }


  renderForm(part){
    return(
    <form key ={part.id}>
      <input name="piece" value={this.state.piece} />
      <input name="type" value={this.state.type} />
    </form>
  );

}

  renderRow(part) {
    console.log(part);
    return (
    <tr key={part.id} onClick={() => this.editPart(part.id)}>
      <td>{part.piece}</td>
      <td>{part.type}</td>
    </tr>
  );

}

  render() {
      return (
        <table>
        <tbody>
        <tr>
        <th>
        Piece
        </th>
        <th>
        Type
        </th>
        </tr>
          {this.state.legoParts.map(
            part => part.id === this.state.editingPart
              ? this.renderForm(part)
              : this.renderRow(part)
          )}
          </tbody>
        </table>
      );
    }
}



export default ViewLessons;
