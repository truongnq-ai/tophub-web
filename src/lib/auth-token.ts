import { createHmac, timingSafeEqual } from "node:crypto";

export interface TokenPayload {
  discord_id: string;
  exp: number;
}

export function createBackendToken(discordId: string, authSecret: string, expiresInSeconds = 86400): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload: TokenPayload = { discord_id: discordId, exp };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", authSecret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifyBackendToken(token: string, authSecret: string): TokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const [payloadB64, signature] = parts;
  const expectedSig = createHmac("sha256", authSecret).update(payloadB64).digest("base64url");

  const sigBuf = Buffer.from(signature, "utf8");
  const expBuf = Buffer.from(expectedSig, "utf8");
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    if (!payload.discord_id || (payload.exp && payload.exp < Math.floor(Date.now() / 1000))) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
