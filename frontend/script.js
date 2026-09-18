const API_URL = "http://127.0.0.1:8000";


// =========================
// VIEW SWITCHING
// =========================

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");

const showRegisterButton =
    document.getElementById("showRegisterButton");

const showLoginButton =
    document.getElementById("showLoginButton");


showRegisterButton.addEventListener("click", () => {

    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");

});


showLoginButton.addEventListener("click", () => {

    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");

});


// =========================
// PASSWORD VISIBILITY
// =========================

const passwordToggles =
    document.querySelectorAll(".password-toggle");


passwordToggles.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input =
            document.getElementById(targetId);


        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

        } else {

            input.type = "password";

            button.textContent = "Show";

        }

    });

});


// =========================
// PASSWORD STRENGTH
// =========================

const registerPassword =
    document.getElementById("registerPassword");

const strengthFill =
    document.getElementById("strengthFill");

const strengthText =
    document.getElementById("strengthText");


registerPassword.addEventListener("input", () => {

    const password = registerPassword.value;

    let score = 0;


    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (password.length === 0) {

        strengthFill.style.width = "0%";

        strengthText.textContent =
            "You need a password, you know!";

    }

    else if (score <= 2) {

        strengthFill.style.width = "33%";

        strengthText.textContent =
            "Are you wanna be hacked or smth?";

    }

    else if (score <= 4) {

        strengthFill.style.width = "66%";

        strengthText.textContent =
            "Hm, I checked but you can do better, I guess!";

    }

    else {

        strengthFill.style.width = "100%";

        strengthText.textContent =
            "HELL YEAH, Approved!";

    }

});


// =========================
// REGISTER
// =========================

const registerButton =
    document.getElementById("registerButton");


registerButton.addEventListener("click", async () => {

    const username =
        document.getElementById("registerUsername")
        .value
        .trim();

    const password =
        document.getElementById("registerPassword")
        .value;

    const message =
        document.getElementById("registerMessage");


    message.className = "message";


    if (!username || !password) {

        message.textContent =
            "I think you forget to enter either the username or the password, Please check!";

        message.classList.add("error");

        return;
    }


    registerButton.disabled = true;

    registerButton.textContent =
        "Creating account...";


    try {

        const response = await fetch(
            `${API_URL}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );


        const result =
            await response.json();


        message.textContent =
            result.message;


        if (result.success) {

            message.classList.add("success");

            setTimeout(() => {

                loginView.classList.remove("hidden");
                registerView.classList.add("hidden");

                document.getElementById(
                    "loginUsername"
                ).value = username;

                document.getElementById(
                    "loginPassword"
                ).focus();

            }, 1000);

        } else {

            message.classList.add("error");

        }


    } catch (error) {

        message.textContent =
            "Hm, The server isnt working at this moment, Please try again later!";

        message.classList.add("error");

        console.error(error);

    }


    registerButton.disabled = false;

    registerButton.textContent =
        "Create Account";

});


// =========================
// LOGIN
// =========================

const loginButton =
    document.getElementById("loginButton");


loginButton.addEventListener("click", async () => {

    const username =
        document.getElementById("loginUsername")
        .value
        .trim();

    const password =
        document.getElementById("loginPassword")
        .value;

    const message =
        document.getElementById("loginMessage");


    message.className = "message";


    if (!username || !password) {

        message.textContent =
            "I think you forget to enter either the username or the password, Please check!";

        message.classList.add("error");

        return;
    }


    loginButton.disabled = true;

    loginButton.textContent =
        "Checking...";


    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );


        const result =
            await response.json();


        message.textContent =
            result.message;


        if (result.success) {

            message.classList.add("success");


            // Store the current username
            // temporarily for the app page.

            sessionStorage.setItem(
                "currentUser",
                username
            );


            setTimeout(() => {

                window.location.href =
                    "app.html";

            }, 500);

        } else {

            message.classList.add("error");

        }


    } catch (error) {

        message.textContent =
            "Hm, The server isnt working at this moment, Please try again later!";

        message.classList.add("error");

        console.error(error);

    }


    loginButton.disabled = false;

    loginButton.textContent =
        "Sign In";

});