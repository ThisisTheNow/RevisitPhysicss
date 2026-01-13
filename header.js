function updateHeader() {
  const userId = Number(localStorage.getItem("userId"));

  const loginBtn = document.getElementById("LoginBtnHeader");
  const logoutBtn = document.getElementById("LogoutBtnHeader");
  const welcomeMsg = document.getElementById("WelcomeMsgHeader");
  const usernameSpan = document.getElementById("UsernameHeader");

  
  if (!loginBtn || !logoutBtn || !welcomeMsg || !usernameSpan) return;

  
  loginBtn.onclick = () => window.location.href = "login.html";

  
  logoutBtn.onclick = () => {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
  };

  if (Number.isInteger(userId)) {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    welcomeMsg.classList.remove("hidden");

    fetch(`https://revisitphysics.onrender.com/user?userId=${userId}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) usernameSpan.textContent = data.username;
      })
      .catch(console.error);

  } else {
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    welcomeMsg.classList.add("hidden");
    usernameSpan.textContent = "";
  }
}