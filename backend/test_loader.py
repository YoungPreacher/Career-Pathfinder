#!/usr/bin/env python3
"""
Test script for the data loader functionality
"""

import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.data_loaders import load_data_and_return_docs

def test_data_loader():
    """Test the data loader functionality"""
    print("Testing data loader...")
    
    # Test loading data from db.json
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
        return False
    
    return True

if __name__ == "__main__":
    success = test_data_loader()
    if success:
        print("\n🎉 Data loader test passed!")
    else:
        print("\n💥 Data loader test failed!")
        sys.exit(1) 