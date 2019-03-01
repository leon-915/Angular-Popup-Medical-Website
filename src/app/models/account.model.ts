

    export interface Payload {
        sub: string;
        email_verified: boolean;
        iss: string;
        phone_number_verified: boolean;
        'cognito:username': string;
        given_name: string;
        aud: string;
        event_id: string;
        token_use: string;
        auth_time: number;
        phone_number: string;
        exp: number;
        iat: number;
        family_name: string;
        email: string;
    }

    export class IdToken {
        jwtToken: string;
        payload: Payload;
    }

    export interface RefreshToken {
        token: string;
    }

    export interface Payload2 {
        sub: string;
        event_id: string;
        token_use: string;
        scope: string;
        auth_time: number;
        iss: string;
        exp: number;
        iat: number;
        jti: string;
        client_id: string;
        username: string;
    }

    export interface AccessToken {
        jwtToken: string;
        payload: Payload2;
    }

    export interface AccountResult {
        idToken: IdToken;
        refreshToken: RefreshToken;
        accessToken: AccessToken;
        clockDrift: number;
    }





