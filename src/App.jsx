import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatusBuilder } from './page/TopList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topListStatus: new TopListStatusBuilder().build()
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
          <TopList topListStatus={this.state.topListStatus} id="toplist-category-tabs" />
        </main>
      </div>
    );
  }

  async triggerToFetchToplist() {
    try {
      const json = await this.toplistStore.fetch();
      this.setState({
        topListStatus: new TopListStatusBuilder().setTopList(json).build()
      });
      console.log(json);
    } catch (err) {
      this.setState({
        topListStatus: new TopListStatusBuilder()
          .setError(err.statusText ? err.statusText : "Unknown error")
          .build()
      })
      console.error('Augh, there was an error!', err.statusText);
    }
  }
}

export default App;
