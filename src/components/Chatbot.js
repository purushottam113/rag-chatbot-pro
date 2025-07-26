'use client'

import { useState } from "react"

export default function Chatbot (){

    const [newMessage, setNewMessage] = useState("")
    const [chats, setChats] = useState([
        {
            sender: "bot",
            message: "Hello! How can I help you today?"
        },
    ]);

    const handleSend = ()=> {
        setChats(prev => [...prev, {
            sender: "user",
            message: newMessage
        }])
        fetchReply();
    };

    const handleKeyDown = (e)=>{
        if(e.key === "Enter"){
            handleSend()
        }
    }

    const fetchReply = async ()=>{
        try {
            const res = await fetch("api/query", {
                method: "POST",
                headers:{
                    "content-Type": "application/json"
                },
                body: JSON.stringify({query: newMessage})
            });
            const data = await res.json();
            setNewMessage("")

            setChats(prev => [...prev, {
                sender: "bot",
                message: data.message
            }])
        } catch (error) {
            setNewMessage("")
            console.log(error)
        }
    }

    return(
        <div className="flex flex-col h-full p-2 mx-auto rounded-xl">
            <div className="flex-1 overflow-y-auto space-y-4mb-2">
            {chats.map((chat, index)=> (
                chat.sender === "bot"?
                <div key={index} className="flex item-start space-x-2">
                    <div className="bg-white p-3 rounded-xl shadow-md max-w-xs">
                        <p className="text-gray-800">{chat.message}</p>
                    </div>
                </div>
                :
                <div key={index} className="flex justify-end">
                    <div className="bg-blue-500 text-white p-3 rounded-xl shadow-md max-w-xs">
                        <p className="">{chat.message}</p>
                    </div>
                </div>
            ))}
            </div>
            <div className="flex items-center text-black space-x-2">
                <input 
                type="text"
                placeholder="Type your query..."
                value={newMessage}
                onChange={e=>setNewMessage(e.target.value)}
                className="flex-1 p-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                onKeyDown={handleKeyDown}
                />
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={handleSend}
                >Send
                </button>
            </div>
        </div>
    )
}