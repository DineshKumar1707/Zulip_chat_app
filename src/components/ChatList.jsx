import React, { Component } from "react";
import UserService from "../services/UserService";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { withRouter } from 'react-router-dom';

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allChatUsers: []
    };
  }

  componentDidMount(){
      UserService.getUsers().then((res) => {
        console.log(res.data);
          this.setState({ allChatUsers: res.data.members });
      });
      
  }
  

  render() {
    return (
      <div className="main__chatlist">
        <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.allChatUsers && this.state.allChatUsers.map((item, index) => {
            return (
                <ChatListItems
                name={item.full_name}
                key={item.user_id}
                key1={item.user_id}
                mail={item.email}
                animationDelay={index + 1}
                active={item.is_bot ? "active" : ""}
                isOnline={item.is_active ? "active" : ""}
                image={item.avatar_url}
              />  
            );
          })}
        </div>
      </div>
    );
  }
}

export default ChatList;