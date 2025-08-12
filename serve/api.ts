import { MainEngine } from './engine/main';
import { Router, Request, Response, NextFunction } from 'express';

export const api = Router();

api.get("/", (req, res) => {
    res.json(MainEngine.getTrends());
})