import { changeTabNumber } from './actions'
import React, { useState } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import SearchBar from './components/search_bar'
import FormList from './components/form_list'

//for redux
import configureStore from './store'
import { StoreContext, useDispatch } from 'redux-react-hook'
const store = configureStore()

const { TabPane } = Tabs;

function App() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('1')

  const changeTab = (activeKey) => {
    setActiveTab(activeKey)
    dispatch(changeTabNumber(activeKey))
  };

  return (
    <section className='code-box-demo'>
      <div className="card-container">
        <Tabs type="card" size='large' activeKey={activeTab} onChange={changeTab}>
          <TabPane tab="Search Recipes" key="1">
            <div className="main-container">
              <p className='page-main-title'>Awesome Recipes</p>
              <SearchBar />
            </div>
          </TabPane>
          <TabPane tab="Add Recipes" key="2">
            <div className="main-container">
              <p className='page-main-title'>My Recipes</p>
              <FormList />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
}

export default function MyApp() {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  )
}