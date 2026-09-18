const currentUser = sessionStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

const currentUsername = document.getElementById("currentUsername");

const usernameModal = document.getElementById("usernameModal");
const passwordModal = document.getElementById("passwordModal");

const changeUsernameButton = document.getElementById("changeUsernameButton");
const changePasswordButton = document.getElementById("changePasswordButton");

const closeUsernameModal = document.getElementById("closeUsernameModal");
const closePasswordModal = document.getElementById("closePasswordModal");

const cancelUsernameButton = document.getElementById("cancelUsernameButton");
const cancelPasswordButton = document.getElementById("cancelPasswordButton");

const usernameMessage = document.getElementById("usernameMessage");
const passwordMessage = document.getElementById("passwordMessage");

const logoutButton = document.getElementById("logoutButton");


// =========================
// LOAD ACCOUNT
// =========================

currentUsername.textContent = currentUser;


// =========================
// MODAL FUNCTIONS
// =========================

function openModal(modal) {
    modal.classList.remove("hidden");
}

function closeModal(modal) {
    modal.classList.add("hidden");
}


// =========================
// CHANGE USERNAME
// =========================

changeUsernameButton.addEventListener("click", () => {
    usernameMessage.textContent = "";
    document.getElementById("newUsername").value = "";

    openModal(usernameModal);
});

closeUsernameModal.addEventListener("click", () => {
    closeModal(usernameModal);
});

cancelUsernameButton.addEventListener("click", () => {
    closeModal(usernameModal);
});


// =========================
// CHANGE PASSWORD
// =========================

changePasswordButton.addEventListener("click", () => {
    passwordMessage.textContent = "";

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    openModal(passwordModal);
});

closePasswordModal.addEventListener("click", () => {
    closeModal(passwordModal);
});

cancelPasswordButton.addEventListener("click", () => {
    closeModal(passwordModal);
});


// =========================
// CLOSE WHEN CLICKING OUTSIDE
// =========================

usernameModal.addEventListener("click", (event) => {
    if (event.target === usernameModal) {
        closeModal(usernameModal);
    }
});

passwordModal.addEventListener("click", (event) => {
    if (event.target === passwordModal) {
        closeModal(passwordModal);
    }
});


// =========================
// ESCAPE KEY
// =========================

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal(usernameModal);
        closeModal(passwordModal);
    }
});


// =========================
// LOGOUT
// =========================

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
});


// =========================
// TEMPORARY SAVE BUTTONS
// =========================

document.getElementById("saveUsernameButton").addEventListener("click", () => {
    usernameMessage.textContent =
        "Username changes will be connected to the backend next.";
});

document.getElementById("savePasswordButton").addEventListener("click", () => {
    passwordMessage.textContent =
        "Password changes will be connected to the backend next.";
});