// Updated contact-community.js with Firebase integration

import {
    submitComment,
    getApprovedComments,
    joinCommunity,
    subscribeNewsletter,
    getStats,
    trackVisitor,
    submitContact
} from './firebase-config.js';

// Load and display real stats
async function loadRealStats() {
    const stats = await getStats();
    if (stats) {
        document.getElementById('visitor-count').textContent = stats.visitors.toLocaleString();
        document.getElementById('member-count').textContent = stats.members.toLocaleString();
        document.getElementById('sim-count').textContent = stats.simulations.toLocaleString();
        document.getElementById('discussion-count').textContent = stats.comments.toLocaleString();
    }
}

// Load approved comments
async function loadComments() {
    const comments = await getApprovedComments(6);
    const cloud = document.querySelector('.comments-cloud');
    
    // Clear existing placeholder comments
    cloud.innerHTML = '';
    
    comments.forEach((comment, index) => {
        const bubble = document.createElement('div');
        bubble.className = `comment-bubble bubble-${index + 1}`;
        bubble.setAttribute('data-author', comment.author);
        bubble.textContent = comment.text;
        cloud.appendChild(bubble);
    });
}

// Update comment form handler
const commentForm = document.getElementById('comment-form');
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value;
        const text = document.getElementById('comment-text').value;
        const submitButton = commentForm.querySelector('.submit-comment');
        
        submitButton.textContent = 'Posting...';
        submitButton.disabled = true;
        
        const result = await submitComment(name, text);
        
        if (result.success) {
            showNotification('Comment submitted! It will appear after moderation.');
            commentForm.reset();
            document.getElementById('char-current').textContent = '0';
        } else {
            showNotification(result.error || 'Error submitting comment. Please try again.');
        }
        
        submitButton.textContent = 'Post Comment';
        submitButton.disabled = false;
    });
}

// Update join community form handler
const joinForm = document.getElementById('join-community-form');
if (joinForm) {
    joinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(joinForm);
        const submitButton = joinForm.querySelector('button[type="submit"]');
        
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;
        
        const result = await joinCommunity(
            formData.get('name'),
            formData.get('email'),
            formData.get('interest'),
            formData.get('message')
        );
        
        if (result.success) {
            showNotification('Welcome to the ORQL community! Check your email for next steps.');
            joinForm.reset();
            // Reload stats to show new member count
            loadRealStats();
        } else {
            showNotification(result.error || 'Error joining community. Please try again.');
        }
        
        submitButton.textContent = 'Join Community';
        submitButton.disabled = false;
    });
}

// Update newsletter form handler
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const button = e.target.querySelector('button');
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        const result = await subscribeNewsletter(email);
        
        if (result.success) {
            showNotification('Successfully subscribed! Check your inbox.');
            newsletterForm.reset();
        } else {
            showNotification(result.error || 'Error subscribing. Please try again.');
        }
        
        button.textContent = 'Subscribe';
        button.disabled = false;
    });
}

// Update general contact form handler
const contactForms = document.querySelectorAll('.contact-form');
contactForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        const result = await submitContact(
            formData.get('name'),
            formData.get('email'),
            formData.get('message')
        );
        
        if (result.success) {
            showNotification('Message sent! We\'ll get back to you soon.');
            form.reset();
        } else {
            showNotification('Error sending message. Please try again.');
        }
        
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    });
});

// Notification system remains the same
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0, 242, 254, 0.3)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Character counter remains the same
const commentText = document.getElementById('comment-text');
const charCurrent = document.getElementById('char-current');

if (commentText) {
    commentText.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCurrent.textContent = length;
        
        if (length > 280) {
            e.target.value = e.target.value.substring(0, 280);
            charCurrent.textContent = 280;
        }
        
        if (length > 250) {
            charCurrent.style.color = '#ff006e';
        } else if (length > 200) {
            charCurrent.style.color = '#ffa500';
        } else {
            charCurrent.style.color = '#00f2fe';
        }
    });
}

// Initialize on page load
window.addEventListener('load', async () => {
    await trackVisitor();
    await loadRealStats();
    await loadComments();
});

// Refresh stats every 30 seconds
setInterval(loadRealStats, 30000);