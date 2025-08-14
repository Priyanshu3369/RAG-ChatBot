from pydantic import BaseModel
from typing import Optional

class PDFUploadResponse(BaseModel):
    doc_id: str
    filename: str
    size_kb: float
    message: str
