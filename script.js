// Configuration: Add your websites here
const websites = [
    {
        name: "Unblocked ChatGPT",
        url: "https://gptnotblocked.crazymaplebutter.com",
        description: "ChatGPT but not blocked",
        status: "active"
    },
    {
        name: "More coming soon",
        url: "#",
        description: "more websites will be coming soon!",
        status: "coming-soon"
    }
];

// Function to get status class and display text
function getStatusInfo(status) {
    const statusMap = {
        'active': { class: 'active', text: 'Live' },
        'maintenance': { class: 'maintenance', text: 'Maintenance' },
        'coming-soon': { class: 'coming-soon', text: 'Coming Soon' }
    };
    return statusMap[status] || { class: 'active', text: 'Live' };
}

// Function to create a website card
function createSiteCard(site) {
    const card = document.createElement('a');
    card.href = site.url;
    card.className = 'site-card';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const statusInfo = getStatusInfo(site.status);
    
    card.innerHTML = `
        <h3>${site.name}</h3>
        <p>${site.description}</p>
        <div class="url">${site.url}</div>
        <div class="status ${statusInfo.class}">${statusInfo.text}</div>
    `;

    // Add click tracking (optional)
    card.addEventListener('click', function() {
        // You can add analytics tracking here if needed
        console.log(`Clicked on ${site.name}: ${site.url}`);
    });

    return card;
}

// Function to generate all site cards
function generateSiteCards() {
    const container = document.getElementById('site-container');
    
    // Show loading state
    container.innerHTML = '<div class="loading">Loading websites</div>';
    
    // Simulate loading delay (remove in production)
    setTimeout(() => {
        container.innerHTML = '';
        
        websites.forEach(site => {
            const card = createSiteCard(site);
            container.appendChild(card);
        });
        
        // Add a subtle animation delay for each card
        const cards = container.querySelectorAll('.site-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }, 500);
}

// Function to check if websites are accessible (optional)
async function checkWebsiteStatus(url) {
    try {
        const response = await fetch(url, { 
            method: 'HEAD',
            mode: 'no-cors'
        });
        return true;
    } catch (error) {
        return false;
    }
}

// Function to update website status dynamically (optional)
async function updateWebsiteStatuses() {
    for (let website of websites) {
        if (website.status === 'active') {
            const isOnline = await checkWebsiteStatus(website.url);
            if (!isOnline) {
                website.status = 'maintenance';
            }
        }
    }
    generateSiteCards();
}

// Add fade-in animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .site-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateSiteCards();
    
    // Optional: Check website statuses every 5 minutes
    // setInterval(updateWebsiteStatuses, 5 * 60 * 1000);
});

// Export functions for potential external use
window.WebsiteDirectory = {
    websites,
    generateSiteCards,
    createSiteCard,
    checkWebsiteStatus
};