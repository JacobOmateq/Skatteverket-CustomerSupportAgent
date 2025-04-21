const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const math = require('mathjs');

class RAGService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.embeddings = this.loadEmbeddings();
  }

  loadEmbeddings() {
    try {
      const embeddingsPath = path.join(__dirname, '../data/faq_embeddings.json');
      return JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));
    } catch (error) {
      console.error('Error loading embeddings:', error);
      return [];
    }
  }

  async getEmbedding(text) {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float"
    });
    return response.data[0].embedding;
  }

  cosineSimilarity(a, b) {
    const dotProduct = math.dot(a, b);
    const magnitudeA = math.sqrt(math.dot(a, a));
    const magnitudeB = math.sqrt(math.dot(b, b));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async search(query, topK = 3) {
    const queryEmbedding = await this.getEmbedding(query);
    
    // Calculate similarity scores
    const results = this.embeddings.map(item => ({
      ...item,
      similarity: this.cosineSimilarity(queryEmbedding, item.embedding)
    }));

    // Sort by similarity and get top K results
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  async generateResponse(query) {
    const relevantDocs = await this.search(query);
    
    // Create context from relevant documents
    const context = relevantDocs
      .map(doc => `Source: ${doc.title}\nContent: ${doc.text}`)
      .join('\n\n');

    // Generate response using GPT
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for Skatteverket (Swedish Tax Agency). 
          Use the provided context to answer questions accurately and professionally.
          If you're unsure, say so and suggest contacting Skatteverket directly.`
        },
        {
          role: "user",
          content: `Context: ${context}\n\nQuestion: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      answer: response.choices[0].message.content,
      sources: relevantDocs.map(doc => ({
        title: doc.title,
        url: doc.source
      }))
    };
  }
}

module.exports = RAGService; 