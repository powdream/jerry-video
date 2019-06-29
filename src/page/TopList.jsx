import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Progress from '../component/Progress';
import Channel from '../component/Channel';

const categories = [
  { eventKey: "DRAMA", title: "드라마" },
  { eventKey: "ENTERTAINMENT", title: "오락" },
  { eventKey: "DOCUMENTARY", title: "다큐" },
  { eventKey: "EVENT", title: "시사" },
  { eventKey: "NEWS", title: "뉴스,스포츠" },
];

const renderTopList = (toplist, defaultActiveKey, tabContentRenderer) => {
  const tabList = categories.map(({ eventKey, title }) => (
    <Tab eventKey={eventKey} title={title} key={eventKey}>
      {tabContentRenderer(toplist == null ? null : toplist[eventKey])}
    </Tab>
  ));
  return (
    <Tabs defaultActiveKey={defaultActiveKey} transition={false}>
      {tabList}
    </Tabs>
  );
}

const TopList = ({ topListStatus }) => {
  const toplist = topListStatus.toplist;
  if (!topListStatus.isLoaded) {
    return renderTopList(toplist, "ENTERTAINMENT", () => (
      <Progress isVisible={true} />
    ));
  } else if (!topListStatus.error) {
    return renderTopList(toplist, "ENTERTAINMENT", (channel) => (
      <Channel channel={channel} />
    ));
  } else {
    return renderTopList(toplist, "ENTERTAINMENT", () => (
      <div>{topListStatus.error}</div>
    ));
  }
};

export class TopListStatusBuilder {
  constructor() {
    this.toplist = null;
    this.isLoaded = false;
    this.error = null;
  }

  setTopList(toplist) {
    this.toplist = toplist;
    this.isLoaded = true;
    return this;
  }

  setError(error) {
    this.error = error;
    this.isLoaded = true;
    return this;
  }

  build() {
    return new TopListStatus(this);
  }
};

export class TopListStatus {
  constructor(builder) {
    this.toplist = builder.toplist;
    this.isLoaded = builder.isLoaded;
    this.error = builder.error;
  }
};

export default TopList;
