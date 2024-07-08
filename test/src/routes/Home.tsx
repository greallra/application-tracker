import { Link } from "react-router-dom";

export default function Home() {
    return (<>
    <h1>Home Page</h1>
    <Link to="/login">Login</Link>
    <Link to="/signup">Sign Up</Link>
    </>)
}