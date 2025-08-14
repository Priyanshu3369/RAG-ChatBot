import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHealth } from "@/lib/api";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    const data = await getHealth();
    if (data && data.status === "ok") {
      setStatus("Online ✅");
    } else {
      setStatus("Offline ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardContent className="space-y-4 text-center">
          <h1 className="text-xl font-bold">AI PDF Chatbot</h1>
          <Button onClick={checkHealth} disabled={loading}>
            {loading ? "Checking..." : "Check API Health"}
          </Button>
          {status && (
            <p className="text-lg font-semibold mt-2">
              Backend Status: <span>{status}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
