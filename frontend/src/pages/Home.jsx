import { useState } from "react";
import PDFUploader from "@/components/PDFUploader";

export default function Home() {
  const [sessionId] = useState("test123"); // Later we’ll generate a unique sessionId
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const handleUploadSuccess = (data) => {
    setUploadedDocs((prev) => [...prev, data]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8">
      <h1 className="text-2xl font-bold">AI PDF Chatbot</h1>
      <PDFUploader
        sessionId={sessionId}
        onUploadSuccess={handleUploadSuccess}
      />
      {uploadedDocs.length > 0 && (
        <div className="bg-white p-4 rounded shadow w-[400px]">
          <h2 className="text-lg font-semibold mb-2">Uploaded PDFs</h2>
          <ul className="list-disc list-inside text-sm">
            {uploadedDocs.map((doc) => (
              <li key={doc.doc_id}>
                {doc.filename} — {doc.size_kb} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
