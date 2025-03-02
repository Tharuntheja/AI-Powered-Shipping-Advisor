import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function ShippingAI() {
  const [weight, setWeight] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShippingOptions = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, destination })
      });
      const data = await res.json();
      setResponse(data.recommendation);
    } catch (error) {
      setResponse("Error fetching data");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold mb-4">AI Shipping Rate Predictor</h1>
      <Card className="p-4 w-96">
        <CardContent>
          <Input
            placeholder="Enter package weight (lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mb-3"
          />
          <Button onClick={fetchShippingOptions} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Get Best Shipping Option"}
          </Button>
          {response && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="font-medium">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
