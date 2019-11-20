import React, {useState, useRef, useEffect} from "react";
import { FaPaperPlane } from 'react-icons/fa';
import FirebaseApi from "../api";
import {UncontrolledTooltip} from "reactstrap";
import YouTube from 'react-youtube';
import moment from "moment";
import {NO_AVATAR_IMAGE} from "../configs/constants";


const Content = ({messages, currentUser}) => {
    const messagesEnd = useRef(null);
    const [message, setMessage] = useState("");


    const handleSendMessage = () => {
        if(!message){
            return
        }
        FirebaseApi.sendMessage(message, currentUser).then(() => {
            setMessage("")
            scrollToBottom()
        })
    };

    useEffect(()=> {
        scrollToBottom()
    }, );

    const scrollToBottom = () => {
        messagesEnd.current.scrollTop = messagesEnd.current.scrollHeight;
    };

    const getParameterByName = (query, name) => {
        const match = RegExp('[?&]' + name + '=([^&]*)').exec(query);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    const getMessage = (message) => {
        if(message.includes("youtube")){
            const opts = {
                height: '240px',
                width: '360px',
                playerVars: {
                    autoplay: 0
                }
            };
            return <p>
                <YouTube
                    opts={opts}
                    videoId={getParameterByName(message, "v")}
                />
            </p>
        }
      return <p>{message}</p>
    };

    const getMessageSentTime = (time) => {
        return  moment.unix(time.seconds).startOf('minutes').fromNow();
    }

    return <div className="content">
        <div className="contact-profile">
            <img
                style={{borderRadius: "10%"}}
                src="data:image/png;base64,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"
                alt=""/>
            <p>Chat</p>
            <div className="social-media">
                <i className="fa fa-facebook" aria-hidden="true"/>
                <i className="fa fa-twitter" aria-hidden="true"/>
                <i className="fa fa-instagram" aria-hidden="true"/>
            </div>
        </div>
        <div className="messages" ref={messagesEnd}>
            <ul>
                {currentUser && messages.map((message, index) => (
                    <li className={ message.from === currentUser.email ? "sent": "replies"} key={index}>
                        <span className={"time"}>{getMessageSentTime(message.createdAt)} </span>
                        <div className="user-chat clearfix">
                            <UncontrolledTooltip placement="top" target={`message${index}`}>
                                {message.from === currentUser.email ? "You": message.from}
                            </UncontrolledTooltip>
                            <img src={NO_AVATAR_IMAGE} alt="" id={`message${index}`}/>
                            {getMessage(message.message)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className="message-input">
            <div className="wrap">
                <input
                    value={message}
                    onChange={({target}) => setMessage(target.value)}
                    onKeyUp={({keyCode}) => keyCode === 13 && handleSendMessage()}
                    type="text"
                    placeholder="Write your message..."
                />
                <i className="fa fa-paperclip attachment" aria-hidden="true"/>
                <button className="submit" onClick={handleSendMessage}><FaPaperPlane/></button>
            </div>
        </div>
    </div>
}

export default Content;
