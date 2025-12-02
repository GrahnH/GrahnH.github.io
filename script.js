/**
 * Render note cards into a container
 * @param {Array} notesData - Array of note objects
 * @param {string} containerId - Target HTML element ID
 * @param {boolean} isSlider - If true, applies styling for horizontal slider
 */
/**
 * Render note cards into a container
 * @param {Array} notesData - Array of note objects
 * @param {string} containerId - Target HTML element ID
 * @param {boolean} isSlider - (UNUSED for this specific fix)
 */
function renderNotesPreview(notesData, containerId, isSlider = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
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
        // 修正：确保卡片不再使用原有的 grid 样式，以便在滚动区域内垂直堆叠
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
 * Main Search Logic for Learning Notes Card: 
 * Switches between Recent Notes view and Search Results view.
 */
function searchLearningNotes() {
    const searchInput = document.getElementById('notesSearchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    const recentNotesArea = document.getElementById('recentNotesArea');
    const searchResultsArea = document.getElementById('searchResultsArea');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const noResultsSection = document.getElementById('noSearchResults');
    const resultCountSpan = document.getElementById('resultCount');

    
    if (!query) {
        recentNotesArea.style.display = 'block';
        searchResultsArea.style.display = 'none';
        return;
    }

    const allNotes = window.learningNotesData || [];
    const filteredNotes = allNotes.filter(note => {
        const titleMatch = (note.title || '').toLowerCase().includes(query);
        const contentMatch = (note.content || '').toLowerCase().includes(query);
        const tagsMatch = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
        return titleMatch || contentMatch || tagsMatch;
    });


    recentNotesArea.style.display = 'none';
    searchResultsArea.style.display = 'block';

    if (filteredNotes.length > 0) {
        noResultsSection.style.display = 'none';
        resultCountSpan.textContent = `(${filteredNotes.length} results)`;
        
        renderNotesPreview(filteredNotes, 'searchResultsContainer', false);
        
    } else {
        searchResultsContainer.innerHTML = '';
        noResultsSection.style.display = 'block';
        resultCountSpan.textContent = `(0 results)`;
    }
}


// Initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Load Recent Notes (Top 3 only)
    const notes = window.learningNotesData || [];
   
    const recentNotes = notes.slice(0, 3);
    
    renderNotesPreview(recentNotes, 'recentNotesContainer', false);

    // 2. Load Dev Log (Original logic maintained)
    const devLogs = window.devLogData || [];
    const recentDevLogs = devLogs.slice(0, 4); 
    renderNotesPreview(recentDevLogs, 'latestDevLogContainer');

    // 3. Bind Search Events
    const searchInput = document.getElementById('notesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchLearningNotes);
        
       
        searchInput.addEventListener('focus', function() {
           
            this.style.borderColor = 'var(--accent-color)';
        });
        
        searchInput.addEventListener('blur', function() {
           
            this.style.borderColor = '#dee2e6';
        });
    }
});

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

