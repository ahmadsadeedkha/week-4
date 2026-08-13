## Problem-5

| File                | Job                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| **`page.tsx`**      | Renders the actual detail page — reads `params`, calls `getCountryByCode`, returns JSX                   |
| **`loading.tsx`**   | Instant fallback UI shown _while_ `page.tsx`'s `await` is still pending                                  |
| **`error.tsx`**     | Client Component error boundary — catches anything `page.tsx` (or its children) **throws** during render |
| **`not-found.tsx`** | Renders when `notFound()` is called                                                                      |

### DEEPER

API returns 404 (res.status === 404) → not-found.tsx

This means the API is working correctly and telling you, authoritatively, "there is no country with this code." That's not a failure — it's a valid, informative answer to a request for something that doesn't exist.

API unreachable / times out / 500s → error.tsx

This means the system failed to get an answer at all — DNS failure, network drop, server crash, rate limiting, malformed response. You don't know if the country exists or not; you just know your attempt to find out didn't work. That's fundamentally different from a confirmed "doesn't exist," and it's also potentially transient — retrying might succeed next time (the network blip clears, the API comes back up). That's exactly what error.tsx's reset() button is for.
