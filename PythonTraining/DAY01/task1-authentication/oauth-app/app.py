import os
import jwt
import requests
from datetime import datetime, timedelta, timezone
from flask import Flask, redirect, request, jsonify, render_template_string
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GOOGLE_CLIENT_ID     = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
JWT_SECRET           = os.getenv("JWT_SECRET", "fallback_secret")

GOOGLE_AUTH_URL  = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_URL  = "https://www.googleapis.com/oauth2/v2/userinfo"

# ── JWT helpers ───────────────────────────────────────────────────────────────

def create_jwt(user: dict) -> str:
    payload = {
        "sub":      str(user["id"]),
        "email":    user["email"],
        "name":     user.get("name", ""),
        "picture":  user.get("picture", ""),
        "exp":      datetime.now(timezone.utc) + timedelta(hours=1),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def decode_jwt(token: str) -> dict | None:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        return None

# ── HTML templates ────────────────────────────────────────────────────────────

INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>OAuth Login</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center;
           align-items: center; min-height: 100vh; background: #f0f2f5; }
    .card { background: white; border-radius: 12px; padding: 2rem; width: 360px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p  { color: #666; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .btn { display: inline-flex; align-items: center; gap: 0.5rem;
           padding: 0.75rem 1.5rem; border: none; border-radius: 8px;
           cursor: pointer; font-size: 1rem; font-weight: 500;
           text-decoration: none; transition: opacity 0.2s; }
    .btn:hover { opacity: 0.85; }
    .btn-google { background: #4285F4; color: white; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome</h1>
    <p>Sign in to continue</p>
    <a class="btn btn-google" href="/login">
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
      </svg>
      Sign in with Google
    </a>
  </div>
</body>
</html>"""

SUCCESS_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Welcome</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center;
           align-items: center; min-height: 100vh; background: #f0f2f5; }
    .card { background: white; border-radius: 12px; padding: 2rem; width: 480px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
    img  { width: 72px; height: 72px; border-radius: 50%; margin-bottom: 1rem; }
    h2   { font-size: 1.2rem; margin-bottom: 0.25rem; }
    .email { color: #666; font-size: 0.85rem; }
    .btn { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem;
           background: #e74c3c; color: white; border-radius: 8px;
           text-decoration: none; font-weight: 500; }
    .btn:hover { opacity: 0.85; }

    .token-section { margin-top: 1.5rem; text-align: left; }
    .token-label {
      font-size: 0.75rem; font-weight: 600; color: #888;
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;
    }
    .token-box {
      background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px;
      padding: 0.75rem; font-size: 0.7rem; font-family: monospace;
      word-break: break-all; color: #333; max-height: 100px;
      overflow-y: auto; line-height: 1.5;
    }
    .copy-btn {
      margin-top: 0.5rem; padding: 0.4rem 1rem; background: #4285F4;
      color: white; border: none; border-radius: 6px; cursor: pointer;
      font-size: 0.8rem; width: 100%;
    }
    .copy-btn:hover { opacity: 0.85; }
    .copy-btn.copied { background: #27ae60; }
  </style>
</head>
<body>
  <div class="card" id="card">Loading...</div>
  <script>
    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");

    if (!token) {
      document.getElementById("card").textContent = "No token found.";
    } else {
      localStorage.setItem("jwt", token);
      const payload = JSON.parse(atob(token.split(".")[1]));

      document.getElementById("card").innerHTML = `
        <img src="${payload.picture}" alt="avatar"/>
        <h2>${payload.name}</h2>
        <span class="email">${payload.email}</span>

        <div class="token-section">
          <div class="token-label">JWT Token</div>
          <div class="token-box" id="jwt-display">${token}</div>
          <button class="copy-btn" id="copy-btn" onclick="copyToken()">Copy Token</button>
        </div>

        <a class="btn" href="/logout">Sign Out</a>
      `;
    }

    function copyToken() {
      const token = localStorage.getItem("jwt");
      navigator.clipboard.writeText(token).then(() => {
        const btn = document.getElementById("copy-btn");
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy Token";
          btn.classList.remove("copied");
        }, 2000);
      });
    }
  </script>
</body>
</html>"""

# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/")
def home():
    return render_template_string(INDEX_HTML)


@app.route("/success")
def success():
    return render_template_string(SUCCESS_HTML)


@app.route("/login")
def login():
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
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "No code returned from Google"}), 400

    token_response = requests.post(GOOGLE_TOKEN_URL, data={
        "client_id":     GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "code":          code,
        "grant_type":    "authorization_code",
        "redirect_uri":  "http://localhost:5000/callback",
    })
    token_data   = token_response.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return jsonify({"error": "Failed to obtain access token", "details": token_data}), 400

    user = requests.get(
        GOOGLE_USER_URL,
        headers={"Authorization": f"Bearer {access_token}"},
    ).json()

    our_jwt = create_jwt(user)
    return redirect(f"/success?token={our_jwt}")


@app.route("/profile")
def profile():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return jsonify({"error": "Missing token"}), 401
    payload = decode_jwt(auth.split(" ")[1])
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401
    return jsonify({"id": payload["sub"], "email": payload["email"],
                    "name": payload["name"], "picture": payload["picture"]})


@app.route("/logout")
def logout():
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
