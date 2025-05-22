import asyncio
from agno.agent import Agent
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.models.google import Gemini
from agno.models.groq import Groq
from agno.tools.yfinance import YFinanceTools

GOOGLE_API_KEY = 'your_api_key_here_team_finq'
gomodel=Gemini(id="gemini-2.0-flash",api_key=GOOGLE_API_KEY)  
model = Groq(id="llama-3.3-70b-versatile", api_key='your_key')

def finance_chatbot(query: str):

    financial_chatbot = Agent(
        name="Financial Chatbot",
        role="Provide financial news, market trends, real-time stock data, and analyst recommendations.",
        model=model,
        tools=[
            DuckDuckGoTools(),
            YFinanceTools(
                enable_all=True
            )
        ],
        instructions=[
            "Use DuckDuckGo for the latest financial news and market trends.",
            "Utilize YFinance for real-time stock data and analyst recommendations.",
            "Always include sources and citations in your responses.",
            "Format financial data using tables for clarity.",
            "use emojis and format overall response"
        ],
        show_tool_calls=True,
        markdown=True,
        add_history_to_messages=True,
        read_chat_history=True
    )


    res = financial_chatbot.run(f" {query}")
    return res.content
