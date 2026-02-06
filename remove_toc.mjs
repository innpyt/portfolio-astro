
import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = 'd:/Pet_Projects/astro-portfolio/src/content/projects';

const files = fs.readdirSync(PROJECTS_DIR);

files.forEach(filename => {
    if (filename.endsWith('.md')) {
        const filepath = path.join(PROJECTS_DIR, filename);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // Remove "Table of Contents" block
        // Pattern: > ?## Table of Contents ... (until next --- or ## or end)
        // Or sometimes it's just >## Table of Contents
        // And the following lines >- ...
        
        // Regex to match the block. 
        // > ?## Table of Contents\n(>.*?\n)*
        
        const newContent = content.replace(/> ?## Table of Contents\s*(\n>.*)+/g, '');
        
        if (content !== newContent) {
            fs.writeFileSync(filepath, newContent.trim() + '\n', 'utf-8');
            console.log(`Removed TOC from ${filename}`);
        }
    }
});
