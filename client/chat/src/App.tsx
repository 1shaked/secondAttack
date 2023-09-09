import {Login} from "./components/login"
import { useAtom } from "jotai"
import { idAtom, isLoginAtom, messagesAtom, selectedUserAtomDerived, socketAtom, userNameAtom, usersAtom } from "./store/state"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { UserComponent } from "./components/users";
import { ChatComponent } from "./components/chat";
import { decryptCus } from "./encrypt";

function App() {
  const [isLoggedIn, ] = useAtom(isLoginAtom);
  const [socketV, ] = useAtom(socketAtom);
  const [usersObject, setUsers] = useAtom(usersAtom);
  const [selectedUserDerived, ] = useAtom(selectedUserAtomDerived);
  const [, setIdUser] = useAtom(idAtom)
  // const [usersObject, ] = useAtom(usersAtom);
  const [messagesAtomRef, setMessages] = useAtom(messagesAtom);
  const [needToLoad, setNeedToLoad] = useState(false);
  const [tempData, setData] = useState({message: '', id: ''});
  socketV?.on("join", (data: {users: {[key: string]: string}, message: string}) => {
    console.log(data);
    setUsers(data.users);
    toast(data.message);
  });
  useEffect(() => {
    socketV.emit("info");
    console.log("id user: ", socketV?.id);
  }, []);
  socketV?.on("info", (data: {id: string}) => {
    console.log(data);
    setIdUser(data.id)
    
  });
  socketV?.on("message", (data: {message: string, id: string}) => {
    console.log(data);
    console.log(messagesAtomRef);
    setData(data);
    setNeedToLoad(!needToLoad);
  });

  useEffect(() => {
    const messageFixed = decryptCus(tempData.message ?? '', socketV.id ?? '');
    // get the user from the socket id
    const user = Object.keys(usersObject).find(key => key == tempData.id);
    setMessages([...messagesAtomRef, {...tempData, message: `${usersObject[user ?? ''] || 'no one'} send you -> ${messageFixed || tempData.message}` }]);
    console.log(messagesAtomRef);
  }, [needToLoad])
  if (!isLoggedIn) return <>
    <Login />
  </>
  return (
    <div className="App">
      <h1>chat page</h1>
      <UserComponent />
      {selectedUserDerived != '' ? 
        <>
          <h1>selected user: {selectedUserDerived}</h1> 
          <ChatComponent />
        </>

      : <h1>no selected user</h1>}
      <ToastContainer />
    </div>
  )
}

export default App
