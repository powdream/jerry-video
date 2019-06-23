import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
// import Progress from './component/Progress';
import CategoryTabs from './component/CategoryTabs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <h1>Jerry Video</h1>
        </header>
        <main>
          <CategoryTabs toplist={this.state.toplist} id="toplist-category-tabs" />
        </main>
      </div>
    );
  }

  async triggerToFetchToplist() {
    try {
      let json = await this.toplistStore.fetch();
      this.setState({
        toplist: json
      });
      console.log(json);
    } catch (error) {
      console.error('Augh, there was an error!', error.statusText);
    }
  }
}

export default App;
