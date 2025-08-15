import os
from fastapi import APIRouter, HTTPException, Query
from app.core.config import settings
from app.services.pdf_processing import extract_text_from_pdf

router = APIRouter()

@router.post("/extract-pdf")
def extract_pdf(
    session_id: str = Query(...),
    doc_id: str = Query(...)
):
    session_dir = os.path.join(settings.CHROMA_DIR, session_id)
    pdf_path = os.path.join(session_dir, f"{doc_id}.pdf")
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found.")

    text = extract_text_from_pdf(pdf_path)
    if not text.strip():
        raise HTTPException(status_code=400, detail="No text found in PDF.")

    # Save extracted text
    txt_path = os.path.join(session_dir, f"{doc_id}.txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)

    return {
        "doc_id": doc_id,
        "text_length": len(text),
        "preview": text[:200] + ("..." if len(text) > 200 else "")
    }
