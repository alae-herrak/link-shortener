import React, { useState } from "react";
import { Loader2, Link, AlertTriangle } from "lucide-react";
import * as api from "./api/api";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }
    setError("");
    setLoading(true);
    setShortUrl("");
    try {
      const response = await api.shortenURL(originalUrl);
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(
        err.response.data.error || err.message || "Failed to shorten URL."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white text-center">
          Shorten Your Link
        </h1>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Enter URL to shorten..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="flex-1 bg-black/20 text-white border border-gray-700 placeholder:text-gray-400 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       error:border-red-500 focus:error:ring-red-500 px-4 py-3" // Added px-4 and py-3 for padding
            disabled={loading}
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200
                       disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                <Link className="mr-2 h-4 w-4" />
                Shorten
              </>
            )}
          </button>
        </div>

        {/* Display Short URL */}
        {shortUrl && (
          <div className="bg-black/20 p-4 rounded-md border border-gray-700">
            <p className="text-gray-300 mb-2">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="border border-red-500 bg-red-500/10 text-red-400 p-4 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold">Error</h2>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
