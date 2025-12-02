// dev-log-data.js
// Development log entries data

const devLogData = [
    {
        id: 1,
        date: "2025-09-18",
        title: "Documentation Setup",
        content: "• Set up GitHub Pages documentation center\n• Added TrendTestR package documentation\n• Implemented scrollable development log",
        link: "dev-log.html",
        tags: ["Documentation", "GitHub Pages"]
    },
    {
        id: 2,
        date: "2025-09-02",
        title: "CRAN Publication",
        content: "• trendtestR on CRAN",
        link: "dev-log.html",
        tags: ["R Package", "CRAN", "Release"]
    },
    {
        id: 3,
        date: "2025-08-16",
        title: "Package Finalization",
        content: "• Packaged trendtestR\n• Passed CRAN-ready checks and rhub multi-platform validation\n• Completed unit testing",
        link: "dev-log.html",
        tags: ["R Package", "Testing", "CRAN"]
    },
    {
        id: 4,
        date: "2025-08-02",
        title: "Core Functions Complete",
        content: "• Finished the explore-series functions of trendtestR\n• Explore modeling functions of trendtestR evaluated and MVP finalized\n• Implemented data type inference and routing logic of trendtestR",
        link: "dev-log.html",
        tags: ["Development", "Features"]
    },
    {
        id: 5,
        date: "2025-07-10",
        title: "Package Structure",
        content: "• Completed core functions, migrated to R package structure, and finalized documentation of trendtestR",
        link: "dev-log.html",
        tags: ["Development", "Documentation"]
    },
    {
        id: 6,
        date: "2025-07-01",
        title: "Project Initiation",
        content: "• Initial workflow established of trendtestR",
        link: "dev-log.html",
        tags: ["Setup", "Planning"]
    }
];

// Make data available globally
if (typeof window !== 'undefined') {
    window.devLogData = devLogData;
}
