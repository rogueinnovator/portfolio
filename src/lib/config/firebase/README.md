# Firebase Admin SDK Setup

To properly set up Firebase Admin SDK, you need to:

1. Go to your Firebase project settings
2. Navigate to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Rename it to `serviceAccount.json` and place it in this directory

## Alternative Setup

If you prefer not to store the service account file in your repository (recommended for security), you can:

1. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your service account file location
2. Or use environment variables for each credential field

## Example serviceAccount.json format:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour long private key here\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com"
}
``` 