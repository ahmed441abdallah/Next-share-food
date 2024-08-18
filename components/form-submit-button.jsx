"use client";
import { useFormStatus } from "react-dom";
const FormSubmitButton = () => {
  const { pending } = useFormStatus();

  return <button>{pending ? "Submitting..." : "Share Meal"}</button>;
};

export default FormSubmitButton;
