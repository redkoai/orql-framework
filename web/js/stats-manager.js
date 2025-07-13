// web/js/stats-manager.js
import { 
    db, 
    analytics, 
    logEvent, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    onSnapshot, 
    increment, 
    serverTimestamp,
    query,
    where,
    orderBy,
    limit,
    getDocs
  } from './firebase-init.js';
  
  class StatsManager {
    constructor() {
      this.statsRef = doc(db, 'stats', 'global');
      this.visitorsRef = collection(db, 'visitors');
      this.membersRef = collection(db, 'members');
      this.simulationsRef = collection(db, 'simulations');
      this.discussionsRef = collection(db, 'discussions');
      this.commentsRef = collection(db, 'comments');
      
      this.sessionId = this.generateSessionId();
      this.visitorId = this.getOrCreateVisitorId();
      
      this.initializeStats();
      this.trackVisitor();
    }
  
    generateSessionId() {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  
    getOrCreateVisitorId() {
      let visitorId = localStorage.getItem('orql_visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('orql_visitor_id', visitorId);
      }
      return visitorId;
    }
  
    async initializeStats() {
      // Check if stats document exists, if not create it
      const statsDoc = await getDoc(this.statsRef);
      if (!statsDoc.exists()) {
        await setDoc(this.statsRef, {
          visitorCount: 0,
          memberCount: 0,
          simulationCount: 0,
          discussionCount: 0,
          lastUpdated: serverTimestamp()
        });
      }
    }
  
    async trackVisitor() {
      // Check if this visitor has been tracked today
      const today = new Date().toISOString().split('T')[0];
      const visitorDocRef = doc(this.visitorsRef, `${this.visitorId}_${today}`);
      const visitorDoc = await getDoc(visitorDocRef);
      
      if (!visitorDoc.exists()) {
        // New visitor for today
        await setDoc(visitorDocRef, {
          visitorId: this.visitorId,
          date: today,
          firstVisit: serverTimestamp(),
          pageViews: 1,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        });
        
        // Increment global visitor count
        await setDoc(this.statsRef, {
          visitorCount: increment(1),
          lastUpdated: serverTimestamp()
        }, { merge: true });
        
        // Log to Google Analytics
        logEvent(analytics, 'new_daily_visitor', {
          visitor_id: this.visitorId,
          date: today
        });
      } else {
        // Returning visitor today - increment page views
        await setDoc(visitorDocRef, {
          pageViews: increment(1),
          lastVisit: serverTimestamp()
        }, { merge: true });
      }
    }
  
    // Subscribe to real-time stats updates
    subscribeToStats(callback) {
      return onSnapshot(this.statsRef, (doc) => {
        if (doc.exists()) {
          callback(doc.data());
        }
      });
    }
  
    // Track simulation run
    async trackSimulation(simulationType, parameters) {
      const simDoc = doc(this.simulationsRef);
      await setDoc(simDoc, {
        type: simulationType,
        parameters: parameters,
        visitorId: this.visitorId,
        sessionId: this.sessionId,
        timestamp: serverTimestamp()
      });
      
      await setDoc(this.statsRef, {
        simulationCount: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      logEvent(analytics, 'simulation_run', {
        simulation_type: simulationType,
        visitor_id: this.visitorId
      });
    }
  
    // Track new member signup
    async trackMemberSignup(memberData) {
      const memberDoc = doc(this.membersRef);
      await setDoc(memberDoc, {
        ...memberData,
        joinedAt: serverTimestamp(),
        visitorId: this.visitorId
      });
      
      await setDoc(this.statsRef, {
        memberCount: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      logEvent(analytics, 'member_signup', {
        interest: memberData.interest,
        visitor_id: this.visitorId
      });
    }
  
    // Track new discussion/comment
    async trackDiscussion(discussionData) {
      const discussionDoc = doc(this.discussionsRef);
      await setDoc(discussionDoc, {
        ...discussionData,
        visitorId: this.visitorId,
        timestamp: serverTimestamp(),
        active: true
      });
      
      await setDoc(this.statsRef, {
        discussionCount: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      logEvent(analytics, 'new_discussion', {
        type: discussionData.type || 'comment',
        visitor_id: this.visitorId
      });
    }
  
    // Add a new comment
    async addComment(name, text) {
      const commentDoc = doc(this.commentsRef);
      const commentData = {
        author: name,
        text: text,
        visitorId: this.visitorId,
        timestamp: serverTimestamp(),
        approved: false, // For moderation
        likes: 0
      };
      
      await setDoc(commentDoc, commentData);
      await this.trackDiscussion({ type: 'comment', author: name });
      
      return commentDoc.id;
    }
  
    // Get recent approved comments
    async getRecentComments(limitCount = 10) {
      const q = query(
        this.commentsRef,
        where('approved', '==', true),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      
      return comments;
    }
  
    // Track page view
    trackPageView(pageName) {
      logEvent(analytics, 'page_view', {
        page_name: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname,
        visitor_id: this.visitorId
      });
    }
  
    // Track CTA clicks
    trackCTAClick(ctaName, ctaLocation) {
      logEvent(analytics, 'cta_click', {
        cta_name: ctaName,
        cta_location: ctaLocation,
        visitor_id: this.visitorId
      });
    }
  
    // Get formatted stats for display
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toLocaleString();
    }
  }
  
  // Export singleton instance
  export default new StatsManager();