import React, { Component } from 'react';

class NavBar extends Component {

handleClick = (e) => {
   e.preventDefault();
   console.log('The link was clicked.');
 };

  render() {
    return (
      <div>
       <ul>
          <button onClick={()=> window.open("addlego","_self")}>Add Lego</button>
          <button onClick={()=> window.open("viewlegos","_self")}>View All</button>
       </ul>
     </div>
    );
  }
}

export default NavBar;
