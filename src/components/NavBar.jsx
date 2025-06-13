import { Link } from "react-router-dom";
import "../css/NavBar.css"
function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">SukiList App</Link>
        </div>
        <p>Search and Favorite your Movies! 😊</p>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-favorites">Favorites</Link>
        </div>
    </nav>
}

export default NavBar