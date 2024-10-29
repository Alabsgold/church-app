import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";

const auth = getAuth();
const dashboard = document.getElementById("dashboard");
const profileSection = document.getElementById("profile-section");
const loginSection = document.getElementById("login-section");
const checkinSection = document.getElementById("checkin-section");
const bibleVerseElement = document.getElementById("bible-verse");
const rememberMeCheckbox = document.getElementById("rememberMe");

// Array of Bible verses
const bibleVerses = [
    "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
    "I can do all things through Christ who strengthens me. - Philippians 4:13",
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
    "And we know that in all things God works for the good of those who love him. - Romans 8:28"
];

// Function to get a random Bible verse
function getRandomBibleVerse() {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    return bibleVerses[randomIndex];
}

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
        .then(() => {
            alert("Login successful!");
            showDashboard(); // Show dashboard after login
        })
        .catch(error => alert("Error: " + error.message));
}

// Show the dashboard
function showDashboard() {
    loginSection.style.display = "none";
    profileSection.style.display = "none";
    checkinSection.style.display = "none";
    dashboard.style.display = "block";
    bibleVerseElement.textContent = getRandomBibleVerse(); // Display random verse
    generateQRCode(); // Generate QR code on dashboard
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
        document.getElementById("user-email").textContent = "Logged in as: " + user.email;
        showDashboard(); // Redirect to dashboard on successful login
    } else {
        loginSection.style.display = "block";
        dashboard.style.display = "none";
    }
});

// Logout function
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully!");
            loginSection.style.display = "block";
            dashboard.style.display = "none"; // Hide dashboard on logout
        })
        .catch(error => alert("Error logging out: " + error.message));
}

// Additional feature functions
function showEvents() {
    alert("Upcoming Events feature will be implemented!");
}

function showPrayerRequests() {
    alert("Prayer Requests feature will be implemented!");
}

function showAnnouncements() {
    alert("Announcements feature will be implemented!");
}
