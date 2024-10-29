import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";

const auth = getAuth();
const profileSection = document.getElementById("profile-section");
const loginSection = document.getElementById("login-section");
const checkinSection = document.getElementById("checkin-section");
const rememberMeCheckbox = document.getElementById("rememberMe");

// Signup function
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter a valid email and password.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert("Sign-up successful!"))
        .catch(error => alert("Error: " + error.message));
}

// Login function with "Remember Me" option
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const persistenceType = rememberMeCheckbox.checked ? "local" : "session";

    if (!email || !password) {
        alert("Please enter a valid email and password.");
        return;
    }

    auth.setPersistence(persistenceType)
        .then(() => signInWithEmailAndPassword(auth, email, password))
        .then(() => alert("Login successful!"))
        .catch(error => alert("Error: " + error.message));
}

// Display QR code for event check-in
function generateQRCode() {
    const canvas = document.getElementById("qr-code");
    QRCode.toCanvas(canvas, auth.currentUser.uid, error => {
        if (error) console.error(error);
        console.log("QR code generated!");
    });
}

// Monitor auth state
onAuthStateChanged(auth, user => {
    if (user) {
        profileSection.style.display = "block";
        loginSection.style.display = "none";
        document.getElementById("user-email").textContent = "Logged in as: " + user.email;
        checkinSection.style.display = "block";
        generateQRCode();
    } else {
        profileSection.style.display = "none";
        loginSection.style.display = "block";
        checkinSection.style.display = "none";
    }
});

// Logout function
function logout() {
    signOut(auth)
        .then(() => alert("Logged out successfully!"))
        .catch(error => alert("Error logging out: " + error.message));
}