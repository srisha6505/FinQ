from fastapi import APIRouter, Cookie, File, UploadFile, HTTPException,Request
from .helper import finance_chatbot
from app.api.middlewares import authUser
from typing import List
import os
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/chat")
async def sentiment(query: str):
    try:
        result = finance_chatbot(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))