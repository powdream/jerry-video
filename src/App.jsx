import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatus } from './page/TopList';
import Program, { ProgramStatus } from './page/Program';
import EventDefinitions, { globalEmitter } from './event/Event';
import { PageType, PageStack } from './page/PageStack';

class App extends React.Component {
  constructor(props) {
    super(props);

    const pageStack = new PageStack();
    this.state = {
      pageStack: pageStack.push({
        pageType: PageType.TOP_LIST,
        topListStatus: TopListStatus.empty()
      })
    };
    this.toplistStore = new ToplistStore(false);
  }

  componentDidMount() {
    this.triggerToFetchToplist();
    globalEmitter.on(EventDefinitions.PROGRAM_CLICKED, (param) => {
      console.log("Program clicked:");
      console.log(param);

      const programStatus = ProgramStatus.loading(param);
      this.updatePageStack((pageStack) => pageStack.push({
        pageType: PageType.PROGRAM,
        programStatus: programStatus
      }));
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
          {this.renderContent()}
        </main>
      </div>
    );
  }

  currentPage() {
    return this.state.pageStack.peek();
  }

  renderContent() {
    const renderToplistContent = ({ topListStatus }) => (
      <TopList topListStatus={topListStatus} id="page-toplist" />
    );

    const renderProgramContent = ({ programStatus }) => (
      <Program programStatus={programStatus} id="page-program" />
    );

    console.log("renderContent():");
    const currentPage = this.currentPage();
    console.log(currentPage);
    switch (currentPage.pageType) {
      case PageType.TOP_LIST:
        return renderToplistContent(currentPage);

      case PageType.PROGRAM:
        return renderProgramContent(currentPage);

      default:
        return "";
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
        topListStatus: TopListStatus.fromToplist(json)
      }));
    } catch (err) {
      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.TOP_LIST,
        topListStatus: TopListStatus.fromError(err.statusText)
      }));
    }
  }
}

export default App;
