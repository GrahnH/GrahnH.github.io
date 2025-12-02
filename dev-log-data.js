// dev-log-data.js
// Development log entries data

const devLogData = [
    {
    id: 7,
    date: "2025-12-02",
    title: "Frontend Refactor & UI Improvements",
    content: "Split index page into separate JS/CSS files, updated the search function, implemented dark mode, and refined several AI-generated UI components.",
    link: "dev-log.html",
    tags: ["Frontend", "Refactor", "Search", "Dark Mode"]
    },

    {
        id: 1,
        date: "2025-09-18",
        title: "Documentation Setup",
        content: "Set up GitHub Pages documentation center with TrendTestR package docs",
        link: "dev-log.html",
        tags: ["Documentation", "GitHub Pages"]
    },
    {
        id: 2,
        date: "2025-09-02",
        title: "CRAN Publication",
        content: "trendtestR successfully published on CRAN",
        link: "dev-log.html",
        tags: ["R Package", "CRAN", "Release"]
    },
    {
        id: 3,
        date: "2025-08-16",
        title: "Package Finalization",
        content: "Passed CRAN-ready checks and completed unit testing",
        link: "dev-log.html",
        tags: ["R Package", "Testing", "CRAN"]
    },
    {
        id: 4,
        date: "2025-08-02",
        title: "Core Functions Complete",
        content: "Finalized MVP with explore-series and modeling functions",
        link: "dev-log.html",
        tags: ["Development", "Features"]
    },
    {
        id: 5,
        date: "2025-07-10",
        title: "Package Structure",
        content: "Migrated to R package structure and finalized documentation",
        link: "dev-log.html",
        tags: ["Development", "Documentation"]
    },
    {
        id: 6,
        date: "2025-07-01",
        title: "Project Initiation",
        content: "Initial workflow established for trendtestR",
        link: "dev-log.html",
        tags: ["Setup", "Planning"]
    }
];

// Make data available globally
if (typeof window !== 'undefined') {
    window.devLogData = devLogData;
}
