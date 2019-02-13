const validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = data => {
  // Instantiate the error object
  let errors = {};
  // If field is empty, sets to blank string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
    ? data.passwordConfirmation
    : "";
  // Validate Username
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Validate Email
  if (validator.isEmpty(data.email)) {
    errors.email = "E-mail is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "E-mail is invalid";
  }
  // Validate Password(s)
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!validator.isLength(data.password, { min: 4, max: 40 })) {
    errors.password = "Password must be at least 4 characters";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
