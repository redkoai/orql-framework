// web/js/firebase-config.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
    getFirestore, collection, addDoc, getDocs, query, where,
    orderBy, limit, serverTimestamp, increment, doc, updateDoc, getDoc
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import {
    getAnalytics,
    logEvent
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js';

const firebaseConfig = {
    apiKey: "AIzaSyD4utYStXc0caO5GPEDDtTtxmpIMrobE0A",
    authDomain: "orql-a1ed6.firebaseapp.com",
    projectId: "orql-a1ed6",
    storageBucket: "orql-a1ed6.firebasestorage.app",
    messagingSenderId: "917045147738",
    appId: "1:917045147738:web:1d3568fee483c45e8cc063",
    measurementId: "G-8B1MRDYWDB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export constants and db
export { db, analytics, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp, increment, doc, updateDoc, getDoc, logEvent };
