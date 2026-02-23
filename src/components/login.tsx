import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormInput } from "../hooks/useFormInput";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const { login } = useAuth();
  const email = useFormInput();
  const password = useFormInput();

  const navigate = useNavigate();

  const validateForm = () => {
    const errors: FormErrors = {};
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
      login(email.value, password.value).then(() => {
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
          <input type="email" id="email" name="email" value={email.value} onChange={email.handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password.value} onChange={password.handleChange} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

export default Login;