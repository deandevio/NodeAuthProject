const errorHandle = (err) => {
  console.log(err);
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect password") {
    errors.password = "Wrong password, please try again";
  }
  if (err.message === "Incorrect email") {
    errors.email = "Wrong email, please try again";
  }

  if (err.code === 11000) {
    errors.email = "This email is already registered";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = errorHandle;
