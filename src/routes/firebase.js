import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQiSX3ueEmCg42Vz37jkT66P12uFeEd1M",
    authDomain: "investment-wallet-7d4e6.firebaseapp.com",
    projectId: "investment-wallet-7d4e6",
    storageBucket: "investment-wallet-7d4e6.appspot.com",
    messagingSenderId: "252890064287",
    appId: "1:252890064287:web:e6a72b081cfb776eba09aa",
    measurementId: "G-5GQFGHN1S0"
};

const app = initializeApp(firebaseConfig);
export default app;