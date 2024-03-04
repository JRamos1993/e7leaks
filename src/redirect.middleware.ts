import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const targetDomain = 'https://e7leaks.pages.dev/';
        const fullPath = targetDomain + req.originalUrl;
        res.redirect(301, fullPath);
    }
}
