const registerBtn = document.getElementById("RegisterBtn");
const loginBtn = document.getElementById("LoginBtn");
function hide(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

registerBtn.addEventListener("click", async () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;
    //Where the register login is done
    registerBtn.disabled = true;
    fetch("https://revisitphysics.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(async (r) => {
    
    const text = await r.json();
    const message = document.getElementById("loginMessage");

    if (text.ok) {
    message.textContent = "Registration was fine! You can now log in.";
    } else {
    message.textContent = "Registration Failed: " + (text.error || "Unknown error");
    registerBtn.disabled = false;
    }

    message.classList.remove("hidden");
}).catch(() => {
  const message = document.getElementById("loginMessage");
  message.textContent = "Network/server error";
  message.classList.remove("hidden");
  registerBtn.disabled = false;
    });

});

loginBtn.addEventListener("click", async () => {
    loginBtn.disabled = true;
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;
    fetch("https://revisitphysics.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username,password})
      }).then(async (r) => {
        const data = await r.json();
        if (data.ok){
        localStorage.setItem("userId", data.userId);
        window.location.href = "mainpage.html";}
        else {
          const message = document.getElementById("loginMessage");
          message.textContent = "Login Failed: " + (data.error || "Unknown error");
          message.classList.remove("hidden");
          loginBtn.disabled = false;
        }
      })
});