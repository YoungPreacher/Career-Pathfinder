import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any  
from services.pinecone_service import PineconeService       
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

class SearchResult(BaseModel):
    job_title: str
    text: str

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Default React port
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3008",
        "http://127.0.0.1:3000",  # Also allow localhost IP
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:3008",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly specify allowed methods
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Accept"
    ],
    expose_headers=["*"],  # Allow the frontend to read all response headers
    max_age=3600,  # Cache preflight requests for 1 hour
)

#use a diffferent api key and host url for production
pine = PineconeService(api_key="pcsk_58XvpF_RVdP5PfRrHDd8apxTU5gXjpn6i1diqdLvmPZwXXd2KgUAS2w62CNYZ31cdWL8Ek", host_url="https://career-index-szusshi.svc.aped-4627-b74a.pinecone.io")

@app.on_event("startup")
async def startup_event():
    print("Starting up...")

@app.get("/search")
def search(query: str):
    try:
        results = pine.search(query)
        print(f"Query received: {query}")
        print(f"Search results: {results}")
        return JSONResponse(content=results)
    except Exception as e:
        print(f"Error in search: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000, reload=True)


