import { Link } from "react-router-dom";

export function NotLogged() {
    return (
        <>
            <h1>Para acessar esta funcionalidade é necessário realizar login </h1>
            <Link to="/login">Login</Link>
        </>
    )
}