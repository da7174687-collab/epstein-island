# TraceX — Mobile Number Intelligence

A premium, GitHub-ready static website for analyzing **public phone-number metadata** without using the visitor's device location.

## What it does

- International number parsing
- Calling-code recognition
- Country / numbering-region display
- Number type classification in the demo dataset
- Structural validity display
- Responsive dark/glass UI
- No GPS, contacts, camera, microphone or SMS permissions
- Works as a static GitHub Pages site

## Important limitation

A normal website cannot determine a person's live GPS location simply from their phone number. This project intentionally shows **numbering-plan information**, not a person's real-time location.

For real carrier/network metadata, use a legitimate, authorized phone-number intelligence API from a backend. Never put a private API key in `app.js`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, and `app.js`.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, then `main` and `/root`.
5. Save and open the generated Pages URL.

## Production API architecture

Recommended flow:

Browser → Your backend → Authorized phone-number API → Sanitized JSON → Browser

Do not call a paid/private API directly from the browser if that exposes your API key.

## Customize

Edit the `demoDB` object in `app.js` to add public numbering-plan rules. For a production application, replace that local object with your backend endpoint.

## License

Use and modify for educational and legitimate applications.
