import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD7Akmop96Y4A-Z9D-ZzZoBgiMdWgld_cI",
    authDomain: "fourgems-2dd73.firebaseapp.com",
    projectId: "fourgems-2dd73",
    storageBucket: "fourgems-2dd73.appspot.com",
    messagingSenderId: "117458129311",
    appId: "1:117458129311:web:a2c59e8daae4e3f2e02daa",
    measurementId: "G-44DN46TDK5",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
