import axios from "axios";
import * as cheerio from "cheerio";

export interface AuditResult {
  url: string;
  statusCode: number;
  statusText: string;
  responseTimeMs: number;
  contentType: string | null;
  contentLengthBytes: number | null;
  meta: {
    title: string | null;
    description: string | null;
    h1: string | null;
  };
  auditedAt: string;
}

export class AuditService {
  private static DEFAULT_TIMEOUT_MS = 5000; // 5 seconds timeout

  public static async performAudit(targetUrl: string): Promise<AuditResult> {
    const startTime = performance.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.DEFAULT_TIMEOUT_MS
    );

    try {
      const response = await axios.get(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "PagePulse-AuditBot/1.0 (+https://digitalheroesco.com)",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        maxRedirects: 5,
        validateStatus: () => true, // Don't throw errors on 4xx/5xx status codes
      });

      clearTimeout(timeoutId);
      const endTime = performance.now();
      const responseTimeMs = Math.round(endTime - startTime);

      const html = typeof response.data === "string" ? response.data : "";
      const $ = cheerio.load(html);

      const title = $("title").first().text().trim() || null;
      const description =
        $('meta[name="description"]').attr("content")?.trim() ||
        $('meta[property="og:description"]').attr("content")?.trim() ||
        null;
      const h1 = $("h1").first().text().trim() || null;

      // Safely extract & convert headers to String
      const rawContentType = response.headers["content-type"];
      const contentType = rawContentType ? String(rawContentType) : null;

      const rawContentLength = response.headers["content-length"];
      const contentLengthHeader = rawContentLength ? String(rawContentLength) : null;

      const parsedLength = contentLengthHeader
        ? parseInt(contentLengthHeader, 10)
        : Buffer.byteLength(html);

      const contentLengthBytes = isNaN(parsedLength) ? null : parsedLength;

      return {
        url: targetUrl,
        statusCode: response.status,
        statusText: response.statusText || "OK",
        responseTimeMs,
        contentType,
        contentLengthBytes,
        meta: {
          title,
          description,
          h1,
        },
        auditedAt: new Date().toISOString(),
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (
        axios.isCancel(error) ||
        error.name === "AbortError" ||
        error.code === "ECONNABORTED"
      ) {
        const customError: any = new Error(
          `Request timed out after ${this.DEFAULT_TIMEOUT_MS}ms`
        );
        customError.statusCode = 504;
        customError.code = "GATEWAY_TIMEOUT";
        throw customError;
      }

      if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
        const customError: any = new Error(
          "Could not resolve host domain. Please check the URL."
        );
        customError.statusCode = 400;
        customError.code = "DNS_LOOKUP_FAILED";
        throw customError;
      }

      const customError: any = new Error(
        error.message || "Failed to perform URL audit"
      );
      customError.statusCode = 502;
      customError.code = "BAD_GATEWAY";
      throw customError;
    }
  }
}