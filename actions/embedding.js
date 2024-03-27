"use server";
import OpenAI from "openai";

const resource = "aoaicopilot";
const apiVersion = "2024-02-15-preview";
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const embeddingModel = process.env["AZURE_EMBEDDING_MODEL"];

const openai = new OpenAI({
  apiKey,
  baseURL: `https://${resource}.openai.azure.com/openai/deployments/${embeddingModel}`,
  defaultQuery: { "api-version": apiVersion },
  defaultHeaders: { "api-key": apiKey },
});

export async function embed(content) {
  const result = await openai.embeddings.create({
    input: content,
  });

  return result.data[0].embedding;
}
