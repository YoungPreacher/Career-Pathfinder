import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any  
from services.pinecone_service import PineconeService       
from fastapi.responses import JSONResponse

class SearchResult(BaseModel):
    job_title: str
    text: str

app = FastAPI()

#use a diffferent api key and host url for production
pine = PineconeService(api_key="pck", host_url="https://career-index-szusshi.svc.aped-4627-b74a.pinecone.io")

@app.on_event("startup")
async def startup_event():
    print("Starting up...")

@app.get("/search")
def search(query: str):
    results = pine.search(query)
    return JSONResponse(content=results)


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=3000, reload=True)


