
import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = 'd:/Pet_Projects/astro-portfolio/src/content/projects';

const CATEGORIES = {
    "Vue": [
        "adamhall", "wortmann", "fishersports",
        "armedangels", "eterna", "babyone"
    ],
    "React": [
        "healthcare", "expensetracker", "nextfood", "tanevents", "placepicker",
        "feedback", "countdown", "food", "context", "restore"
    ],
    "Python": [
        "jobdata", "healthcare", "jobscraper", "jobdash", "moviedata"
    ]
};

function getTags(filename) {
    const basename = path.basename(filename, '.md');
    const tags = new Set();
    for (const [cat, projects] of Object.entries(CATEGORIES)) {
        if (projects.includes(basename)) {
            tags.add(cat);
        }
    }
    return Array.from(tags);
}

function processFile(filename) {
    const filepath = path.join(PROJECTS_DIR, filename);
    let content = fs.readFileSync(filepath, 'utf-8');

    // Extract Title
    // Format: # [Projects](/portfolio/) | Adam Hall ([Link]...)
    const titleMatch = content.match(/^#.*?\|\s*(.*?)\s*(\(\[Link\]|$)/m);
    let title = titleMatch ? titleMatch[1].trim() : path.basename(filename, '.md');
    
    // Clean up title if it contains extra markdown link syntax that wasn't caught
    title = title.replace(/\[|\]/g, '');

    // Extract Image
    const imgMatch = content.match(/(?:<img src="|!\[.*?\]\()(\.\.\/)?images\/(.*?)(?:"|\))/);
    let imagePath = "";
    if (imgMatch) {
        imagePath = `/images/${imgMatch[2]}`;
    }

    const tags = getTags(filename);

    // Remove the H1 title line
    const newContent = content.replace(/^#.*?\n/, '').trim();

    const frontmatter = `---
title: "${title}"
tags: ${JSON.stringify(tags)}
image: "${imagePath}"
weight: 0
---

`;

    fs.writeFileSync(filepath, frontmatter + newContent, 'utf-8');
    console.log(`Processed ${filename}: Title='${title}', Tags=[${tags}], Image='${imagePath}'`);
}

const files = fs.readdirSync(PROJECTS_DIR);
files.forEach(filename => {
    if (filename.endsWith('.md')) {
        processFile(filename);
    }
});
