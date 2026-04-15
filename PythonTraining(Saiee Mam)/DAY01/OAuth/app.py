import os
import jwt
import requests
from datetime import datetime, timedelta, timezone

from flask import Flask, redirect, request, jsonify, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
 
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
JWT_SECRET = os.getenv("JWT_SECRET", "fallback_secret")

 

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


# ── JWT helpers ──────────────────────────────────────────────────────────────

def create_jwt(user: dict) -> str:
    """Issue a signed JWT valid for 1 hour."""
    payload = {
        "sub": str(user["id"]),
        "username": user["login"],
        "exp": datetime.now(timezone.utc) + timedelta(hours=1),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


# ── OAuth routes ─────────────────────────────────────────────────────────────

@app.route("/")
def home():
    """Serve the frontend."""
    return render_template("index.html")


@app.route("/success")
def success():
    """Success page after login."""
    return render_template("success.html")


@app.route("/login")
def login():
    """Step 1 — redirect the user to Google for authorization."""
    google_url = (
        f"{GOOGLE_AUTH_URL}"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri=http://localhost:5000/callback"
        f"&response_type=code"
        f"&scope=openid email profile"
        f"&prompt=select_account"
    )
    return redirect(google_url)


@app.route("/callback")
def callback():
    """Step 2 — Google redirects here with a code; exchange it for a token."""
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "No code returned from Google"}), 400

    # Exchange code for Google access token
    token_response = requests.post(
        GOOGLE_TOKEN_URL,
        data={
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": "http://localhost:5000/callback",
        },
    )
    token_data = token_response.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return jsonify({"error": "Failed to obtain access token", "details": token_data}), 400

    # Fetch the authenticated user's profile from Google
    user_response = requests.get(
        GOOGLE_USER_URL,
        headers={"Authorization": f"Bearer {access_token}"},
    )
    user = user_response.json()

    # Issue our own JWT
    our_jwt = create_jwt({"id": user["id"], "login": user.get("email", user.get("name", "unknown"))})
    return redirect(f"/success?token={our_jwt}")


# ── Simple profile route (no JWT protection for basic demo) ──────────────────

@app.route("/profile")
def profile():
    """A simple profile endpoint - returns success message."""
    return jsonify({
        "message": "Profile accessed successfully!",
        "note": "In production, this would be protected with JWT authentication"
    })


if __name__ == "__main__":
    app.run(debug=True)
