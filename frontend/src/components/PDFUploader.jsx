import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/lib/api";

export default function PDFUploader({ sessionId, onExtracted }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [extracting, setExtracting] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      setMessage("");

      try {
        // 1. Upload PDF
        const res = await fetch(`${API_URL}/upload-pdf?session_id=${sessionId}`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const uploadData = await res.json();
        setMessage(`✅ Uploaded: ${uploadData.filename} (${uploadData.size_kb} KB)`);

        // 2. Extract text
        setExtracting(true);
        const extractRes = await fetch(
          `${API_URL}/extract-pdf?session_id=${sessionId}&doc_id=${uploadData.doc_id}`,
          { method: "POST" }
        );

        if (!extractRes.ok) throw new Error("Extraction failed");
        const extractData = await extractRes.json();

        if (onExtracted) onExtracted(extractData);
        setMessage((prev) => prev + " | 📝 Text extracted successfully");

      } catch (err) {
        console.error(err);
        setMessage("❌ Upload or extraction failed.");
      } finally {
        setUploading(false);
        setExtracting(false);
      }
    },
    [sessionId, onExtracted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <Card className="w-[400px]">
      <CardContent className="p-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500 font-medium">Drop your PDF here...</p>
          ) : (
            <p className="text-gray-500">Drag & drop a PDF here, or click to select</p>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button disabled={uploading || extracting}>
            {uploading
              ? "Uploading..."
              : extracting
              ? "Extracting..."
              : "Select PDF"}
          </Button>
        </div>

        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </CardContent>
    </Card>
  );
}
