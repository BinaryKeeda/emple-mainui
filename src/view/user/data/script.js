import fs from 'fs'
import { p } from './problems.js';
const data = p
// Your original JSON data
// Function to convert topic name to slug
function generateSlug(topicName) {
  return topicName
    .toLowerCase()
    .replace(/\s+/g, '-')        // replace spaces with -
    .replace(/[()&]/g, '')       // remove special characters
    .replace(/-+/g, '-');        // collapse multiple dashes
}

// Add slug to each topic
data.forEach(topic => {
  topic.slug = generateSlug(topic.topicName);
  topic.problems.map(item => (
    item.slug = generateSlug(item?.title || 'NA')
  ))
});




// Save updated JSON to file
fs.writeFileSync('problems-with-slugs.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('✅ Slugs added and saved to problems-with-slugs.json');
