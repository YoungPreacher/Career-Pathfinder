#!/usr/bin/env python3
"""
Test script for Pinecone upload functionality
"""

import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_pinecone_upload():
    """Test the Pinecone upload functionality"""
    try:
        print("Testing Pinecone upload...")
        
        # Import and run the upload function
        from services.data_loaders import upload_docs_to_pinecone
        
        upload_docs_to_pinecone()
        
        print("✅ Pinecone upload test completed!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"❌ Error during test: {e}")
        return False

if __name__ == "__main__":
    success = test_pinecone_upload()
    if not success:
        sys.exit(1) 