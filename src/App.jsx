import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import Progress from './component/Progress';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      isLoaded: false,
      toplist: null
    };
    this.toplistStore = new ToplistStore(false);
  }

  componentDidMount() {
    console.log("Hello, world");
    this.triggerToFetchToplist();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.jsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>Trying with class App: {this.state.name}, {this.props.id}</p>
          <Progress isVisible={!this.state.isLoaded} />
          <p>ENTERTAINMENT: {this.state.toplist ? this.state.toplist.ENTERTAINMENT[0].title : ""}</p>
        </header>
      </div>
    );
  }

  async triggerToFetchToplist() {
    try {
      let json = await this.toplistStore.fetch();
      this.setState({
        isLoaded: true,
        toplist: json
      });
      console.log(json);
    } catch (error) {
      console.error('Augh, there was an error!', error.statusText);
    }
  }
}

export default App;
