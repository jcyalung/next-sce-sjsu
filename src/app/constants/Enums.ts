const eventModalState = {
  SUBMIT: 0,
  EDIT: 1
};

export const memberApplicationState = {
  SELECT_MEMBERSHIP_PLAN: 0,
  FORM_INFO: 1,
  CONFIRMATION: 2
};

export const membershipPlans = {
  SEMESTER: 1,
  YEAR: 2
};

export const itemCategories = {
  DRINK: 'DRINK',
  SNACK: 'SNACK',
  ELECTRONICS: 'ELECTRONICS'
};

export const membershipStates = {
  BANNED: -2,
  PENDING: -1,
  NON_MEMBER: 0,
  ALUMNI: 0.5,
  MEMBER: 1,
  OFFICER: 2,
  ADMIN: 3,
};

const membershipStatusArray = [
  'Ban',
  'Pending',
  'Nonmember',
  'Alumni',
  'Member',
  'Officer',
  'Admin',
];

export function membershipStateToString(accessLevel: number) {
  if (accessLevel === membershipStates.ALUMNI)
    return 'Alumni';
  else if (accessLevel > 0)
    return membershipStatusArray[accessLevel + 3];
  return membershipStatusArray[accessLevel + 2];
}

const userFilterType = {
  VALID: 0,
  NON_VALID: 1,
  ALL: 2
};

const DEFAULT_PICS = {
  EVENT: 'https://i.gyazo.com/640f22609f95f72a28afa0a130e557a1.png',
  INVENTORY: 'https://user-images.githubusercontent.com/25803515/9' +
    '9110346-1ce92000-259f-11eb-97df-7ed5c2284ef3.png'
};
