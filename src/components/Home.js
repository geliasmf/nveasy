import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page of the application.</p>
      <Link to="/login" className="btn btn-primary">
        Go to Login
      </Link>
    </div>
  );
};

export default Home;
