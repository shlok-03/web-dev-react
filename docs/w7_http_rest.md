# HTTP and REST API Basics

## What is HTTP?

HTTP (HyperText Transfer Protocol) is the protocol that web browsers and servers use to communicate. It's like a language that both sides understand.

When you visit a website or use an app, your device sends an **HTTP request** to a server, and the server sends back an **HTTP response**.

## Request/Response Model

Every web interaction follows this simple pattern:

```
Client (You)                    Server
    |                              |
    |-- HTTP Request ------------->|
    |                              |
    |<---- HTTP Response -----------|
```

- **Client**: Your browser or app making the request
- **Server**: The computer that has the data you want
- **Request**: "Hey, I want this information"
- **Response**: "Here's what you asked for (or here's an error)"

## HTTP Request Structure

An HTTP request has several parts:

### 1. **Request Line** (Method + Path + Version)
```
GET /weather/london HTTP/1.1
```
- `GET` = what action you want (the HTTP method)
- `/weather/london` = what resource you want
- `HTTP/1.1` = protocol version

### 2. **Headers** (Metadata)
```
Host: api.example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
```
Headers provide extra information about the request:
- `Host` = which server you're talking to
- `User-Agent` = what browser/app is making the request
- `Content-Type` = format of the data being sent

### 3. **Body** (Optional)
```json
{
  "username": "john",
  "password": "secret123"
}
```
Only some requests have a body (POST, PUT). GET requests typically don't.

## HTTP Response Structure

A server's response also has multiple parts:

### 1. **Status Line** (Status Code + Message)
```
HTTP/1.1 200 OK
```
The status code tells you if the request was successful:
- `200 OK` = Success
- `404 Not Found` = Resource doesn't exist
- `500 Internal Server Error` = Server error

### 2. **Headers** (Metadata)
```
Content-Type: application/json
Content-Length: 256
Set-Cookie: session=abc123
```
Headers describe the response:
- `Content-Type` = format of the data (JSON, HTML, etc.)
- `Content-Length` = size of the response body
- `Set-Cookie` = save information for future requests

### 3. **Body** (The Actual Data)
```json
{
  "city": "London",
  "temperature": 15,
  "condition": "Cloudy"
}
```
The body contains the actual data the server is sending back.

## Complete Example

**Request:**
```
GET /weather/london HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 89

{
  "city": "London",
  "temperature": 15,
  "condition": "Cloudy"
}
```

## Key Takeaways

- HTTP is a **request-response protocol** - client asks, server answers
- Every request has a **method** (GET, POST, PUT, DELETE, etc.)
- Both requests and responses have **headers** (metadata) and optional **bodies** (data)
- Responses include a **status code** that indicates success or failure

---

# REST: Building Better APIs

## What is REST?

REST (Representational State Transfer) is a **design philosophy** for building web APIs. It's a set of guidelines that make APIs predictable, easy to understand, and consistent.

REST isn't a protocol like HTTP—it's a **style** of using HTTP to create good APIs.

## REST Guiding Principles

REST is built on a few core ideas:

### 1. **Resources are Key**
Everything is a **resource** (data object). Resources have unique identifiers (like IDs).
- A book is a resource
- A user account is a resource
- A blog post is a resource

### 2. **Use HTTP Methods Correctly**
Use HTTP verbs to describe what you're doing:
- `GET` = read/retrieve data (safe, doesn't change anything)
- `POST` = create new data
- `PUT` = update existing data
- `DELETE` = remove data

### 3. **Stateless**
Each request contains all information needed—the server doesn't need to remember previous requests.

### 4. **Responses are Consistent**
Use standard formats (like JSON) and status codes so clients know what to expect.

### 5. **Idempotency**
Idempotency means that making the same request multiple times produces the same result as making it once. It's safe to retry requests without accidentally changing data twice.

**Idempotent HTTP Methods:**
- `GET` - Safe, never modifies data
- `PUT` - Updates a resource to a specific state (same result no matter how many times you call it)
- `DELETE` - Removes a resource (calling it twice still results in it being gone)

**Non-idempotent:**
- `POST` - Creates new data (calling it twice creates two items)

**Example:**
```
PUT /books/42
{
  "title": "The Great Gatsby v2",
  "author": "F. Scott Fitzgerald"
}
```
Calling this 10 times updates the book to the same state 10 times. The book doesn't change differently each time—it's idempotent.

Compare to:
```
POST /books
{
  "title": "New Book",
  "author": "Someone"
}
```
Calling this 10 times creates 10 different books. Not idempotent.

**Why it matters:** If a network request fails, clients can safely retry idempotent requests. With POST, retrying could accidentally create duplicates.

## Well-Designed URIs

A good URI (web address) clearly identifies what resource you're accessing and uses nouns, not verbs.

**Good URI design:**
```
/books              → Get or create books
/books/42           → Work with a specific book (ID 42)
/users              → Get or create users
/users/15/posts     → Get posts by user 15
```

**Avoid (not REST style):**
```
/getBooks           → Don't use verbs in the URI
/deleteUser=42      → Don't use verbs, use HTTP methods instead
/fetchPostsByUser   → The HTTP method tells you what to do
```

**Why?** The HTTP method already tells you the action. URIs should identify **what**, not **how**.

## Data Format: JSON

APIs typically return data in **JSON** format (JavaScript Object Notation). It's human-readable and easy for programs to parse.

```json
{
  "id": 42,
  "name": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

## Returning Results

### Single Resource
When getting one item:
```
GET /books/42

Response:
{
  "id": 42,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

### Collections
When getting multiple items, return them in an array:
```
GET /books

Response:
[
  {
    "id": 42,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  },
  {
    "id": 15,
    "title": "1984",
    "author": "George Orwell"
  }
]
```

| Action | HTTP Method | URI | Returns |
|--------|-------------|-----|---------|
| Get all items | GET | `/books` | Array of items |
| Get one item | GET | `/books/42` | Single item |
| Create item | POST | `/books` | New item with ID |
| Update item | PUT | `/books/42` | Updated item |
| Delete item | DELETE | `/books/42` | Confirmation or empty |

REST APIs are predictable because they follow these patterns consistently.

## HTTP Status Codes

Status codes are three-digit numbers that tell you the result of your request. Here are the most common ones:

### 2xx - Success
- `200 OK` - Request succeeded, data returned
- `201 Created` - Request succeeded, new resource created (typically with POST)
- `204 No Content` - Request succeeded, but no data to return

### 4xx - Client Error (Your mistake)
- `400 Bad Request` - Invalid data sent (malformed JSON, missing required fields)
- `401 Unauthorized` - Not logged in or invalid credentials
- `403 Forbidden` - Authenticated but don't have permission
- `404 Not Found` - Resource doesn't exist

### 5xx - Server Error (Their mistake)
- `500 Internal Server Error` - Something went wrong on the server
- `503 Service Unavailable` - Server is temporarily down

### How to Use Them
```
POST /books
{
  "title": "New Book"
}

Response:
HTTP/1.1 201 Created
{
  "id": 100,
  "title": "New Book"
}
```

vs.

```
GET /books/999

Response:
HTTP/1.1 404 Not Found
{
  "error": "Not Found",
  "message": "Book with ID 999 does not exist"
}
```

## Query Parameters

Query parameters let you filter, sort, and paginate API results. They come after a `?` in the URL:

```
GET /books?category=fiction&sort=newest&limit=10
```

- `?` = start of query parameters
- `category=fiction` = filter by fiction category
- `&` = separator between parameters
- `sort=newest` = sort by newest first
- `limit=10` = return only 10 results

**Common query parameters:**
- `limit` or `per_page` - How many results to return
- `offset` or `page` - Which page (for pagination)
- `sort` - How to sort (newest, oldest, alphabetical)
- `filter` - Filter by specific field values
- `search` - Search term

**Real-world examples:**
```
GET /books?limit=5                    → First 5 books
GET /books?category=fiction&limit=10  → 10 fiction books
GET /books?sort=price-desc            → Sorted by price (most expensive first)
GET /books?page=2&limit=20            → Second page, 20 items per page
GET /books?search=gatsby              → Search for "gatsby"
```

The server responds with filtered/sorted results:
```json
[
  {
    "id": 42,
    "title": "The Great Gatsby",
    "category": "fiction"
  },
  {
    "id": 15,
    "title": "1984",
    "category": "fiction"
  }
]
```

## Error Response Format

When something goes wrong, a well-designed API returns structured error information so the client can handle it properly.

**Good error response:**
```json
{
  "error": "Bad Request",
  "message": "Title field is required",
  "status": 400
}
```

**Better error response (with more detail):**
```json
{
  "error": "Validation Error",
  "status": 400,
  "message": "Request validation failed",
  "details": [
    {
      "field": "title",
      "issue": "required field is missing"
    },
    {
      "field": "priority",
      "issue": "must be one of: High, Medium, Low"
    }
  ]
}
```

**HTTP Response with error:**
```
POST /books
Content-Type: application/json

{
  "author": "F. Scott Fitzgerald"
}

Response:
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Validation Error",
  "status": 400,
  "message": "Title is required",
  "timestamp": "2026-04-16T10:30:00Z"
}
```

**Benefits of structured errors:**
- Clients can programmatically handle different error types
- Developers can quickly debug issues
- Consistent error format across the entire API




