import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatusBuilder } from './page/TopList';
import EventDefinitions, { globalEmitter } from './event/Event';

const PageType = {
  TOP_LIST: "top-list",
  PROGRAM: "program"
};

class AppStatus {
  constructor(pageType, data) {
    this.pageType = pageType;
    this.data = data;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appStatus: new AppStatus(PageType.TOP_LIST, { topListStatus: new TopListStatusBuilder().build() })
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
    let content;
    if (this.state.appStatus.pageType === PageType.TOP_LIST) {
      const topListStatus = this.state.appStatus.data.topListStatus;
      content = (
        <TopList topListStatus={topListStatus} id="toplist-category-tabs" />
      );
    } else {
      content = "";
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Jerry Video</h1>
        </header>
        <main>{content}</main>
      </div>
    );
  }

  async triggerToFetchToplist() {
    try {
      const json = await this.toplistStore.fetch();
      this.setState({
        appStatus: new AppStatus(
          PageType.TOP_LIST,
          {
            topListStatus: new TopListStatusBuilder().setTopList(json).build()
          }
        )
      });
      console.log(json);
    } catch (err) {
      this.setState({
        appStatus: new AppStatus(
          PageType.TOP_LIST,
          {
            topListStatus: new TopListStatusBuilder()
              .setError(err.statusText ? err.statusText : "Unknown error")
              .build()
          }
        )
      })
    }
  }
}

export default App;
