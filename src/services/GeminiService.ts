
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: string = "gemini-1.5-flash";
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }
  
  async generateResponse(prompt: string): Promise<string> {
    try {
      // Add a financial advisor system prompt
      const financialContext = 
        "You are an AI Financial Advisor specializing in personal finance, investments, " +
        "and financial planning. Provide helpful, accurate, and ethical financial advice. " +
        "Focus on educational content rather than specific investment recommendations. " +
        "When uncertain, acknowledge limitations and suggest consulting professional advisors. " +
        "Always prioritize the user's financial well-being.";
      
      // Combine the system prompt with the user's query
      const combinedPrompt = `${financialContext}\n\nUser query: ${prompt}`;
      
      // Get the generative model
      const model = this.genAI.getGenerativeModel({ model: this.model });
      
      // Generate content
      const result = await model.generateContent(combinedPrompt);
      const response = result.response;
      
      return response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      throw new Error("Failed to generate response");
    }
  }
}
