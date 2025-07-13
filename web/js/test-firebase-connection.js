// web/js/test-firebase-connection.js
// Add this script to test your Firebase connection

import { 
    db, 
    analytics, 
    collection, 
    doc, 
    getDoc, 
    setDoc,
    serverTimestamp 
  } from './firebase-init.js';
  
  // Test Firebase Connection
  export async function testFirebaseConnection() {
    console.log('🔍 Testing Firebase Connection...');
    
    const results = {
      firebaseInit: false,
      firestoreRead: false,
      firestoreWrite: false,
      analyticsInit: false,
      errors: []
    };
  
    try {
      // Test 1: Check if Firebase initialized
      if (db) {
        console.log('✅ Firebase initialized successfully');
        results.firebaseInit = true;
      } else {
        throw new Error('Firebase not initialized');
      }
  
      // Test 2: Try to read from Firestore
      console.log('📖 Testing Firestore read...');
      const statsRef = doc(db, 'stats', 'global');
      const statsDoc = await getDoc(statsRef);
      
      if (statsDoc.exists()) {
        console.log('✅ Successfully read from Firestore:', statsDoc.data());
        results.firestoreRead = true;
      } else {
        console.log('⚠️  Stats document doesn\'t exist, will create it...');
      }
  
      // Test 3: Try to write to Firestore (test collection)
      console.log('✏️  Testing Firestore write...');
      const testRef = doc(collection(db, 'connection_tests'), `test_${Date.now()}`);
      await setDoc(testRef, {
        timestamp: serverTimestamp(),
        test: true,
        userAgent: navigator.userAgent
      });
      console.log('✅ Successfully wrote to Firestore');
      results.firestoreWrite = true;
  
      // Test 4: Check Analytics
      if (analytics) {
        console.log('✅ Google Analytics initialized');
        results.analyticsInit = true;
      }
  
    } catch (error) {
      console.error('❌ Firebase connection error:', error);
      results.errors.push(error.message);
    }
  
    // Display summary
    console.log('\n📊 Connection Test Summary:');
    console.log('==========================');
    console.log(`Firebase Init: ${results.firebaseInit ? '✅' : '❌'}`);
    console.log(`Firestore Read: ${results.firestoreRead ? '✅' : '❌'}`);
    console.log(`Firestore Write: ${results.firestoreWrite ? '✅' : '❌'}`);
    console.log(`Analytics Init: ${results.analyticsInit ? '✅' : '❌'}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      results.errors.forEach(err => console.log(`  - ${err}`));
    }
  
    return results;
  }
  
  // Debug helper to monitor real-time updates
  export function debugStatsUpdates() {
    const statsRef = doc(db, 'stats', 'global');
    
    console.log('👀 Monitoring stats updates...');
    
    const unsubscribe = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log('📊 Stats Update:', {
          visitorCount: data.visitorCount,
          memberCount: data.memberCount,
          simulationCount: data.simulationCount,
          discussionCount: data.discussionCount,
          lastUpdated: data.lastUpdated?.toDate?.() || 'Unknown'
        });
      }
    }, (error) => {
      console.error('❌ Error monitoring stats:', error);
    });
  
    return unsubscribe;
  }
  
  // Visual connection indicator
  export function createConnectionIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'firebase-connection-indicator';
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      transition: all 0.3s ease;
    `;
    
    indicator.innerHTML = '🔄 Connecting to Firebase...';
    indicator.style.background = '#ff9800';
    indicator.style.color = 'white';
    
    document.body.appendChild(indicator);
    
    return {
      setConnected: () => {
        indicator.innerHTML = '✅ Firebase Connected';
        indicator.style.background = '#4caf50';
        setTimeout(() => {
          indicator.style.opacity = '0.7';
        }, 3000);
      },
      setError: (error) => {
        indicator.innerHTML = `❌ Connection Error: ${error}`;
        indicator.style.background = '#f44336';
      },
      remove: () => {
        indicator.remove();
      }
    };
  }
  
  // Auto-run tests when imported
  if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    console.log('🚀 Running Firebase connection tests...');
    
    const indicator = createConnectionIndicator();
    
    testFirebaseConnection().then(results => {
      if (results.firebaseInit && results.firestoreRead && results.firestoreWrite) {
        indicator.setConnected();
        // Start monitoring updates in debug mode
        debugStatsUpdates();
      } else {
        indicator.setError('Check console for details');
      }
    });