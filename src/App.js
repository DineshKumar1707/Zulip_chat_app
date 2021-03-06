import React from 'react';
import "./App.css";
import "./chatBody.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ChatList from './components/ChatList';
import Nav from './components/Nav';
import ChatContent from './components/ChatContent';




function App() {
  return (
    <div className="__main">
      
        <Nav />
          <div className="main__chatbody">
            
            <Router>
            <ChatList />
              <Switch>
                <Route path="/:otherUser" component= {ChatContent}></Route>
              </Switch>
              
              </Router>  
            
          </div>
      
    </div>
  );
}

export default App;
