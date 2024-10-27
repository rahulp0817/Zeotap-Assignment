"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";

const RuleEditor = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ruleString, setRuleString] = useState("");
  const [testData, setTestData] = useState("");
  const [result, setResult] = useState<string | null>(null); // Changed type to string | null
  const [error, setError] = useState("");

  const handleCreateRule = async () => {
    try {
      const response = await fetch("/api/rules/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, ruleString }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setError("");
      setResult("Rule created successfully");
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setResult(null);
    }
  };

  const handleTestRule = async () => {
    try {
      let data = JSON.parse(testData);
      const response = await fetch("/api/rules/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { result: evalResult } = await response.json();
      setResult(evalResult ? "Rule conditions met" : "Rule conditions not met");
      setError("");
    } catch (err) {
      const error = err as Error; // Type assertion for error
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Rule Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rule Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter rule name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter rule description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rule Definition</label>
            <Textarea
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              placeholder="Enter rule definition (e.g., age > 30 AND department = 'Sales')"
              className="font-mono"
              rows={4}
            />
          </div>

          <Button onClick={handleCreateRule}>Create Rule</Button>

          <div className="border-t pt-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Test Data (JSON)</label>
              <Textarea
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
                placeholder={
                  '{"age": 35, "department": "Sales", "salary": 60000}'
                }
                className="font-mono"
                rows={4}
              />
            </div>

            <Button onClick={handleTestRule} className="mt-4">
              Test Rule
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="flex items-center gap-2 text-green-500">
              <Check className="w-4 h-4" />
              <span>{result}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleEditor;
