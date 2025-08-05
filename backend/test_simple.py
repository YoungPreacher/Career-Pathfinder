#!/usr/bin/env python3
"""
Simple test for data loading functionality
"""

import json
import uuid
from typing import List

# Define the Doc model inline to avoid import issues
class Doc:
    def __init__(self, id: str, text: str, metadata: dict):
        self.id = id
        self.text = text
        self.metadata = metadata

def load_data_and_return_docs(file_path: str) -> List[Doc]:
    """
    Load job data from JSON file and transform it into Doc objects.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

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
        
        print(f"Successfully loaded {len(docs)} documents from {file_path}")
        return docs
        
    except FileNotFoundError:
        print(f"Error: File {file_path} not found")
        return []
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in {file_path}: {e}")
        return []
    except Exception as e:
        print(f"Error loading data from {file_path}: {e}")
        return []

if __name__ == "__main__":
    print("Testing data loader...")
    docs = load_data_and_return_docs("./services/db.json")
    
    if docs:
        print(f"✅ Successfully loaded {len(docs)} documents")
        
        # Show first few documents as examples
        print("\n📋 Sample documents:")
        for i, doc in enumerate(docs[:3]):
            print(f"\nDocument {i+1}:")
            print(f"  ID: {doc.id}")
            print(f"  Text: {doc.text[:100]}...")
            print(f"  Metadata: {doc.metadata}")
    else:
        print("❌ No documents loaded") 