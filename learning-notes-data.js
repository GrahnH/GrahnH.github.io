// learning-notes-data.js


const learningNotesData = [
    {
        id: 1,
        date: "2025-09-28",
        title: "Building R Packages: A Personal Learning Handbook",
        content: "How to Start from the Beginning and Build an R Package in 3 Months",
        link: "learning-notes/devhbEN.html",
        tags: ["R Package", "Programming", "Handbook"]
    },
    {
        id: 2,
        date: "2025-10-01",
        title: "R Plot Collection Part 1.",
        content: "a brief of visualization using the German Mortality Data 2023",
        link: "learning-notes/rplotsample.html",
        tags: ["r", "visualization", "Handbook"]
    },
    {
        id: 3,
        date: "2025-09-18",
        title: "Git Workflow",
        content: "Feature branches, clear commit messages, research project setup, handling large data files",
        link: "#",
        tags: ["Git", "Version Control", "Research"]
    },
    
];

// Make data available globally
if (typeof window !== 'undefined') {
    window.learningNotesData = learningNotesData;
}
