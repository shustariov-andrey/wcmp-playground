import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './lib/typeahead/typeahead.component';

class App extends Component {

    constructor(props) {
        super(props);
        this.compRef = React.createRef();
    }


    componentDidMount() {
        this.compRef.current.getItemsCallback = () => Promise.resolve([{
            key: 'CSS',
            label: 'CSS'
        }])
    }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <erb-pure-typeahead ref={this.compRef}></erb-pure-typeahead>
        </header>
      </div>
    );
  }
}

export default App;
