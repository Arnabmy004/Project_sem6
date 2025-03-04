

import { initializeApp } from "firebase/app";


import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDYCasF2Goq8Mo2zPQZoj-Ung-vI10wtxo",
    authDomain: "my-web-app-35b60.firebaseapp.com",
    projectId: "my-web-app-35b60",
    storageBucket: "my-web-app-35b60.firebasestorage.app",
    messagingSenderId: "233368459881",
    appId: "1:233368459881:web:a1cce9ffe0449c83e4a0f8",
    measurementId: "G-NDVNYW2JK4"
  };

  const  app=initializeApp(firebaseConfig);   
  const db = getFirestore(app);
  export { db, collection, addDoc,app }; 