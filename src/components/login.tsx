import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
}

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Login must be used within AuthProvider");
  }
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormdata((prev) => ({...prev, [name]: value}));
  }

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formdata.email) {
      errors.email = "Email is required"
    }
    if (!formdata.password) {
      errors.password = "Password is required"
    }
    return errors;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErros = validateForm();

    if (Object.keys(validationErros).length > 0) {
      setErrors(validationErros);
    } else {
      console.log(formdata);
      authContext.login(formdata.email, formdata.password).then(() => {
        navigate("/todos");
      }).catch((error) => {
        console.error("Login failed:", error);
      });
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formdata.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formdata.password} onChange={handleChange} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

export default Login;