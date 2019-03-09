export class LookupModel {
    'lookup_allergy_id'?: number;
    'lookup_condition_id'?: number;
    'display_value': string;
    'is_common': boolean;
    'selected': boolean;
}

export class AllergiesModel{
    common_allergies: Array<AllergiesModel>;
    uncommon_allergies: Array<AllergiesModel>;
}

export class ConditionsModel{
    common_conditions: Array<ConditionsModel>;
    uncommon_conditions: Array<ConditionsModel>;
}