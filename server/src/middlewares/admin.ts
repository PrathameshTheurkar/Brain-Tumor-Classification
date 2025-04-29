import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface Payload {
    name: string;
    email: string;
}

export const generateAdminToken = async(payload: Payload) => {
    return jwt.sign(payload, (process.env.JWT_SECRET || ''), {
        expiresIn: '1d'
    });
}

export const authenticateAdminToken = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    jwt.verify(token, (process.env.JWT_SECRET || ''), (err: jwt.VerifyErrors | null, payload: any) => {
        if(err) {
            return res.status(403).json({
                msg: 'Unauthorized User'
            })
        }

        if(!payload) {
            return res.sendStatus(403);
        }

        if(typeof payload !== 'object') {
            return res.sendStatus(403);
        }

        if(!payload.name || !payload.email) {
            return res.sendStatus(403);
        }

        req.headers['admin'] = payload.email;
        next();
    })
};