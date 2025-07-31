// chat.js

let faq = [];
let vocab = [];
let idf = {};
let tfidfMatrix = [];

// Utility: tokenize and normalize
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

// Build TF-IDF on the FAQ questions
async function setupFaq() {
  const res = await fetch('faq.json');
  faq = await res.json();
  const docs = faq.map(item => tokenize(item.question));
  
  // Build vocabulary
  docs.forEach(tokens => {
    tokens.forEach(t => {
      if (!vocab.includes(t)) vocab.push(t);
    });
  });

  // Compute IDF
  vocab.forEach(term => {
    const df = docs.reduce((count, doc) => count + (doc.includes(term) ? 1 : 0), 0);
    idf[term] = Math.log((docs.length + 1) / (df + 1)) + 1;
  });

  // Build TF-IDF matrix
  tfidfMatrix = docs.map(tokens => {
    const tf = {};
    tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
    const vec = vocab.map(term => (tf[term] || 0) * idf[term]);
    const norm = Math.hypot(...vec);
    return vec.map(v => (norm ? v / norm : 0));
  });
}

// Cosine similarity
function cosineSimilarity(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

// Find best FAQ match
function getBestAnswer(query
