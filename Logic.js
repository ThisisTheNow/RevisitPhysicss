

function goTopage(buttonID, pageURL) {
    const button = document.getElementById(buttonID);
    if (!button) return;
    button.addEventListener("click", () => {
        window.location.href = pageURL;

    })
}


goTopage("T2", "workinprogress.html");
goTopage("T3", "workinprogress.html");
goTopage("T4", "workinprogress.html");
goTopage("T5", "workinprogress.html");

function dropdownMenu(dropdown, button) {
    const drop = document.getElementById(dropdown);
    const btn = document.getElementById(button);
    if (!drop || !btn) return;
    btn.addEventListener("click", () => {
        drop.classList.toggle("open");
    })
}
dropdownMenu("dropmenu", "T1");

goTopage("st1T1", "iandsfselectionquiz.html");
goTopage("st2T1", "workinprogress.html");
goTopage("st3T1", "workinprogress.html");
goTopage("st4T1", "workinprogress.html");

function makeitdisappear(elementID, triggerid) {
    const element = document.getElementById(elementID);
    const trigger = document.getElementById(triggerid);
    if (!element || !trigger) return;
    trigger.addEventListener("click", () => {
        element.classList.add("hidden"); quizstarted();})
        }

makeitdisappear("pageIandSFQuiz", "startQuiz");
goTopage("LoginBtnHeader", "login.html");
goTopage("rtm", "mainpage.html");



const logoutBtnO = document.getElementById("LogoutBtnHeader")
logoutBtnO?.addEventListener("click", () => {
  localStorage.removeItem("userId");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const userId = Number(localStorage.getItem("userId"));

  const loginBtn = document.getElementById("LoginBtnHeader"); 
  const logoutBtn = document.getElementById("LogoutBtnHeader"); 
  if (Number.isInteger(userId)) {
    
    loginBtn?.classList.add("hidden");    
    logoutBtn?.classList.remove("hidden");
    const UsernameHeader = document.getElementById("UsernameHeader");
    fetch(`https://revisitphysics.onrender.com/user?userId=${userId}`)
    .then(r => r.json())
    .then(data => {
    if (data && UsernameHeader) {
        UsernameHeader.textContent = data.username;
    }
    else {
        console.error("User data not found or UsernameHeader is missing.");}
    }).catch(err => {
    console.error("Failed to load user:", err);
    });
} 
    else {
    
    loginBtn?.classList.remove("hidden");
    logoutBtn?.classList.add("hidden");
    
    
}

});

