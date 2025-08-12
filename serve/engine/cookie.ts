import { Request, Response } from 'express';
import { Site } from "../site"
import { allowedCookies } from '../model/allowedCookies';

export class CookieEngine {
    static cookieOpts = (): any => {
        return {
            httpOnly: true,
            secure: Site.PRODUCTION ? true : false,
            sameSite: 'none',
            signed: true
        }
    }

    static cookieExp = (durationMS: number) => {
        return (new Date(Number(new Date()) + Number(durationMS)));
    }

    static setCookie = (name: string, value: string, res: Response, duration: number = Site.AUTH_COOKIE_DURATION_MS) => {
        if (allowedCookies[name] && allowedCookies[name].test(value)) {
            let cookOpts = CookieEngine.cookieOpts();
            const exp = duration ? CookieEngine.cookieExp(duration) : new Date(2147483647000);
            cookOpts.expires = exp;
            res.cookie(name, value, cookOpts);
            // for legacy support
            let cop_opts = CookieEngine.cookieOpts();
            delete cop_opts.sameSite;
            cop_opts.expires = exp;
            // set legacy cookies here
            res.cookie(name + "_legacy", value, cop_opts);
            return true;
        }
        return false;
    }

    static getCookie = (name: string, req: Request): string | null => {
        if(allowedCookies[name]){
            let c = req.signedCookies[name];
            // for legacy.. to support older browsers
            let cl = req.signedCookies[name + "_legacy"];
            return c || cl;
        }
        return null;
    }

    static deleteCookie = (name: string, req: Request, res: Response) => {
        if(allowedCookies[name]){
            if(req.signedCookies[name]){
                res.clearCookie(name);
            }
            if(req.signedCookies[name + "_legacy"]){
                res.clearCookie(name + "_legacy")
            }
            return true;
        }
        return false;
    }
}