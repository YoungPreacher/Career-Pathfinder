from pinecone import Pinecone
import sys
import os
from pydantic import BaseModel
from typing import List

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Initialize Pinecone
pc = Pinecone(api_key="pcsk_58XvpF_RVdP5PfRrHDd8apxTU5gXjpn6i1diqdLvmPZwXXd2KgUAS2w62CNYZ31cdWL8Ek")
index_name = "career-index"
host_url = "https://career-index-szusshi.svc.aped-4627-b74a.pinecone.io"

index = pc.Index(host=host_url)

# --------------------
# Pydantic Models
# --------------------
class Fields(BaseModel):
    job_title: str
    text: str


class SearchResult(BaseModel):
    _id: str
    _score: float
    fields: Fields


# --------------------
# Perform Search
# --------------------
raw_results = index.search(
    namespace=index_name,
    query={
        "inputs": {"text": "hard working"},
        "top_k": 3
    },
    fields=["text", "job_title"]
)

# Parse with Pydantic
# hits = raw_results.result.hits

# # Print nicely formatted results
# for hit in hits:
#     print(hit)

class PineconeService:
    def __init__(self, api_key: str, host_url: str):
        self.pc = Pinecone(api_key=api_key)
        self.index_name = "career-index"
        self.host_url = host_url
        self.index = self.pc.Index(host=self.host_url)

    def search(self, query):
        results = self.index.search(
            namespace=self.index_name,  
            query={
                "inputs": {"text": query},
                "top_k": 3
            },
            fields=["text", "job_title"]
        )
        return results

    def upsert_records(self, records):
        self.index.upsert_records(self.index_name, records)

    def batch_upsert(self, records):
        BATCH_SIZE = 96
        for i in range(0, len(records), BATCH_SIZE):
            batch = records[i:i + BATCH_SIZE]
            self.index.upsert_records(self.index_name, batch)

    def upsert_batch(self, records):
        self.index.upsert_records(self.index_name, records)

    def search(self, query):
        results = self.index.search(
            namespace=self.index_name,  
            query={
                "inputs": {"text": query},
                "top_k": 3
            },  
            fields=["text", "job_title"]
        )
        final_response = []
        for hit in results.result.hits:
            final_response.append({
                "job_title": hit['fields']["job_title"],
                "text": hit['fields']["text"]
            })
        return final_response





