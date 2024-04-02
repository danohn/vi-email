# Voice Intelligence Email Transcript

A Twilio Serverless Function that emails Voice Intelligence transcripts using SendGrid.

## Requirements

- A Twilo account configured with Voice Intelligence
- A Sendgrid account and Sendgrid API Key that allows sending email
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli) installed
- [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started) installed

## Installation

1. `git clone https://github.com/danohn/vi-email.git`
2. `cd vi-email`
3. `mv .env.example .env`
4. `nano .env` (replace placeholders with real values)
5. `twilio serverless:deploy`

## Usage

Once the serverless function has been deployed, copy the callback function URL e.g. `https://vi-email-1234-dev.twil.io/callback` and set it as the Webhook under `Twilio Console > Voice Intelligence > Services > Service > Webhooks`.

## swapRoles constant

On [Line 1](https://github.com/danohn/vi-email/blob/36987eecbf0e531a7e93a68af7b9291d065d1d47/functions/callback.protected.js#L1) of the callback function is a constant `swapRoles` which by default, is set to `true`. By default, if Auto-transcripe is enabled, Twilio will create the transcription on the assumption that Channel 1 of the recording is the Agent and Channel 2 is the Customer. When the `swapRoles` constant is set to `true`, the email being sent will swap the roles so that Channel 1 is the Customer and Channel 2 is the Agent. This decision was made due to testing but can be controlled by setting it to `false`. This doesn't actaully swap the roles on the actual transcription, only the content of the email.
