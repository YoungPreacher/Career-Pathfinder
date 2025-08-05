from pydantic import BaseModel
from typing import Dict, Any

class Doc(BaseModel):
    _id: str
    chunk_text: str
    requirements: str
    job_title: str

