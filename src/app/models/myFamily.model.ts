export class RelationType {
  'lookup_member_relation_type_id'?: number;
  'display_value'?: string;
  'is_guest'?: boolean;
}
export class FamilyUser {
  'member_relation_id': number;
  'subscriber_member_id': number;
  'is_active': boolean;
  'status_display': string;
  'member_relation_type_id': number;
  'display_value': string;
  'invitation_code': string;
  'email': string;
}

export class GetMyFamilyResult {
  relationTypes: RelationType[];
  guestRelationTypes: RelationType[];
  familyUsers: FamilyUser[];
  guestUsers: FamilyUser[];
}
