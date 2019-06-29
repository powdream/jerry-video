import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList from './page/TopList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toplist: null,
      isLoaded: false,
      error: null
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
          <h1>Jerry Video</h1>
        </header>
        <main>
          <TopList
            toplist={this.state.toplist}
            isLoaded={this.state.isLoaded}
            error={this.state.error}
            id="toplist-category-tabs" />
        </main>
      </div>
    );
  }

  async triggerToFetchToplist() {
    try {
      let json = await this.toplistStore.fetch();
      this.setState({
        toplist: json,
        isLoaded: true
      });
      console.log(json);
    } catch (err) {
      this.setState({
        error: err.statusText ? err.statusText : "Unknown error",
        isLoaded: true
      })
      console.error('Augh, there was an error!', err.statusText);
    }
  }
}

export default App;
