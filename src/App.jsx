import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatusBuilder } from './page/TopList';
import EventDefinitions, { globalEmitter } from './event/Event';
import { PageType, PageStack } from './page/PageStack';

class App extends React.Component {
  constructor(props) {
    super(props);

    const pageStack = new PageStack();
    this.state = {
      pageStack: pageStack.push({
        pageType: PageType.TOP_LIST,
        topListStatus: new TopListStatusBuilder().build()
      })
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
        {this.renderContent()}
      </div>
    );
  }

  currentPage() {
    return this.state.pageStack.peek();
  }

  renderContent() {
    const currentPage = this.currentPage();
    switch (currentPage.pageType) {
      case PageType.TOP_LIST: {
        const topListStatus = currentPage.topListStatus;
        return (
          <div>
            <header className="App-header">
              <h1>Jerry Video</h1>
            </header>
            <main>
              <TopList topListStatus={topListStatus} id="toplist-category-tabs" />
            </main>
          </div>
        );
      }

      default: {
        return "";
      }
    }
  }

  updatePageStack(action) {
    this.setState({
      pageStack: action(this.state.pageStack)
    });
  }

  async triggerToFetchToplist() {
    try {
      console.log("triggerToFetchToplist():");
      const json = await this.toplistStore.fetch();
      console.log(json);
      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.TOP_LIST,
        topListStatus: new TopListStatusBuilder().setTopList(json).build()
      }));
    } catch (err) {
      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.TOP_LIST,
        topListStatus: new TopListStatusBuilder()
          .setError(err.statusText ? err.statusText : "Unknown error")
          .build()
      }));
    }
  }
}

export default App;
