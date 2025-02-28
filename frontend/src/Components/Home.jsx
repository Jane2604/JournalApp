import { Link } from "react-router-dom";
import "../css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content-box">
        <h1>Welcome to the Journal App</h1>
        <p>Keep track of your thoughts and memories by adding journal entries.</p>
        
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link><br /><br /><br />
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

