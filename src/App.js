import { changeTabNumber } from './actions'
import React, { useState } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import SearchBar from './components/search_bar'
// import FavorList from './components/favor_list'
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
        <Tabs type="card" size='large' addIcon="" activeKey={activeTab} onChange={changeTab}>
          <TabPane tab={<span><img alt="logo" src='../assets/images/logo.png' style={{ width: 50, height: 50 }} /> Awesome Recipes </span>} key="1">
            <div className="main-container">
              <p className='page-main-title'>Awesome Recipes</p>
              <SearchBar />
            </div>
          </TabPane>
          {/* <TabPane tab="My Favorite" key="2">
            <div className="main-container">
              <p className='page-main-title'>My Favorite</p>
              <FavorList />
            </div>
          </TabPane> */}
          <TabPane tab={<span><img alt="user" src='../assets/images/user.png' className="rightTab" /> </span>} key="3">
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