export class LookupModel {
    'lookup_allergy_id'?: number;
    'lookup_condition_id'?: number;
    'display_value': string;
    'is_common': boolean;
    'selected': boolean;
}

export class AllergiesModel {
    'common_allergies': Array<LookupModel> = [];
    'uncommon_allergies': Array<LookupModel> = [];
}

export class ConditionsModel {
    'common_conditions': Array<LookupModel>;
    'uncommon_conditions': Array<LookupModel>;
}
