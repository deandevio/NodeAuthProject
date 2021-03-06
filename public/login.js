let emailError = document.querySelector(".email.error");
let passwordError = document.querySelector(".password.error");
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  emailError.textContent = "";
  passwordError.textContent = "";

  const email = form.email.value;
  const password = form.password.value;

  try {
    const result = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();

    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }

    if (data.user) {
      location.assign(`/${data.user}`);
    }
  } catch (err) {
    console.log(err);
  }
});
