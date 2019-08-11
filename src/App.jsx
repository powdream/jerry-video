import React from 'react';
import './App.css';
import ToplistStore from './data-toplist/ToplistStore';
import TopList, { TopListStatus } from './page/TopList';
import ProgramStore from './data-program/ProgramStore';
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
    this.programStore = new ProgramStore(false);
  }

  componentDidMount() {
    this.fetchToplistAsync();

    globalEmitter.on(EventDefinitions.PROGRAM_CLICKED, async (program) => {
      await this.handleProgramClicked(program);
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

    const currentPage = this.currentPage();
    console.log("renderContent(): currentPage=", currentPage);
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

  async handleProgramClicked(program) {
    console.log("handleProgramClicked():", program);
    const programStatus = ProgramStatus.loading(program);
    this.updatePageStack((pageStack) => pageStack.push({
      pageType: PageType.PROGRAM,
      programStatus: programStatus
    }));
    await this.fetchProgramViewersAsync(program, programStatus);
  }

  async fetchToplistAsync() {
    try {
      const json = await this.toplistStore.fetch();
      console.log("fetchToplistAsync(): success:", json);

      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.TOP_LIST,
        topListStatus: TopListStatus.fromToplist(json)
      }));
    } catch (err) {
      console.log("fetchToplistAsync(): failure:", err);
      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.TOP_LIST,
        topListStatus: TopListStatus.fromError(err.statusText)
      }));
    }
  }

  async fetchProgramViewersAsync(program, programStatus) {
    try {
      const json = await this.programStore.fetch(program);
      console.log("fetchProgramViewersAsync(): success:", json);

      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.PROGRAM,
        programStatus: programStatus.succeededToLoad(json)
      }));
    }
    catch (err) {
      console.log("fetchProgramViewersAsync(): failure:", err);
      this.updatePageStack((pageStack) => pageStack.pop().push({
        pageType: PageType.PROGRAM,
        programStatus: programStatus.failedToLoad(err.statusText)
      }));
    }
  }
}

export default App;
