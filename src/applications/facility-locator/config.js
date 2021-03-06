import environment from 'platform/utilities/environment';
import compact from 'lodash/compact';
import { LocationType, FacilityType } from './constants';
import manifest from './manifest.json';

// Base URL to be used in API requests.
export const api = {
  baseUrl: `${environment.API_URL}/v1/facilities`,
  url: `${environment.API_URL}/v1/facilities/va`,
  ccUrl: `${environment.API_URL}/v1/facilities/ccp`,
  allUrgentCareUrl: `${environment.API_URL}/v1/facilities/va_ccp/urgent_care`,
  settings: {
    credentials: 'include',
    headers: {
      'X-Key-Inflection': 'camel',

      // Pull app name directly from manifest since this config is defined
      // before startApp, and using window.appName here would result in
      // undefined for all requests that use this config.
      'Source-App-Name': manifest.entryName,
    },
  },
};

/**
 * Build parameters and URL for facilities API calls
 *
 */
export const resolveParamsWithUrl = (
  address,
  locationType,
  serviceType,
  page,
  bounds,
) => {
  const filterableLocations = ['health', 'benefits', 'provider'];
  let facility;
  let service;
  let url = api.url;
  let perPage = 20;

  switch (locationType) {
    case 'urgent_care':
      if (serviceType === 'UrgentCare') {
        facility = 'health';
        service = 'UrgentCare';
      } else if (serviceType === 'NonVAUrgentCare') {
        facility = 'urgent_care';
        url = api.ccUrl;
      } else {
        // MashUp coming up
        url = api.allUrgentCareUrl;
      }
      break;
    case 'pharmacy':
    case 'provider':
      facility = locationType;
      service = serviceType;
      url = api.ccUrl;
      perPage = 10; // because the PPMS back end requires a separate request for each facility
      break;
    default:
      facility = locationType;
      service = serviceType;
  }

  if (url === api.allUrgentCareUrl) {
    return {
      url,
      params: compact([
        address ? `address=${address}` : null,
        ...bounds.map(c => `bbox[]=${c}`),
        `page=${page}`,
        `per_page=${perPage}`,
      ]).join('&'),
    };
  }

  return {
    url,
    params: compact([
      address ? `address=${address}` : null,
      ...bounds.map(c => `bbox[]=${c}`),
      facility ? `type=${facility}` : null,
      filterableLocations.includes(facility) && service
        ? `${url === api.ccUrl ? 'specialties' : 'services'}[]=${service}`
        : null,
      `page=${page}`,
      `per_page=${perPage}`,
      facility === LocationType.VET_CENTER ? `exclude_mobile=true` : null,
      url === api.ccUrl ? `trim=true` : null,
    ]).join('&'),
  };
};

// Please use sentence case for all of these
// except 'Vet Centers' and acronyms like IDES.

export const facilityTypes = {
  [FacilityType.VA_HEALTH_FACILITY]: 'VA health',
  [FacilityType.URGENT_CARE]: 'Urgent care',
  [FacilityType.URGENT_CARE_PHARMACIES]:
    'Community pharmacies (in VA’s network)',
  [FacilityType.VA_CEMETARY]: 'VA cemeteries',
  [FacilityType.VA_BENEFITS_FACILITY]: 'Benefits',
  [FacilityType.VET_CENTER]: 'Vet Centers',
  [LocationType.HEALTH]: 'VA health',
  [LocationType.CC_PROVIDER]: 'Community providers (in VA’s network)',
  [LocationType.CEMETARY]: 'VA cemeteries',
  [LocationType.BENEFITS]: 'VA benefits',
};

export const healthServices = {
  All: 'All VA health services',
  PrimaryCare: 'Primary care',
  MentalHealthCare: 'Mental health care',
  DentalServices: 'Dental services',
  UrgentCare: 'Urgent care',
  EmergencyCare: 'Emergency care',
  Audiology: 'Audiology',
  Cardiology: 'Cardiology',
  Dermatology: 'Dermatology',
  Gastroenterology: 'Gastroenterology',
  Gynecology: 'Gynecology',
  Ophthalmology: 'Ophthalmology',
  Optometry: 'Optometry',
  Orthopedics: 'Orthopedics',
  Urology: 'Urology',
  WomensHealth: "Women's health",
};

export const ccUrgentCareLabels = {
  UrgentCare: 'URGENT CARE',
  WalkIn: 'RETAIL/WALK-IN CARE',
};

export const urgentCareServices = {
  AllUrgentCare: 'All urgent care',
  UrgentCare: 'VA urgent care',
  NonVAUrgentCare: 'Community urgent care providers (in VA’s network)',
};

export const benefitsServices = {
  All: 'All VA benefit services',
  ApplyingForBenefits: 'Applying for benefits',
  BurialClaimAssistance: 'Burial claim help',
  DisabilityClaimAssistance: 'Disability claim help',
  eBenefitsRegistrationAssistance: 'eBenefits registration help',
  EducationAndCareerCounseling: 'Education and career counseling',
  EducationClaimAssistance: 'Education claim help',
  FamilyMemberClaimAssistance: 'Family member claim help',
  HomelessAssistance: 'Help for homeless Veterans',
  VAHomeLoanAssistance: 'VA home loan help',
  InsuranceClaimAssistanceAndFinancialCounseling:
    'Insurance claim help and financial counseling',
  IntegratedDisabilityEvaluationSystemAssistance:
    'Integrated Disability Evaluation System Assistance (IDES)',
  Pensions: 'Pensions',
  PreDischargeClaimAssistance: 'Pre-discharge claim help',
  TransitionAssistance: 'Transition help',
  UpdatingDirectDepositInformation: 'Updating direct deposit information',
  VocationalRehabilitationAndEmploymentAssistance:
    'Vocational rehabilitation and employment help',
};

export const vetCenterServices = [
  'Individual and group counseling for Veterans, service members, and their families',
  'Family counseling for military related issues',
  'Bereavement (grief) counseling',
  'Military sexual trauma counseling and referral',
  'Community outreach and education',
  'Substance abuse assessment and referral',
  'Employment referral',
  'Referral of other VA services',
];

export const facilityTypesOptions = {
  [LocationType.NONE]: 'Choose a facility type',
  [LocationType.HEALTH]: 'VA health',
  [LocationType.URGENT_CARE]: 'Urgent care',
  [LocationType.CC_PROVIDER]: 'Community providers (in VA’s network)',
  [LocationType.URGENT_CARE_PHARMACIES]:
    'Community pharmacies (in VA’s network)',
  [LocationType.BENEFITS]: 'VA benefits',
  [LocationType.CEMETARY]: 'VA cemeteries',
  [LocationType.VET_CENTER]: 'Vet Centers',
};
