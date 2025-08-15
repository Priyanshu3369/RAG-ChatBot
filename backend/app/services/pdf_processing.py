import pdfplumber

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts text from a PDF file using pdfplumber.
    Returns a single string containing all text.
    """
    full_text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            try:
                text = page.extract_text()
                if text:
                    cleaned = " ".join(text.split())
                    full_text.append(cleaned)
            except Exception as e:
                print(f"❌ Error reading page {page_num}: {e}")
    return "\n".join(full_text)
