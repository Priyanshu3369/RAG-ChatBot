import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/lib/api";

export default function PDFUploader({ sessionId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);
      setMessage("");

      try {
        const res = await fetch(`${API_URL}/upload-pdf?session_id=${sessionId}`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        setMessage(`✅ Uploaded: ${data.filename} (${data.size_kb} KB)`);
        if (onUploadSuccess) onUploadSuccess(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Upload failed. Try again.");
      } finally {
        setUploading(false);
      }
    },
    [sessionId, onUploadSuccess]
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
          <Button disabled={uploading}>
            {uploading ? "Uploading..." : "Select PDF"}
          </Button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-center">{message}</p>
        )}
      </CardContent>
    </Card>
  );
}
