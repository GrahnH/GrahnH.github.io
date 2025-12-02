/**
 * Render note cards into a container
 * @param {Array} notesData - Array of note objects
 * @param {string} containerId - Target HTML element ID
 * @param {boolean} isSlider - If true, applies styling for horizontal slider
 */
function renderNotesPreview(notesData, containerId, isSlider = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    // Handle empty data
    if (!notesData || notesData.length === 0) {
        if(containerId !== 'searchResultsContainer') {
             container.innerHTML = '<div style="color:#999; padding:20px;">No content available</div>';
        }
        return;
    }

    notesData.forEach(note => {
        const card = document.createElement('a');
        card.href = note.link || '#';
        card.className = 'note-card';
        
        // Generate Tag HTML if tags exist
        let tagsHtml = '';
        if (note.tags && note.tags.length > 0) {
            tagsHtml = '<div class="tags">' + note.tags.map(tag => 
                // Add onclick event to handle tag search
                `<span class="tag" onclick="handleTagClick(event, '${tag}')">${tag}</span>`
            ).join('') + '</div>';
        }

        // Format content (simple truncation for preview)
        // For Dev Logs, we might want to split by semicolon if it's a list string, 
        // but for safety we just display it as text.
        let contentDisplay = note.content;
        
        card.innerHTML = `
            <div class="note-date">${note.date}</div>
            <h3 class="note-title">${note.title || 'Update'}</h3>
            <div class="note-preview">${contentDisplay}</div>
            ${tagsHtml}
        `;

        container.appendChild(card);
    });
}

/**
 * Handle clicks on tags: populate search box and trigger search
 */
function handleTagClick(event, tagName) {
    // Prevent the card link from being followed
    event.preventDefault();
    event.stopPropagation();

    const searchInput = document.getElementById('notesSearchInput');
    if (searchInput) {
        searchInput.value = tagName;
        // Trigger input event manually to run the search logic
        searchInput.dispatchEvent(new Event('input'));
        // Scroll user to search box
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchInput.focus();
    }
}

/**
 * Main Search Logic
 */
function searchLearningNotes() {
    const searchInput = document.getElementById('notesSearchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    const searchSection = document.getElementById('searchSection');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const viewAllLink = document.getElementById('viewAllResults');
    const noResultsSection = document.getElementById('noResults');
    const allContentSection = document.getElementById('allContentSection'); 

    // 1. If query is empty, hide search section and show main content
    if (!query) {
        searchSection.style.display = 'none';
        allContentSection.style.display = 'block'; 
        return;
    }

    // 2. Filter Data
    const allNotes = window.learningNotesData || [];
    const filteredNotes = allNotes.filter(note => {
        const titleMatch = (note.title || '').toLowerCase().includes(query);
        const contentMatch = (note.content || '').toLowerCase().includes(query);
        const tagsMatch = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
        return titleMatch || contentMatch || tagsMatch;
    });

    // 3. Show Search Section
    searchSection.style.display = 'block';
    
    // Optional: Hide bottom content while searching to reduce clutter
    // allContentSection.style.display = 'none'; 

    if (filteredNotes.length > 0) {
        noResultsSection.style.display = 'none';
        searchResultsContainer.style.display = 'flex'; // Flex is needed for slider
        viewAllLink.style.display = 'none'; 

        // REQUIREMENT: Preview Top 3 Results
        const top3Notes = filteredNotes.slice(0, 3);
        
        // Reset container to slider mode
        searchResultsContainer.className = 'search-slider-container';
        renderNotesPreview(top3Notes, 'searchResultsContainer', true);

        // REQUIREMENT: "View All" link if more than 3
        if (filteredNotes.length > 3) {
            viewAllLink.style.display = 'inline-block';
            viewAllLink.textContent = `View All ${filteredNotes.length} Results →`;
            
            // Handle "View All" click
            viewAllLink.onclick = function(e) {
                e.preventDefault();
                // Change layout to grid to show everything
                searchResultsContainer.className = 'notes-grid'; 
                renderNotesPreview(filteredNotes, 'searchResultsContainer', false);
                viewAllLink.style.display = 'none'; 
            };
        }

    } else {
        // No results found
        searchResultsContainer.innerHTML = '';
        viewAllLink.style.display = 'none';
        noResultsSection.style.display = 'block';
    }
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load Recent Notes
    const notes = window.learningNotesData || [];
    renderNotesPreview(notes, 'recentNotesContainer');

    // 2. Load Dev Log (Restored content)
    // We limit main page dev logs to top 4 to avoid too much scrolling
    const devLogs = window.devLogData || [];
    const recentDevLogs = devLogs.slice(0, 4); 
    renderNotesPreview(recentDevLogs, 'latestDevLogContainer');

    // 3. Bind Search Events
    const searchInput = document.getElementById('notesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchLearningNotes);
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#8e44ad';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#dee2e6';
        });
    }
});
