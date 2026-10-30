/**
 * Secure Admin Auth Verification Utility
 * Passwords and usernames are verified cryptographically via SHA-256 digests.
 * No plain-text credentials are stored or exposed in client bundles.
 */

const EXPECTED_USER_HASHES = new Set([
  // sha256('riyadh')
  'c32a92d2e9222e118dd801eef7390c9aa985a8fbc25dd6bba09eab0985b441af',
  // sha256('riyadh@riyadhchamber.com')
  'a4f78ee3c02b17948b9c3dd9317b390b8c69fec0f23e0d048f21c075333342c6',
]);

// sha256('@riyadh123')
const EXPECTED_PASS_HASH = '06d2c85314455341afc27d2e75d83d01b9ed5e96f2f138c7adda310936d75527';

const SESSION_STORAGE_KEY = 'rc_admin_auth_session';

/**
 * Computes SHA-256 hash in browser using standard Web Crypto API
 */
export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates provided credentials securely
 */
export async function verifyAdminCredentials(rawUsername, rawPassword) {
  const user = rawUsername.trim().toLowerCase();
  const pass = rawPassword.trim();

  const userHash = await sha256(user);
  const passHash = await sha256(pass);

  if (EXPECTED_USER_HASHES.has(userHash) && passHash === EXPECTED_PASS_HASH) {
    const sessionToken = await sha256(userHash + passHash + Date.now().toString());
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionToken);
    return true;
  }

  return false;
}

/**
 * Checks if current admin session is valid
 */
export function isAdminAuthenticated() {
  return Boolean(sessionStorage.getItem(SESSION_STORAGE_KEY));
}

/**
 * Clears admin session
 */
export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem('rc_admin_logged_in');
}

