import { useState, useCallback, useMemo } from "react";

// Validation rules
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    required: true,
    minLength: 6,
    message: "Password must be at least 6 characters long",
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 30,
    message: "Name must be between 2 and 30 characters",
  },
  avatar: {
    required: true,
    pattern: /^https?:\/\/.+/,
    message: "Please enter a valid URL starting with http:// or https://",
  },
  imageUrl: {
    required: true,
    pattern: /^https?:\/\/.+/,
    message: "Please enter a valid URL starting with http:// or https://",
  },
  weather: {
    required: true,
    message: "Please select a weather type",
  },
};

export function useForm(inputValues, validationConfig = {}) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const rule = validationRules[name] || validationConfig[name];
      if (!rule) return "";

      if (rule.required && (!value || value.trim() === "")) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        return (
          rule.message ||
          `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${
            rule.minLength
          } characters`
        );
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        return (
          rule.message ||
          `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be no more than ${rule.maxLength} characters`
        );
      }

      if (value && rule.pattern && !rule.pattern.test(value)) {
        return rule.message || `Please enter a valid ${name}`;
      }

      return "";
    },
    [validationConfig]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback(
    (event) => {
      const { value, name } = event.target;
      const newValues = { ...values, [name]: value };
      setValues(newValues);

      // Validate field on change if it has been focused
      if (focused[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [values, focused, validateField]
  );

  const handleBlur = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFocused((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  const resetForm = useCallback(() => {
    setValues(inputValues);
    setErrors({});
    setFocused({});
  }, [inputValues]);

  const isFormValid = useMemo(() => {
    return Object.keys(values).every((name) => {
      const error = validateField(name, values[name]);
      return error === "";
    });
  }, [values, validateField]);

  const setValuesCallback = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  return {
    values,
    errors,
    focused,
    handleChange,
    handleBlur,
    setValues: setValuesCallback,
    validateForm,
    resetForm,
    isValid: isFormValid,
  };
}
