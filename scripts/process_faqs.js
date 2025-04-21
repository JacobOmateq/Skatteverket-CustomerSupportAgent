const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function fetchAndProcessFAQ(url) {
  try {
    console.log(`Fetching content from ${url}...`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract the main content
    const title = $('h1').first().text().trim();
    const content = $('.sv-text-portlet-content').text().trim();
    
    if (!content) {
      console.warn(`No content found for ${url}`);
      return [];
    }
    
    // Create chunks for better embedding
    const chunks = content
      .split(/\n+/)
      .filter(chunk => chunk.trim().length > 0)
      .map(chunk => chunk.trim());
    
    console.log(`Processing ${chunks.length} chunks from ${url}...`);
    
    // Create embeddings for each chunk
    const embeddings = await Promise.all(
      chunks.map(async (chunk) => {
        try {
          const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: chunk,
            encoding_format: "float"
          });
          
          return {
            text: chunk,
            embedding: embedding.data[0].embedding,
            source: url,
            title: title
          };
        } catch (error) {
          console.error(`Error creating embedding for chunk: ${error.message}`);
          return null;
        }
      })
    );
    
    return embeddings.filter(embedding => embedding !== null);
  } catch (error) {
    console.error(`Error processing ${url}:`, error.message);
    return [];
  }
}

async function processAllFAQs() {
  try {
    const faqLinks = fs.readFileSync('vanliga_fragor.md', 'utf-8')
      .split('\n')
      .filter(line => line.startsWith('http'));
    
    console.log(`Found ${faqLinks.length} FAQ links to process`);
    
    const allEmbeddings = [];
    let processedCount = 0;
    
    for (const url of faqLinks) {
      console.log(`\nProcessing ${processedCount + 1}/${faqLinks.length}: ${url}`);
      const embeddings = await fetchAndProcessFAQ(url);
      allEmbeddings.push(...embeddings);
      processedCount++;
      
      // Save progress after each URL
      const progressPath = path.join(dataDir, 'faq_embeddings_progress.json');
      fs.writeFileSync(
        progressPath,
        JSON.stringify(allEmbeddings, null, 2)
      );
    }
    
    // Save final embeddings
    const finalPath = path.join(dataDir, 'faq_embeddings.json');
    fs.writeFileSync(
      finalPath,
      JSON.stringify(allEmbeddings, null, 2)
    );
    
    console.log(`\nProcessing complete!`);
    console.log(`Total chunks processed: ${allEmbeddings.length}`);
    console.log(`Embeddings saved to: ${finalPath}`);
  } catch (error) {
    console.error('Error in processAllFAQs:', error);
    process.exit(1);
  }
}

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  console.log('Please set your OpenAI API key in the .env file:');
  console.log('OPENAI_API_KEY=your_api_key_here');
  process.exit(1);
}

processAllFAQs().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 