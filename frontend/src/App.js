import React, { Component } from 'react';
import NavBar from './Components/NavBar'
import AddLego from './Pages/AddLego'
import ViewLegos from './Pages/ViewLegos'
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
    <div>
      <NavBar/>
      <BrowserRouter>
        <div>
            <Route path="/viewlegos" component={ViewLegos}/>
            <Route path="/AddLego" component={AddLego}/>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
