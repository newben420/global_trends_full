import { config } from "dotenv";
const args = process.argv.slice(2);
config({
    path: args[0] || ".env",
    quiet: true,
})

export class Site {
    static TITLE: string = process.env["TITLE"] || "Title";
    static BRAND: string = process.env["BRAND"] || "Brand";
    static ROOT: string = process.cwd() || __dirname;
    static PORT: number = parseInt(process.env["PORT"] || "0") || 3000;
    static PRODUCTION = (process.env["PRODUCTION"] || "").toLowerCase() == "true";
    static FORCE_FAMILY_4 = (process.env["FORCE_FAMILY_4"] || "").toLowerCase() == "true";
    static EXIT_ON_UNCAUGHT_EXCEPTION = (process.env["EXIT_ON_UNCAUGHT_EXCEPTION"] || "").toLowerCase() == "true";
    static EXIT_ON_UNHANDLED_REJECTION = (process.env["EXIT_ON_UNHANDLED_REJECTION"] || "").toLowerCase() == "true";
    static URL = Site.PRODUCTION ? (process.env["PROD_URL"] || "") : `http://localhost:${Site.PORT}`;
    static MAX_ALLOWED_FLOG_LOG_WEIGHT: number = parseInt(process.env["MAX_ALLOWED_FLOG_LOG_WEIGHT"] || "0") ?? 5;
    
    static MAIN_INTERVAL_MS: number = parseInt(process.env["MAIN_INTERVAL_MS"] || "0") || 5;
    static MAIN_USE = (process.env["MAIN_USE"] || "").toLowerCase() == "true";


    static KEYWORD_SOFT_EXPIRE_MS: number = parseInt(process.env["KEYWORD_SOFT_EXPIRE_MS"] || "0") || 3600000;
    static KEYWORD_HARD_EXPIRE_MS: number = parseInt(process.env["KEYWORD_HARD_EXPIRE_MS"] || "0") || 86400000;

    static AUTH_COOKIE_SECRET: string = process.env["AUTH_COOKIE_SECRET"] || "irdh4efurwgi";
    static AUTH_PW_HASH_SALT: string = process.env["AUTH_PW_HASH_SALT"] || "defhruw4ijeofk33g";
    static AUTH_PW_HASH_CRYPT: string = process.env["AUTH_PW_HASH_CRYPT"] || "de34IH58Y5fhruw4ijeofk33g";
    static AUTH_SESSION_DURATION_MS: number = parseInt(process.env["AUTH_SESSION_DURATION_MS"] || "0") || 7200000;
    static AUTH_SESSION_RENEW_DURATION_MS: number = parseInt(process.env["AUTH_SESSION_RENEW_DURATION_MS"] || "0") || 720000;
    static AUTH_COOKIE_DURATION_MS: number = parseInt(process.env["AUTH_COOKIE_DURATION_MS"] || "0") || 86400000;
    static AUTH_JWT_PREFIX: string = process.env["AUTH_JWT_PREFIX"] || "ewuhireotgt";
    static AUTH_JWT_ISSUER: string = process.env["AUTH_JWT_ISSUER"] || "bogballs";
    static AUTH_JWT_COOKIE_NAME: string = process.env["AUTH_JWT_COOKIE_NAME"] || "sess";
}