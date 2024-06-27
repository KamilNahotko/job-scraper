import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fetchJobDescription = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const bodyText = await page.evaluate(() => document.body.innerText.trim());
    return bodyText;
  } catch (error) {
    console.error('Error fetching job description:', error);
    throw error;
  } finally {
    await browser.close();
  }
};

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  try {
    const bodyText = await fetchJobDescription(url);

    const prompt = `
    Please analyze the following job description text and extract the key information. Format the extracted data into a JavaScript JSON Object with the following structure:
    {
      salary: {
        netPerMonthB2B: "Net B2B earnings here",
        grossPerMonthPermanent: "Gross permanent earnings here"
      },
      title: "Job title here",
      techStack: [
        "Tech Stack 1 here",
        "Tech Stack 2 here",
        "Tech Stack 3 here",
        "Tech Stack 4 here",
      ],
      requirements: {
        essentialSkills: [
          "Essential skill 1 here",
          "Essential skill 2 here",
          ...
        ],
        niceToHaves: [
          "Nice to have 1 here",
          "Nice to have 2 here",
          ...
        ]
      },
      description: {
        aboutTheRole: "Description of the role here",
        responsibilities: [
          "Responsibility 1 here",
          "Responsibility 2 here",
          ...
        ]
      }
    }

    Here is the job description text:
    ${bodyText}
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: {
        type: 'json_object',
      },
    });

    if (
      !chatCompletion ||
      !chatCompletion.choices ||
      chatCompletion.choices.length === 0
    ) {
      throw new Error('No valid response from OpenAI API');
    }

    const responseContent = chatCompletion.choices[0].message.content;

    return new NextResponse(responseContent, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching from OpenAI API:', error);
    return new NextResponse(
      JSON.stringify({
        message: 'Error communicating with OpenAI API',
        error,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
