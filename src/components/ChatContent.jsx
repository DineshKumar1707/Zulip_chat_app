import React, { Component, useState, createRef, useEffect } from "react";
import axios from 'axios';
import "./chatContent.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import UserService from "../services/UserService";
import { withRouter } from 'react-router-dom';


class ChatContent extends Component {

  messagesEndRef = createRef(null);
  chatItms = [];

    constructor(props) {
        super(props)
        
        this.state = {
            user: this.props.match.params.otherUser,
            userMsg: [],
            ownUser: [],
            chat: this.chatItms,
            msg: "",        
        }
        // console.log(this.state.user);
        // console.log(this.state.chat);
        console.log(this.state.ownUser);
    }

    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    sendMessage = () => {
      axios.post('http://localhost:8080/send', {
          msg: this.state.msg,
          user: this.state.user
      });
  };
   

    componentDidMount() {
        UserService.getUsersMsg(this.state.user).then( res => {
            console.log(res.data);
            this.setState({userMsg: res.data.messages })
            console.log(this.state.userMsg);
        });

        UserService.getOwnUser().then( response => {
          console.log(response.data);
          // let ownUserEmail = res.data.email;
          this.setState({ownUser: response.data.email})
          console.log();
        })

        window.addEventListener("keydown", (e) => {
          if(e.keyCode == 13) {
            if(this.state.msg != "") {
              this.chatItms.push({
                key: 1,
                type: "",
                msg: this.state.msg,
              });
              this.setState({ chat: [...this.chatItms] });
              this.scrollToBottom();
              this.sendMessage();
              this.setState({ msg: "" });
            }
          }
        });
        this.scrollToBottom();
    }

    

    onStateChange = (e) => {
        this.setState({ msg: e.target.value });    
    };



  render() {
    return (
      <div className="main__chatcontent">
        {/* <div className="content__header">
          <div className="blocks">
            {this.state.userMsg && this.state.userMsg.map((item, index) => {
              return (
                <div className="current-chatting-user">
                  <Avatar
                    image={item.avatar_url}
                  />
                  <p>{item.sender_full_name}</p>
                </div>
              )
            })}
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div> */}
        <div className="content__body">
          <div className="chat__items">
          {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
                type="text"
                placeholder="Type a message here"
                onChange={this.onStateChange}
                value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContent;