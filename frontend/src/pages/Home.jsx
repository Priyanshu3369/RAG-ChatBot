import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";

export default function Home() {
  const [sessionId] = useState("test123"); // later: generate unique ID
  const [docs, setDocs] = useState([]);

  const handleExtracted = (data) => {
    setDocs((prev) => [
      ...prev,
      {
        doc_id: data.doc_id,
        text_length: data.text_length,
        preview: data.preview,
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8 p-4">
      <h1 className="text-2xl font-bold">AI PDF Chatbot</h1>
      <PDFUploader sessionId={sessionId} onExtracted={handleExtracted} />

      {docs.length > 0 && (
        <div className="bg-white p-4 rounded shadow w-[500px]">
          <h2 className="text-lg font-semibold mb-2">Extracted PDFs</h2>
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.doc_id} className="border-b pb-2">
                <p className="text-sm text-gray-700">
                  <strong>Text length:</strong> {doc.text_length} chars
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {doc.preview}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
