import { useState } from "react";

export const useFormInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const reset = () => {
    setValue("");
  }

  return { value, handleChange, reset };
}