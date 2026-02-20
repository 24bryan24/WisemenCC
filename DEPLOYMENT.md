# Firebase Hosting Deployment via GitHub Actions

This project is configured to automatically deploy to Firebase Hosting when you push to the `main` branch.

## Prerequisites

1. **Firebase project** – Create one at [Firebase Console](https://console.firebase.google.com/)
2. **GitHub repository** – Push this code to GitHub

## Setup Instructions

### 1. Update Firebase project ID

Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 2. Create a Firebase service account

1. Go to [Firebase Console](https://console.firebase.google.com/) → Project Settings → Service accounts
2. Click **Generate new private key**
3. Save the downloaded JSON file securely

### 3. Add GitHub Secrets

In your GitHub repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `FIREBASE_SERVICE_ACCOUNT` | The **entire contents** of the service account JSON file (copy-paste the raw JSON) |
| `FIREBASE_PROJECT_ID` | Your Firebase project ID (e.g. `wisemencc-12345`) |

### 4. Deploy

Push to the `main` branch. The workflow will:

1. Install dependencies
2. Build the app (`npm run build`)
3. Deploy the `dist/` folder to Firebase Hosting

## Local development

```bash
npm install
npm run dev
```

## Manual deploy (optional)

```bash
npm run build
npx firebase deploy
```

(Requires `firebase login` first.)
