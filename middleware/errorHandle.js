const errorHandle = (err) => {
  console.log(err);
  let errors = { username: "", email: "", password: "" };

  if (err.message === "Incorrect password") {
    errors.password = "Wrong password, please try again";
  }
  if (err.message === "Incorrect email") {
    errors.email = "Wrong email, please try again";
  }

  if (err.name === "CastError") {
    return (error = `Invalid ${err.path} at ${err.value}`);
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
