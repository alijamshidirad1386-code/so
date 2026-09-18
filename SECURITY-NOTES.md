# Security / deployment notes

- The redesign removes decorative rose assets and does not load third-party scripts, CDNs, fonts, iframes, trackers, or remote images.
- All JavaScript and images referenced by the pages are local to this package.
- A restrictive Content-Security-Policy is included in the page `<head>` and a `_headers` file is provided for hosts that support that convention.
- The booking page does not POST visitor data to a remote endpoint. It creates a local request summary and optionally uses the browser's clipboard/share APIs.
- A Chrome “Dangerous site” interstitial is controlled by Safe Browsing / the hosting domain's security reputation and cannot be cleared by HTML/CSS alone. After deployment, inspect the domain in Google Search Console > Security Issues and request a review after confirming the domain and its hosting environment are clean.
