export class SignupRequestModel {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    acceptTerms?: boolean;
    acceptTermsDate?: boolean;
    languageCodeId?: number;
    optInEmail?: boolean;
    optInSms?: boolean;
    address1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    longitude?: number;
    latitude?: number;
    sameBillingAddress?: boolean;
    planId?: number;
    currentStep: number;
}

export class SignupResult {
    memberId?: number;
}
