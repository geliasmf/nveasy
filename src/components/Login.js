import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../AppConfig.json";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(config.apiUrl + "/usersApp/login", {
        params: {
          userName: username,
          password: password,
        },
      });

      console.log(response.data);

      // Guardar los datos del usuario en el estado
      onLogin(response.data);

      // Redireccionar a la página de inicio después de un inicio de sesión exitoso
      navigate("/view");
    } catch (error) {
      // Ocurrió un error durante el inicio de sesión
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card p-4 mt-4">
        <h2 className="mb-4">Login / Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-secondary">
                Registrarse
              </button>
            </div>
            <div className="row"><span>v.0.0.0.5</span></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
