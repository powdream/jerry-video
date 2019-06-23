import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Progress from './Progress';

const inProgressTabs = () => {
  return (
    <Tabs defaultActiveKey="ENTERTAINMENT" transition={false} id="toplist-category-tabs">
      <Tab eventKey="DRAMA" title="드라마">
        <Progress isVisible={true} />
      </Tab>
      <Tab eventKey="ENTERTAINMENT" title="오락">
        <Progress isVisible={true} />
      </Tab>
      <Tab eventKey="DOCUMENTARY" title="다큐">
        <Progress isVisible={true} />
      </Tab>
      <Tab eventKey="EVENT" title="시사">
        <Progress isVisible={true} />
      </Tab>
      <Tab eventKey="NEWS" title="뉴스,스포츠">
        <Progress isVisible={true} />
      </Tab>
    </Tabs>
  );
};

const loadedCategoryTabs = (toplist) => {
  return (
    <Tabs defaultActiveKey="ENTERTAINMENT" transition={false}>
      <Tab eventKey="DRAMA" title="드라마">
        {toplist.DRAMA[0].title}
      </Tab>
      <Tab eventKey="ENTERTAINMENT" title="오락">
        {toplist.ENTERTAINMENT[0].title}
      </Tab>
      <Tab eventKey="DOCUMENTARY" title="다큐">
        {toplist.DOCUMENTARY[0].title}
      </Tab>
      <Tab eventKey="EVENT" title="시사">
        {toplist.EVENT[0].title}
      </Tab>
      <Tab eventKey="NEWS" title="뉴스,스포츠">
        {toplist.NEWS[0].title}
      </Tab>
    </Tabs>
  );
};

const CategoryTabs = (props) => {
  const toplist = props.toplist;
  if (!toplist) {
    return inProgressTabs();
  } else {
    return loadedCategoryTabs(toplist);
  }
};

export default CategoryTabs;
