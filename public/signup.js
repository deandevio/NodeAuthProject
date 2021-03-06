const form = document.querySelector("form");
let emailError = document.querySelector(".email.error");
let passwordError = document.querySelector(".password.error");
let usernameError = document.querySelector(".username.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";
  usernameError.textContent = "";

  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;

  try {
    const result = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await result.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      usernameError.textContent = data.errors.username;
    }

    if (data.user) {
      location.assign("/login");
    }
  } catch (err) {
    console.log(err);
  }
});
