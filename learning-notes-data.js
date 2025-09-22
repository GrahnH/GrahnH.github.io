// learning-notes-data.js


const learningNotesData = [
    {
        id: 1,
        date: "2025-09-20",
        title: "Advanced R Programming",
        content: "Functional programming with purrr, data manipulation, custom functions with proper error handling",
        link: "#",
        tags: ["R", "Programming", "Data Science"]
    },
    {
        id: 2,
        date: "2025-09-19",
        title: "Statistical Modeling",
        content: "Model validation, cross-validation, overfitting prevention, interpreting model diagnostics",
        link: "#",
        tags: ["Statistics", "Modeling", "Machine Learning"]
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
