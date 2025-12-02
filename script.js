/**
 * Renders note cards into a container element.
 * @param {Array} notesData - Array of note objects (e.g., [{title, content, date, link, tags}]).
 * @param {string} containerId - The ID of the target HTML element container.
 * @param {boolean} isSlider - (UNUSED for this specific fix) Flag for slider styling.
 */

/**
 * Renders dev log in simple format (similar to Project Updates)
 */
function renderDevLogSimple(logsData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    if (!logsData || logsData.length === 0) {
        container.innerHTML = '<div style="color:#999; padding:10px;">No entries available</div>';
        return;
    }

    logsData.forEach(log => {
        const entry = document.createElement('div');
        entry.className = 'latest-entry-box';
        
        entry.innerHTML = `
            <div class="latest-entry-header">${log.date}</div>
            <div class="latest-entry-body">
                <div style="color: #8a8a8a; font-size: 0.85em; line-height: 1.4;">
                    • <strong>${log.title}</strong><br>
                    ${log.content}
                </div>
            </div>
        `;
        
        container.appendChild(entry);
    });
}
function renderNotesPreview(notesData, containerId, isSlider = false) {
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if container not found

    container.innerHTML = ''; // Clear existing content
    
    // Handle empty data
    if (!notesData || notesData.length === 0) {
        // Only display 'No content' if not the search results container
        if(containerId !== 'searchResultsContainer') {
             container.innerHTML = '<div style="color:#999; padding:20px;">No content available</div>';
        }
        return;
    }

    notesData.forEach(note => {
        const card = document.createElement('a');
        card.href = note.link || '#';
        // Ensure the card uses the correct class for vertical stacking within the scroll area.
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
 * Handles clicks on tags to populate the search box and trigger a search.
 * @param {Event} event - The click event object.
 * @param {string} tagName - The name of the tag to search for.
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
        // Scroll user to search box and focus
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchInput.focus();
    }
}

/**
 * Main Search Logic for Learning Notes Card: 
 * Switches between the Recent Notes view and Search Results view based on query input.
 */
function searchLearningNotes() {
    const searchInput = document.getElementById('notesSearchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    // Get the display areas
    const recentNotesArea = document.getElementById('recentNotesArea');
    const searchResultsArea = document.getElementById('searchResultsArea');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const noResultsSection = document.getElementById('noSearchResults');
    const resultCountSpan = document.getElementById('resultCount');

    // 1. If the query is empty, show Recent Notes area and hide Search Results area (restore normal state)
    if (!query) {
        recentNotesArea.style.display = 'block'; // Restore original view
        searchResultsArea.style.display = 'none'; // Hide search results view
        return;
    }

    // 2. Filter the data
    const allNotes = window.learningNotesData || [];
    const filteredNotes = allNotes.filter(note => {
        const titleMatch = (note.title || '').toLowerCase().includes(query);
        const contentMatch = (note.content || '').toLowerCase().includes(query);
        const tagsMatch = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
        return titleMatch || contentMatch || tagsMatch;
    });

    // 3. Enter search state: Hide Recent Notes area, show Search Results area
    recentNotesArea.style.display = 'none';
    searchResultsArea.style.display = 'block';

    if (filteredNotes.length > 0) {
        // Show search results
        noResultsSection.style.display = 'none';
        resultCountSpan.textContent = `(${filteredNotes.length} results)`;
        
        // Render all results as a vertical, scrollable list
        renderNotesPreview(filteredNotes, 'searchResultsContainer', false);
        
    } else {
        // No results found
        searchResultsContainer.innerHTML = '';
        noResultsSection.style.display = 'block';
        resultCountSpan.textContent = `(0 results)`;
    }
}


// Initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load Recent Notes (Limit to Top 3 only)
    const notes = window.learningNotesData || [];
    // Limit to display only the top 3 notes
    const recentNotes = notes.slice(0, 3);
    // Render to Recent Notes container, which uses the notes-scroll-area style
    renderNotesPreview(recentNotes, 'recentNotesContainer', false);

    // 2. Load Dev Log (Original logic maintained, limited to 4)
    const devLogs = window.devLogData || [];
    const recentDevLogs = devLogs.slice(0, 2); 
    renderNotesPreview(recentDevLogs, 'latestDevLogContainer');

    // 3. Bind Search Events
    const searchInput = document.getElementById('notesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchLearningNotes);
        
        // Fix: Set the focus color to the CSS variable to match the theme
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent-color)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#dee2e6'; // Restore to the default border color
        });
    }
});
