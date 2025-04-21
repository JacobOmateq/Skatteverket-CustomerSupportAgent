const RAGService = require('../services/ragService');

async function testRAG() {
  try {
    const ragService = new RAGService();
    
    // Test questions in Swedish
    const testQuestions = [
      "Hur gör jag en deklaration?",
      "Vad är personnummer?",
      "Hur flyttar jag folkbokföringen?",
      "Vad är en sink?",
      "Hur får jag mitt lagenhetsnummer?"
    ];

    console.log("Testing RAG implementation...\n");

    for (const question of testQuestions) {
      console.log(`Question: ${question}`);
      const response = await ragService.generateResponse(question);
      
      console.log("\nAnswer:");
      console.log(response.answer);
      console.log("\nSources:");
      response.sources.forEach(source => {
        console.log(`- ${source.title}`);
        console.log(`  URL: ${source.url}`);
      });
      console.log("\n" + "-".repeat(80) + "\n");
    }

  } catch (error) {
    console.error("Error in test:", error);
  }
}

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  console.log('Please set your OpenAI API key in the .env file:');
  console.log('OPENAI_API_KEY=your_api_key_here');
  process.exit(1);
}

testRAG(); 