import { GRes } from './lib/res';
import { MainEngine } from './engine/main';
import { Router, Request, Response, NextFunction } from 'express';
import { CookieEngine } from './engine/cookie';
export const api = Router();

api.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === "POST" && (!req.body)) {
        res.status(400).json(GRes.err("SERVER.WRONG_REQUEST", { tr: true }));
    }
    else {
        next();
    }
});

api.get("/", (req, res) => {
    res.json(MainEngine.getTrends());
});

api.post("/cookie", (req, res) => {
    const {name, value} = req.body;
    if(name && `${value}`){
        const done = CookieEngine.setCookie(name, value, res, 0);
        if(done){
            res.json(GRes.succ());
        }
        else{
            res.status(400).json(GRes.err("SERVER.WRONG_REQUEST", { tr: true }));
        }
    }
    else{
        res.status(400).json(GRes.err("SERVER.WRONG_REQUEST", { tr: true }));
    }
});