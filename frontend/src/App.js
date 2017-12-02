import React, { Component } from 'react';
import AddLego from './Pages/AddLego'
import ViewLessons from './Pages/ViewLessons'
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path="/viewlessons" component={ViewLessons}/>
            <Route path="/AddLego" component={AddLego}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
