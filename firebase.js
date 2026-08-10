import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "ここに自分のapiKey",
    authDomain: "ここに自分のauthDomain",
    projectId: "ここに自分のprojectId",
    storageBucket: "ここに自分のstorageBucket",
    messagingSenderId: "ここに自分のmessagingSenderId",
    appId: "ここに自分のappId"
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
