import problemsMeta from '../data/problems-meta.json'; // Adjust path accordingly

/**
 * Converts "max-sum-subarray" => "Max Sum Subarray"
 */
function humanizeSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get problem metadata by slug.
 * If not found, return fallback using humanized slug.
 */
export function getProblemMeta(slug) {
  const meta = problemsMeta.find(p => p.slug === slug);

  if (meta) return meta;

  const fallbackTitle = humanizeSlug(slug);
  return {
    title: fallbackTitle,
    description: `Solve the problem "${fallbackTitle}" on BinaryKeeda – a platform to sharpen your DSA skills.`
  };
}
