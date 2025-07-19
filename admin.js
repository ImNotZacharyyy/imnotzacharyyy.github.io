// admin.js

// Firebase config & initialization (make sure firebase is loaded before this)
const firebaseConfig = {
    apiKey: "AIzaSyCXCvtJjto-D9rDw19fAOHe1lE85uxhyOA",
    authDomain: "zacharys-creator-hub.firebaseapp.com",
    projectId: "zacharys-creator-hub",
    storageBucket: "zacharys-creator-hub.firebasestorage.app",
    messagingSenderId: "673541614337",
    appId: "1:673541614337:web:e4b1afbcedf1ea2e6f4900",
    measurementId: "G-KHWXN1714X"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const announcementInput = document.getElementById('announcement-input');
const postBtn = document.getElementById('post-announcement-btn');

// Post announcement function
postBtn.addEventListener('click', () => {
    const announcement = announcementInput.value.trim();
    if (!announcement) {
        alert('Type your announcement first!');
        return;
    }

    // Only allow logged-in admins to post (optional)
    if (!auth.currentUser) {
        alert('You must be logged in as admin to post announcements.');
        return;
    }

    db.collection('announcements').add({
        text: announcement,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Announcement posted!');
        announcementInput.value = '';
    }).catch(err => {
        alert('Error posting announcement: ' + err.message);
    });
});

// Optionally, you can check if user is admin or logged in here and redirect if not
auth.onAuthStateChanged(user => {
    if (!user) {
        alert('You are not logged in. Redirecting to login...');
        window.location.href = '/login.html'; // change if needed
    }
});
