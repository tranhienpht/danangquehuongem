import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5Xkj0My9JsAgBaOTXNvp93RNTBEJLIc8",
    authDomain: "danangquehuongem.firebaseapp.com",
    projectId: "danangquehuongem",
    storageBucket: "danangquehuongem.firebasestorage.app",
    messagingSenderId: "386845989469",
    appId: "1:386845989469:web:1eafcff87da6c6da968bb4",
    measurementId: "G-BZ338KV67Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
