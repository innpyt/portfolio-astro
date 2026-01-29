
import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = 'd:/Pet_Projects/astro-portfolio/src/content/projects';

const files = fs.readdirSync(PROJECTS_DIR);

files.forEach(filename => {
    if (filename.endsWith('.md')) {
        const filepath = path.join(PROJECTS_DIR, filename);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // Replace ../images/ with /images/
        const newContent = content.replace(/\.\.\/images\//g, '/images/');
        
        if (content !== newContent) {
            fs.writeFileSync(filepath, newContent, 'utf-8');
            console.log(`Updated paths in ${filename}`);
        }
    }
});
