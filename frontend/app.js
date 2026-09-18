const currentUser =
    sessionStorage.getItem("currentUser");


// =========================
// AUTH CHECK
// =========================

if (!currentUser) {

    window.location.href =
        "index.html";

}


// =========================
// USER INFORMATION
// =========================

const accountUsername =
    document.getElementById("accountUsername");

const accountInitial =
    document.getElementById("accountInitial");

const welcomeMessage =
    document.getElementById("welcomeMessage");


accountUsername.textContent =
    currentUser;

accountInitial.textContent =
    currentUser.charAt(0).toUpperCase();

welcomeMessage.textContent =
    `Welcome back, ${currentUser}.`;


// ACCOUNT MENU

const menuUsername =
    document.getElementById("menuUsername");

const menuInitial =
    document.getElementById("menuInitial");


menuUsername.textContent =
    currentUser;

menuInitial.textContent =
    currentUser.charAt(0).toUpperCase();


// =========================
// ACCOUNT MENU
// =========================

const accountButton =
    document.getElementById("accountButton");

const accountMenu =
    document.getElementById("accountMenu");


accountButton.addEventListener("click", () => {

    accountMenu.classList.toggle("hidden");

});


// Close menu when clicking outside

document.addEventListener("click", event => {

    if (
        !accountButton.contains(event.target) &&
        !accountMenu.contains(event.target)
    ) {

        accountMenu.classList.add("hidden");

    }

});


// =========================
// LOGOUT
// =========================

const logoutButton =
    document.getElementById("logoutButton");

const menuLogoutButton =
    document.getElementById("menuLogoutButton");


function logout() {

    sessionStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";

}


logoutButton.addEventListener(
    "click",
    logout
);

menuLogoutButton.addEventListener(
    "click",
    logout
);


// =========================
// ACCOUNT BUTTONS
// =========================

const accountNav =
    document.getElementById("accountNav");

const menuAccountButton =
    document.getElementById("menuAccountButton");


accountNav.addEventListener("click", event => {

    event.preventDefault();

    document.getElementById("accountNav").addEventListener("click", () => {
        window.location.href = "account.html";
    });

    document.getElementById("accountButton").addEventListener("click", () => {
        window.location.href = "account.html";
    });

    document.getElementById("menuAccountButton").addEventListener("click", () => {
        window.location.href = "account.html";
    });
});


menuAccountButton.addEventListener("click", () => {

    document.getElementById("accountNav").addEventListener("click", () => {
        window.location.href = "account.html";
    });

    document.getElementById("accountButton").addEventListener("click", () => {
        window.location.href = "account.html";
    });

    document.getElementById("menuAccountButton").addEventListener("click", () => {
        window.location.href = "account.html";
    });

});