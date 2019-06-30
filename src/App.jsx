import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatusBuilder } from './page/TopList';
import EventDefinitions, { globalEmitter } from './event/Event';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topListStatus: new TopListStatusBuilder().build()
    };
    this.toplistStore = new ToplistStore(false);
  }

  componentDidMount() {
    this.triggerToFetchToplist();
    globalEmitter.on(EventDefinitions.PROGRAM_CLICKED, (param) => {
      console.log(param);
    });
  }

  componentWillUnmount() {
    globalEmitter.removeAllListeners();
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
    }
  }
}

export default App;