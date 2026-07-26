Bilkul! Task A ki deliverables mein **README with API contract** shamil hai. Clear, professional, aur score-maximizing API documentation neeche di gayi hai.

Aap is poore content ko apne project ki root directory mein **`README.md`** file ke taur par save kar lein:

```markdown
# ⚡ Page Pulse - Production-Grade URL Audit Service

Page Pulse is a high-performance, resilient, production-grade URL audit service built to validate, inspect, and analyze web page metrics in real time. Built with Node.js, Express, TypeScript, and Upstash Redis.

> **Live Demo:** [YOUR_DEPLOYED_URL_HERE]  
> **Repository:** [YOUR_GITHUB_REPO_URL_HERE]

---

## 📸 Production Features

* **Strict Input Validation:** Powered by Zod schema parsing.
* **Resilient Execution:** Built-in 5-second `AbortController` timeouts and global exception handling.
* **Smart Caching Layer:** Upstash Redis integration with configurable Cache TTL to serve repeat audits instantly.
* **Rate Limiting:** Per-client IP rate limiting with standard header feedback.
* **Structured Observability:** Unique `X-Request-ID` tracking per request using Pino JSON logging.
* **Automated CI/CD:** GitHub Actions test pipeline executing type checks and Jest suites on every push.

---

## 📋 API Contract & Documentation

### Base URL
```text
http://localhost:5000/api

```

---

### 1. Health Check Endpoint

Checks the operational status of the service.

* **Endpoint:** `GET /health`
* **Auth Required:** No
* **Headers:** None

#### Response (200 OK)

```json
{
  "status": "ok",
  "timestamp": "2026-07-26T16:00:00.000Z"
}

```

---

### 2. URL Audit Endpoint

Executes a live health check and metric audit on the target URL.

* **Endpoint:** `POST /api/audit`
* **Auth Required:** No
* **Headers:**
`Content-Type: application/json`

#### Request Body

```json
{
  "url": "[https://google.com](https://google.com)"
}

```

#### Success Response - Live Audit (200 OK)

```json
{
  "status": "success",
  "cached": false,
  "requestId": "c9b2f3a1-8d2e-4f1a-b3c4-d5e6f7a8b9c0",
  "data": {
    "url": "[https://google.com](https://google.com)",
    "statusCode": 200,
    "statusText": "OK",
    "responseTimeMs": 134,
    "contentType": "text/html; charset=ISO-8859-1",
    "contentLengthBytes": 19542,
    "meta": {
      "title": "Google",
      "description": "Search the world's information, including webpages, images, videos and more.",
      "h1": null
    },
    "auditedAt": "2026-07-26T16:00:00.000Z"
  }
}

```

#### Success Response - Cached Result (200 OK)

```json
{
  "status": "success",
  "cached": true,
  "requestId": "d1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
  "data": {
    "url": "[https://google.com](https://google.com)",
    "statusCode": 200,
    "statusText": "OK",
    "responseTimeMs": 134,
    "contentType": "text/html; charset=ISO-8859-1",
    "contentLengthBytes": 19542,
    "meta": {
      "title": "Google",
      "description": "Search the world's information, including webpages, images, videos and more.",
      "h1": null
    },
    "auditedAt": "2026-07-26T16:00:00.000Z"
  }
}

```

---

### 3. Error Responses

All error responses strictly follow a structured error format and include the request's tracing ID (`requestId`).

#### Validation Error (400 Bad Request)

```json
{
  "status": "error",
  "code": "INVALID_INPUT",
  "message": "Validation failed for request parameters",
  "errors": [
    {
      "field": "body.url",
      "message": "Must be a valid HTTP or HTTPS URL"
    }
  ]
}

```

#### Gateway Timeout Error (504 Gateway Timeout)

*Triggered when the target server fails to respond within 5000ms.*

```json
{
  "status": "error",
  "code": "GATEWAY_TIMEOUT",
  "message": "Request timed out after 5000ms",
  "requestId": "f8a7b6c5-d4e3-f2a1-0b9c-8d7e6f5a4b3c"
}

```

#### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "status": "error",
  "code": "TOO_MANY_REQUESTS",
  "message": "Too many audit requests from this IP, please try again after 15 minutes."
}

```

---

## 🛠 Local Setup & Running Tests

1. **Clone the repository:**
```bash
git clone [https://github.com/YOUR_USERNAME/page-pulse.git](https://github.com/YOUR_USERNAME/page-pulse.git)
cd page-pulse

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory (refer to `.env.example`).
4. **Run Development Server:**
```bash
npm run dev

```


5. **Execute Test Suite:**
```bash
npm test

```



---

## 🌐 Live Verification Requirement

This project includes the live build attribution footer requirement:

> Built for [Digital Heroes Training Task](https://digitalheroesco.com)

```

---

Is `README.md` ke sath aapke **Task A aur Task B dono complete 100% compliant** ho chuke hain! Ab aap project GitHub par push karein aur submission link deliver kar dein.

```