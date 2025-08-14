import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI PDF Chatbot Backend"
    VERSION: str = "0.1.0"
    ALLOWED_ORIGINS: list = os.getenv("ALLOWED_ORIGINS", "*").split(",")
    CHROMA_DIR: str = os.getenv("CHROMA_DIR", "app/storage")
    EMBED_MODEL: str = os.getenv("EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
    OLLAMA_HOST: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")

settings = Settings()
