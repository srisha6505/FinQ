import asyncio
from agno.agent import Agent
from agno.tools.firecrawl import FirecrawlTools
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.models.google import Gemini
from agno.models.groq import Groq
from agno.team.team import Team
from typing import List
from rich.pretty import pprint
from pydantic import BaseModel, Field

# GOOGLE_API_KEY = 'your api'
# gomodel=Gemini(id="gemini-1.5-flash",api_key=GOOGLE_API_KEY)  

model = Groq(id="llama-3.3-70b-versatile", api_key='your_api_key')


class SentimentAnalysisResult(BaseModel):
    sentiment: str = Field(..., description="Sentiment classification: Bullish, Bearish, or Neutral.")
    reason: str = Field(..., description="Explanation for the sentiment classification.")

def get_sentiment_agent(url):


    sentimentAgent = Agent(tools=[FirecrawlTools(scrape=True, crawl=False,api_key='fc-70da2949be1b4009826a077998d71fdc')],
                    description="You are a Sentiment ANalyzer. You will be given a URL to a news article. Your task is to analyze the sentiment of the article and classify it as Bullish, Bearish, or Neutral. Provide a brief explanation for your classification.",
                    instructions=[
                        "Extract the text from the page and analyze sentiment",
                        "Make sure to remove any unnecessary information, such as ads or navigation links.",
                        "Format your response using markdown."
                    ],
                    response_model=SentimentAnalysisResult,
                    structured_outputs=True,
                    model=model, show_tool_calls=True)


    res = sentimentAgent.run(f" {url}")
    return res.content

