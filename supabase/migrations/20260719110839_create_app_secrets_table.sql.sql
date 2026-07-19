/*
# Create app_secrets table for storing third-party API keys

1. New Tables
- `app_secrets`
  - `key` (text, primary key — the secret name, e.g. "resend_api_key")
  - `value` (text — the secret value)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `app_secrets`.
- NO policies are created. This means anon and authenticated roles have ZERO access
  to the table (neither read nor write). Only the service role — used by edge
  functions — can read/write, because the service role bypasses RLS.
- This table stores sensitive API keys that must never be exposed to the frontend
  or to anonymous users.

3. Initial Data
- Insert the Resend API key used by the send-contact-email edge function to
  deliver contact form submissions to the site owner's inbox.
*/

CREATE TABLE IF NOT EXISTS app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;

INSERT INTO app_secrets (key, value) VALUES ('resend_api_key', 're_bpuzUan8_E4Me82g5MMoF1qqXkDCtSTn4')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;