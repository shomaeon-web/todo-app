import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDshvb93kqkp83vvE9VQQPKDAxQ96zYURw",
    authDomain: "todo-app-c0490.firebaseapp.com",
    projectId: "todo-app-c0490",
    storageBucket: "todo-app-c0490.firebasestorage.app",
    messagingSenderId: "652132410596",
    appId: "1:652132410596:web:757df0f9c915671f2638f1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const signupButton = document.getElementById("signupButton");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const authMessage = document.getElementById("authMessage");

signupButton.addEventListener("click", async function() {
   console.log("新規登録ボタンが押されました"); 
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        authMessage.textContent = "新規登録できました！";
    } catch (error) {
        console.error(error);

        console.log("error.code =", error.code);
        console.log("error.message =", error.message);

        
        
        
        authMessage.textContent = "登録に失敗しました：" + error.message;
    }
});

loginButton.addEventListener("click", async function() {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        authMessage.textContent = "ログインしました！";
    } catch (error) {
        authMessage.textContent = "ログインに失敗しました：" + error.message;
    }
});

logoutButton.addEventListener("click", async function() {
    try {
        await signOut(auth);

        authMessage.textContent = "ログアウトしました";
    } catch (error) {
        authMessage.textContent = "ログアウトに失敗しました";
    }
});

onAuthStateChanged(auth, function(user) {
    if (user) {
        authMessage.textContent = "ログイン中：" + user.email;
    } else {
        authMessage.textContent = "ログインしていません";
    }
});
