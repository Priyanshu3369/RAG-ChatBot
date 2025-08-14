import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from app.models.pdf import PDFUploadResponse
from app.core.config import settings

router = APIRouter()

@router.post("/upload-pdf", response_model=PDFUploadResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    session_id: str = Query(..., description="Session identifier"),
):
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    # Create storage/session dir
    session_dir = os.path.join(settings.CHROMA_DIR, session_id)
    os.makedirs(session_dir, exist_ok=True)

    # Generate doc_id and save
    doc_id = str(uuid.uuid4())
    save_path = os.path.join(session_dir, f"{doc_id}.pdf")

    with open(save_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    size_kb = round(len(content) / 1024, 2)

    return PDFUploadResponse(
        doc_id=doc_id,
        filename=file.filename,
        size_kb=size_kb,
        message="PDF uploaded successfully."
    )
