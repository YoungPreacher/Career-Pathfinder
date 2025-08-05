#load the data from the json file
import json
import uuid
from typing import List

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.doc_model import Doc
from services.const import all_jobs
from services.pinecone_service import upsert_doc, upsert_docs_batch

def load_data_and_return_docs() -> List[Doc]:
    """
    Load job data and transform it into Doc objects.
    
    Returns:
        List of Doc objects with transformed data
    """
    try:
        data = all_jobs

        docs = []
        for item in data:
            # Create a unique ID for each document
            doc_id = str(uuid.uuid4())
            
            # Combine job title and requirements into text field
            text = f"Job Title: {item.get('job_title', 'Unknown')}\nRequirements: {item.get('requirements', 'No requirements specified')}"
            
            # Store original data in metadata
            metadata = {
                'job_title': item.get('job_title', ''),
                'requirements': item.get('requirements', ''),
                'source': 'career_pathfinder_db'
            }
            
            doc = Doc(id=doc_id, text=text, metadata=metadata)
            docs.append(doc)
        
        print(f"Successfully loaded {len(docs)} documents")
        return docs
        
    except Exception as e:
        print(f"Error loading data: {e}")
        return []

def upload_docs_to_pinecone():
    """Upload all documents to Pinecone"""
    try:
        # Load documents
        docs = load_data_and_return_docs()
        
        if not docs:
            print("No documents to upload")
            return
        
        # Convert to dictionaries for Pinecone
        json_docs = [doc.model_dump() for doc in docs]
        
        print(f"Uploading {len(json_docs)} documents to Pinecone...")
        
        # Upload in batches for better performance
        upsert_docs_batch(json_docs, batch_size=50)
        
        print("✅ Successfully uploaded all documents to Pinecone!")
        
    except Exception as e:
        print(f"Error uploading docs to Pinecone: {e}")

if __name__ == "__main__":
    # Run the upload when script is executed directly
    upload_docs_to_pinecone()


