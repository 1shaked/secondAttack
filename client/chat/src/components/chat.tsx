import { useAtom } from "jotai"
import { messagesAtom, selectedUserAtomDerived, selectedUsersAtom, socketAtom } from "../store/state"
import { useState } from "react";
import { encrypt } from "../encrypt";

export function ChatComponent() {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [newMessage, setNewMessage] = useState("");
    const [socketV, ] = useAtom(socketAtom);
    const [selectedUser, ] = useAtom(selectedUsersAtom);
    const [selectedUserName, ] = useAtom(selectedUserAtomDerived);
    function sendMessage() {
        console.log("send message");
        setMessages([...messages, {message: `you to ${selectedUserName} said ${newMessage}`, id: socketV.id}])
        const encryptMessage = encrypt(newMessage, selectedUser);
        socketV.emit("message", encryptMessage);
    }
    return <div className="chat">
        <h1>chat! </h1>
        <div style={{opacity: 0}}>{selectedUser }</div>
        <div>
            {messages.map((message, index) => <div key={index}>
                <p>{message.message}</p>
                <hr />
            </div>)}
        </div>
        <input type="text" onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>send secure message</button>
    </div>
}