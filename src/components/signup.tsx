import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormInput } from "../hooks/useFormInput";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const name = useFormInput();
  const email = useFormInput();
  const password = useFormInput();
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!name.value) {
      errors.name = "Name is required"
    }
    if (!email.value) {
      errors.email = "Email is required"
    }
    if (!password.value) {
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
      signup(name.value, email.value, password.value).then(() => {
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
              <input type="text" id="name" name="name" value={name.value} onChange={name.handleChange} />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={email.value} onChange={email.handleChange} />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password.value} onChange={password.handleChange} />
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