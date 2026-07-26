"use client";

import { useState } from "react";
import AuditForm from "./components/AuditForm";
import AuditResults from "./components/AuditResults";
import Footer from "./components/Footer";
import { runAuditApi } from "./lib/api";
import { AuditApiResponse } from "./types/audit";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditApiResponse | null>(null);

  const handleAudit = async (targetUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await runAuditApi(targetUrl);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during the audit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            ⚡ Page Pulse
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Production-grade instant URL audit engine & performance analyzer.
          </p>
        </div>

        <AuditForm onSubmit={handleAudit} isLoading={loading} />

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {result && <AuditResults result={result} />}
      </main>

      <Footer />
    </div>
  );
}
