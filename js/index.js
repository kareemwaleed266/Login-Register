var loginBtn = document.querySelector("#login");

var inputs = document.querySelectorAll("input");
var home = document.querySelector("#home-page");
var username = inputs[0];
var email = inputs[1];
var pass = inputs[2];
var nav = document.querySelector("nav");
var logoutBtn = document.querySelector("#logout");
var signup = document.querySelector("#signup");

var accounts;
if (localStorage.getItem("accounts") == null) {
  accounts = [];
} else {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

signup.addEventListener("click", function (e) {
  e.preventDefault();

  if (signup.textContent === "Sign Up") {
    signup.previousSibling.textContent = "Have an account? ";

    username.classList.remove("d-none");
    loginBtn.textContent = "Sign Up";
    signup.textContent = "Login";
  } else if (signup.textContent === "Login") {
    signup.previousSibling.textContent = "Don’t have an account? ";

    username.classList.add("d-none");
    loginBtn.textContent = "Login";
    signup.textContent = "Sign Up";
  }
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (loginBtn.textContent === "Sign Up") {
    signUp();
  } else {
    login();
  }
});

function signUp() {
  if (!username.value || !email.value || !pass.value) {
    showAlert("All inputs required");
  } else if (!validation(username)) {
    showAlert(
      "Username must be at least 2 characters long and contain only letters"
    );
  } else if (!validation(email)) {
    showAlert(
      "Invalid email format (should be a Gmail address), ex(example@gmail.com)"
    );
  } else if (!validation(pass)) {
    showAlert(
      "Password must be 8-20 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
    );
  } else {
    var account = {
      username: username.value,
      email: email.value,
      pass: pass.value,
    };

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].email === account.email) {
        var msg = document.createElement("p");
        msg.innerHTML = "Email Already Exists";
        msg.style.color = "tomato";
        msg.style.padding = "5px";
        msg.style.fontSize = "12px";
        email.parentElement.appendChild(msg);

        setTimeout(() => {
          msg.innerHTML = "";
          email.parentElement.appendChild(msg);
          clear();
        }, 3000);

        return;
      }
    }

    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    username.classList.add("d-none");
    loginBtn.textContent = "Login";
    clear();
  }
}

function login() {
  var account = accounts.find((acc) => acc.email === email.value);
  if (!email.value || !pass.value) {
    showAlert("All inputs are required");
  } else if (account) {
    if (account.pass === pass.value) {
      var msg = document.createElement("h1");
      msg.innerHTML = `Welcome ${account.username}`;
      home.appendChild(msg);
      home.previousElementSibling.style.display = "none";
      home.style.cssText = `display: block !important`;
      nav.style.cssText = `display: block !important`;
      clear();
    } else {
      showAlert("Password incorrect");
    }
  } else {
    showAlert("Email not found");
    clear();
  }
}

function showAlert(message) {
  var alertMessage = document.getElementById("alertMessage");
  alertMessage.innerHTML = message;
  var customAlert = document.getElementById("customAlert");
  customAlert.style.display = "flex";
}

function closeAlert() {
  var customAlert = document.getElementById("customAlert");
  customAlert.style.display = "none";
}

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  logOut();
});

function logOut() {
  home.previousElementSibling.style.display = "block";
  home.style.cssText = `display: none !important`;
  nav.style.cssText = `display: none !important`;
}

function validation(input) {
  var regex = {
    username: /[a-zA-z]{2,50}/i,
    email: /^[a-zA-Z]{2,4}[\w]{4,15}@gmail\.com$/,
    pass: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
  };
  if (regex[input.id].test(input.value)) {
    return true;
  } else {
    return;
  }
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function () {
    validation(this);
  });
}

function clear() {
  username.value = "";
  email.value = "";
  pass.value = "";
}
