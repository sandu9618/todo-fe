import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function Signup() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    throw new Error("Signup must be used within AuthProvider");
  }

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormdata((prev) => ({...prev, [name]: value}));
  }

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formdata.name) {
      errors.name = "Name is required"
    }
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
      authContext.signup(formdata.name, formdata.email, formdata.password).then(() => {
        navigate("/todos");
      }).catch((error) => {
        console.error("Signup failed:", error);
      });
    }

  }

  return (
    <div className="signup">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Sign Up</h3>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Name</label>
              <input type="text" id="name" name="name" value={formdata.name} onChange={handleChange} />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formdata.email} onChange={handleChange} />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formdata.password} onChange={handleChange} />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup;