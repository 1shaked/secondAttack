import {  useAtom } from "jotai"
import {  usersAtom, selectedUsersAtom, socketAtom } from "../store/state";

export function UserComponent() {
    const [users, setUsers] = useAtom(usersAtom)
    const [selectedUsers, setSelectedUsers] = useAtom(selectedUsersAtom)
    const [socketV, ] = useAtom(socketAtom)
    return <div className="user">
        <h1>user component</h1>
        <ul>
            {Object.keys(users).map((key, index) => <div key={index}>
                {socketV.id == key ? <li>you are {users[key]}</li> : <button onClick={() => setSelectedUsers(key)}><li>{users[key]}</li></button>}
            </div>)}
        </ul>
    </div>
}