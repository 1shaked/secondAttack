import { useAtom } from "jotai"
import { isLoginAtom, socketAtom, userNameAtom } from "../store/state"

export function Login() {
    const [username, setUsername] = useAtom(userNameAtom);
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoginAtom);
    const [socketV, ] = useAtom(socketAtom);
    function toggledLogin() {
        if (username === "") return alert("username is empty");
        socketV?.emit("join", username);
        setIsLoggedIn(!isLoggedIn);
    }
    return <div className="formCenter">
        <h1>Login page</h1>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={toggledLogin}>
            Login
        </button>
    </div>
}