// app/actions/spookyStoryGenerator.ts
import { OpenAI } from "openai";

export async function generateSpookyStory(storyIdea: string) {
  try {
    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I want you to create a 4-sentence short scary story that is whimsical and fun from this idea: ${storyIdea}. If there is any quote (") that could break the line, add a new line character.`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in SpookyStoryGeneratorFromText:", error);
    return null;
  }
}
