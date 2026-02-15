
import type { CollectionEntry } from 'astro:content';

const PRIORITY_ORDER: Record<string, number> = {
  'Vue': 1,
  'React': 2,
  'Python': 3
};

const getCategoryPriority = (tags: string[]) => {
  if (tags.includes('Vue')) return 1;
  if (tags.includes('React')) return 2;
  if (tags.includes('Python')) return 3;
  return 4;
};

export function sortProjectsHome(projects: CollectionEntry<'projects'>[]) {
  return projects.sort((a, b) => {
    // 1. Highlight (High priority first)
    if (a.data.highlight && !b.data.highlight) return -1;
    if (!a.data.highlight && b.data.highlight) return 1;

    // 2. Category Priority (Lower number first: 1..2..3..4)
    const prioA = getCategoryPriority(a.data.tags);
    const prioB = getCategoryPriority(b.data.tags);
    if (prioA !== prioB) {
      return prioA - prioB;
    }

    // 3. Weight (Higher weight first)
    if (a.data.weight !== b.data.weight) {
      return b.data.weight - a.data.weight;
    }

    // 4. Fallback (Title Alphabetical)
    return a.data.title.localeCompare(b.data.title);
  });
}

export function sortProjectsSidebar(projects: CollectionEntry<'projects'>[]) {
  return projects.sort((a, b) => {
    // 1. Highlight (High priority first)
    if (a.data.highlight && !b.data.highlight) return -1;
    if (!a.data.highlight && b.data.highlight) return 1;

    // 2. Weight (Higher weight first)
    if (a.data.weight !== b.data.weight) {
      return b.data.weight - a.data.weight;
    }

    // 3. Fallback (Title Alphabetical)
    return a.data.title.localeCompare(b.data.title);
  });
}
