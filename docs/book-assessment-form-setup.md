# Book Free Assessment Form Setup

## 1. Environment Variables

Add the following variables to `.env.local`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `BOOKING_FROM_NAME`
- `BOOKING_FROM_EMAIL`
- `BOOKING_NOTIFICATION_TO_EMAIL`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_TAB_NAME`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

Use `.env.local.example` as the template.

## 2. Email Notification Setup

1. Use your SMTP provider credentials (Google Workspace SMTP, Microsoft 365 SMTP, SendGrid SMTP, etc.).
2. Set `BOOKING_FROM_EMAIL` to a verified sending address for your domain/provider.
3. Set `BOOKING_NOTIFICATION_TO_EMAIL` to the inbox where you want notifications.

## 3. Google Sheets Setup

1. In Google Cloud, enable the **Google Sheets API** for your project.
2. Create a **Service Account**.
3. Create a service-account key and copy:
   - `client_email` -> `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` -> `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (keep escaped `\n` line breaks)
4. Open your destination Google Sheet and share it with the service-account email as **Editor**.
5. Set `GOOGLE_SHEET_ID` from the Sheet URL and choose `GOOGLE_SHEET_TAB_NAME` (default: `Submissions`).

## 4. Expected Sheet Columns

The integration appends this column order:

1. Submitted At (UTC)
2. Parent Name
3. Parent Email
4. Parent Phone
5. Student Name
6. Student Age
7. Curriculum
8. Subjects
9. Message
10. Page URL
11. IP Address
12. User Agent

## 5. Note on Excel Files in Google Drive

Appending rows directly to `.xlsx` files via this flow is not reliable for web API updates. The safest production approach is:

- Use a Google Sheet (native format) as the submission destination, or
- Convert the Excel file to Google Sheets first.
