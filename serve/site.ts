import { config } from "dotenv";
config({
    quiet: true,
})

export class Site {
    static TITLE = () => process.env["TITLE"] || "Title";
    static BRAND = () => process.env["BRAND"] || "Brand";
    static ROOT = () => process.cwd() || __dirname;
    static PORT = () => parseInt(process.env["PORT"] || "0") || 3000;
    static PRODUCTION = () => (process.env["PRODUCTION"] || "").toLowerCase() == "true";
    static FORCE_FAMILY_4 = () => (process.env["FORCE_FAMILY_4"] || "").toLowerCase() == "true";
    static EXIT_ON_UNCAUGHT_EXCEPTION = () => (process.env["EXIT_ON_UNCAUGHT_EXCEPTION"] || "").toLowerCase() == "true";
    static EXIT_ON_UNHANDLED_REJECTION = () => (process.env["EXIT_ON_UNHANDLED_REJECTION"] || "").toLowerCase() == "true";
    static URL = () => Site.PRODUCTION() ? (process.env["PROD_URL"] || "") : `http://localhost:${Site.PORT()}`;
    static MAX_ALLOWED_FLOG_LOG_WEIGHT = () => parseInt(process.env["MAX_ALLOWED_FLOG_LOG_WEIGHT"] || "0") ?? 5;
    
    static MAIN_INTERVAL_MS = () => parseInt(process.env["MAIN_INTERVAL_MS"] || "0") || 5;
    static MAIN_USE = () => (process.env["MAIN_USE"] || "").toLowerCase() == "true";
    static MAIN_LOCAL_ABS_PATH_GKG = () => process.env["MAIN_LOCAL_ABS_PATH_GKG"] || "";
    static MAIN_LOCAL_ABS_PATH_EXPORT = () => process.env["MAIN_LOCAL_ABS_PATH_EXPORT"] || "";
    static MAIN_MAX_RECORDS = () => parseInt(process.env["MAIN_MAX_RECORDS"] || "0") || 5000;
    static MAIN_MAX_PARSED_ITEMS = () => parseInt(process.env["MAIN_MAX_PARSED_ITEMS"] || "0") || 1000;
    static MAIN_MAX_CATEGORIES = () => parseInt(process.env["MAIN_MAX_CATEGORIES"] || "0") || 5;
    static MAIN_MAX_KEYWORDS = () => parseInt(process.env["MAIN_MAX_KEYWORDS"] || "0") || 100;


    static KEYWORD_SOFT_EXPIRE_MS = () => parseInt(process.env["KEYWORD_SOFT_EXPIRE_MS"] || "0") || 3600000;
    static KEYWORD_HARD_EXPIRE_MS = () => parseInt(process.env["KEYWORD_HARD_EXPIRE_MS"] || "0") || 86400000;

    static AUTH_COOKIE_SECRET = () => process.env["AUTH_COOKIE_SECRET"] || "irdh4efurwgi";
    static AUTH_PW_HASH_SALT = () => process.env["AUTH_PW_HASH_SALT"] || "defhruw4ijeofk33g";
    static AUTH_PW_HASH_CRYPT = () => process.env["AUTH_PW_HASH_CRYPT"] || "de34IH58Y5fhruw4ijeofk33g";
    static AUTH_SESSION_DURATION_MS = () => parseInt(process.env["AUTH_SESSION_DURATION_MS"] || "0") || 7200000;
    static AUTH_SESSION_RENEW_DURATION_MS = () => parseInt(process.env["AUTH_SESSION_RENEW_DURATION_MS"] || "0") || 720000;
    static AUTH_COOKIE_DURATION_MS = () => parseInt(process.env["AUTH_COOKIE_DURATION_MS"] || "0") || 86400000;
    static AUTH_JWT_PREFIX = () => process.env["AUTH_JWT_PREFIX"] || "ewuhireotgt";
    static AUTH_JWT_ISSUER = () => process.env["AUTH_JWT_ISSUER"] || "bogballs";
    static AUTH_JWT_COOKIE_NAME = () => process.env["AUTH_JWT_COOKIE_NAME"] || "sess";

    static TRENDS_TOP_NUMBER = () => parseInt(process.env["TRENDS_TOP_NUMBER"] || "0") || 10;
    static SUPPORT_URL = () => process.env["SUPPORT_URL"] || "";
    static SUPPORT_EMAIL = () => process.env["SUPPORT_EMAIL"] || "";

}