import React, {Component} from 'react';
import postService from './../services/postService';


class AddLego extends Component  {

  constructor(props) {
      super(props);
      this.state = {
        legoParts : []
      };

    }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] =  e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { piece, type } = this.state;
    postService.postLego(piece,type);
  }


  render() {
    return (
        <div>
         <h4>Add a Lego Piece</h4>
         <form onSubmit={this.onSubmit}>
        <label>
        Piece:
        <input type="text" name="piece" id="piece" onChange={this.onChange}/>
        </label>
        <br></br>
        <label>
        Type:
        <input type="text" name="type" id="type" onChange={this.onChange}/>
        </label>
        <input type="submit" value="Submit"/>
        </form>
        </div>
    );
  }

}

export default AddLego;
