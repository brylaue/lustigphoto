# Admin Panel Setup Guide

## Admin Portal URL

**Your admin portal is located at:** `/cms-a8f3e9d2.html`

**⭐ Bookmark this URL!** The admin portal is intentionally hidden from search engines and sitemaps for security.

## Enable Google Sign-In for Admin Access

To access the gallery admin panel, you need to configure Google OAuth in Supabase.

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   ```
   https://jgjvwzztgoyzsxwzeyaf.supabase.co/auth/v1/callback
   ```
7. Copy your **Client ID** and **Client Secret**

### Step 2: Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and click to expand
5. Toggle **Enable Sign in with Google** to ON
6. Paste your Google **Client ID** and **Client Secret**
7. Click **Save**

### Step 3: Add Your Google Account

1. Go to your website's admin page: `https://yourdomain.com/cms-a8f3e9d2.html`
2. Click **Sign in with Google**
3. Select your Google account
4. You'll be redirected back to the admin panel
5. You can now manage galleries!

### Optional: Restrict Access

To limit admin access to specific Google accounts:

1. In Supabase Dashboard, go to **Authentication** → **Providers** → **Google**
2. Enable **Skip nonce check** (not recommended for production)
3. Or use Supabase's Email Confirmations and manually approve users

### Troubleshooting

**"Invalid redirect URI" error:**
- Make sure you added the exact Supabase callback URL in Google Cloud Console
- URL must match exactly: `https://jgjvwzztgoyzsxwzeyaf.supabase.co/auth/v1/callback`

**Can't sign in:**
- Verify Google OAuth is enabled in Supabase
- Check that Client ID and Secret are correct
- Clear browser cache and cookies

**Anyone can sign in:**
- By default, any Google account can sign in
- To restrict, you can:
  - Disable sign-ups in Supabase (Authentication → Settings)
  - Manually add allowed users in Authentication → Users
  - Implement custom authorization logic

## Security Notes

- Admin portal uses an obscured URL (`cms-a8f3e9d2.html`) that won't appear in search results
- Blocked from search engines via robots.txt
- Not included in sitemap.xml
- Only authenticated users can create/edit/delete galleries
- Public visitors can view galleries without authentication
- The database has Row Level Security (RLS) enabled
- All admin operations are protected at the database level

**Tip:** Create a browser bookmark for easy access!
