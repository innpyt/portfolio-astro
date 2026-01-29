
import os
import re

PROJECTS_DIR = r"d:\Pet_Projects\astro-portfolio\src\content\projects"

CATEGORIES = {
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
}

def get_tags(filename):
    basename = os.path.splitext(filename)[0]
    tags = []
    for cat, projects in CATEGORIES.items():
        if basename in projects:
            tags.append(cat)
    return tags

def process_file(filename):
    filepath = os.path.join(PROJECTS_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract Title
    # Format: # [Projects](/portfolio/) | Adam Hall ([Link]...)
    title_match = re.search(r'^#.*?\|\s*(.*?)\s*(\(\[Link\]|$)', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else filename.replace(".md", "").title()

    # Extract Image
    # Look for <img src="../images/..." /> or classic markdown ![...](...)
    # We need to adjust path from ../images/ to /images/
    img_match = re.search(r'(?:<img src="|!\[.*?\]\()(\.\./)?images/(.*?)(?:"|\))', content)
    image_path = ""
    if img_match: 
        # img_match.group(2) is the path after images/
        image_path = f"/images/{img_match.group(2)}"
    
    tags = get_tags(filename)
    
    # Remove the H1 title line as it's now in frontmatter
    new_content = re.sub(r'^#.*?\n', '', content, count=1).strip()

    frontmatter = f"""---
title: "{title}"
tags: {tags}
image: "{image_path}"
weight: 0
---

"""
    
    final_content = frontmatter + new_content
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(final_content)
    
    print(f"Processed {filename}: Title='{title}', Tags={tags}, Image='{image_path}'")

for filename in os.listdir(PROJECTS_DIR):
    if filename.endswith(".md"):
        process_file(filename)
