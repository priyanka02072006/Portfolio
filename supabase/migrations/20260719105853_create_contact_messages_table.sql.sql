/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, name of the person submitting the form)
  - `email` (text, email of the person submitting the form)
  - `message` (text, the message body)
  - `delivered` (boolean, whether the email was successfully delivered via the provider; default false)
  - `created_at` (timestamptz, when the message was submitted)

2. Security
- Enable RLS on `contact_messages`.
- This is a no-auth public portfolio site. The contact form must allow anonymous
  visitors to submit messages, so INSERT is open to anon + authenticated.
- SELECT/UPDATE/DELETE are intentionally NOT granted to anon/authenticated — only
  the service role (used by the edge function) can read or modify stored messages.
  This prevents visitors from reading other people's messages or tampering with
  delivery status.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  delivered boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);