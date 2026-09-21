# Google Play Data Safety – preparation draft

This draft reflects the current source code and must be rechecked before submitting the Play Console form.

- Data collected: **No**, provided the release build remains offline-only and no analytics/ads SDK is added.
- Data shared with third parties: **No**.
- Data processed locally: quiz answers, scores, and attempt timestamps are stored locally on the device to display history and achievements.
- Data encrypted in transit: **Not applicable** for the current offline-only build.
- Account creation: **No**.
- Data deletion request: local data can be deleted by clearing app data or uninstalling the app.

If a future version adds analytics, advertising, cloud sync, login, or network access, this declaration must be updated before publishing that version.
