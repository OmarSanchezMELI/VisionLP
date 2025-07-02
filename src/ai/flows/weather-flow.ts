'use server';
/**
 * @fileOverview A Genkit flow to get the current weather for a location.
 *
 * - getWeather - A function that fetches weather data.
 * - WeatherInput - The input type for the getWeather function.
 * - WeatherOutput - The return type for the getWeather function.
 */
import {ai} from '@/ai/genkit';
import {getWeatherForLocation} from '@/ai/tools/weather-tool';
import {z} from 'zod';

export const WeatherInputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

export const WeatherOutputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  description: z.string().describe('A brief, friendly description of the current weather in Spanish.'),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

export async function getWeather(input: WeatherInput): Promise<WeatherOutput> {
  return weatherFlow(input);
}

const getWeatherPrompt = ai.definePrompt({
  name: 'getWeatherPrompt',
  input: {schema: WeatherInputSchema},
  output: {schema: WeatherOutputSchema},
  tools: [getWeatherForLocation],
  prompt: `You are a helpful weather assistant.
  Use the getWeatherForLocation tool to find the weather for the user's latitude and longitude.
  Then, output the temperature and description in the required JSON format.
  The description should be in Spanish.`,
});

const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async (input) => {
    const {output} = await getWeatherPrompt(input);
    return output!;
  }
);
