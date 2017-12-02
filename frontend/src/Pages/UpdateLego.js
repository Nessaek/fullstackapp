import React, {Component} from 'react';
import updateService from './../services/updateService';

class UpdateLego extends Component {

  constructor(props) {
      super(props);

      this.state = [];
  }


  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(state);
  }


  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { subject, progress } = this.state;
    console.log("test" + subject);
    postService.postLesson(subject, progress);



  }



  render() {
    const  {subject, progress}= this.state;

    return (
        <div>
         <h4>Add a Lesson</h4>
         <form onSubmit={this.onSubmit}>
        <label>
        Subject:
        <input type="text" name="subject" value={subject} id="subject" onChange={this.onChange}/>
        </label>
        <br></br>
        <label>
        progress:
        <input type="text" name="progress" value={progress} id="progress" onChange={this.onChange}/>
        </label>
        <input type="submit" value="Submit"/>
        </form>

        </div>
    );
  }
}

export default UpdateLego;
