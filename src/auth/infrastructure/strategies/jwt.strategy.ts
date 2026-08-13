import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Dynamically fetch the public key from Asgardio to verify the token signature
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://api.asgardeo.io/t/hiru616/oauth2/jwks',
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Your Asgardio Application Client ID
            audience: 'vMSyX0p1dSRABiF9unxHmKCz44Qa',
            issuer: 'https://api.asgardeo.io/t/hiru616/oauth2/token',
            algorithms: ['RS256'],
        });
    }

    // If the token is valid, this method runs. We map the payload to the request.
    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        // You can now access req.user.userId in any of your controllers!
        return { userId: payload.sub, username: payload.username, groups: payload.groups };
    }
}