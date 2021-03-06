import PageDescription from './PageDescription';
import SectionHeader from './SectionHeader';

/* --------------- Inquiry --------------- */

export const inquiryPageDescription = PageDescription('Your message');
export const topicTitle =
  'Which topic best describes your question or message?';
export const topicDescription =
  'Please start typing below. If you do not find a match, type space to see all possible categories';
export const topicErrorMessage = 'Please enter a valid topic.';
export const inquiryTypeTitle = "Tell us the reason you're contacting us";
export const queryTitle = 'Please enter your question or message below';

/* --------------- Veteran Information --------------- */

/* Veteran Status Information */
export const veteranStatusSectionDescription = SectionHeader(
  'Veteran Service Information',
);
export const veteranStatusTitle = 'My message is about benefits/services';
export const isDependentTitle = 'Are you the dependent?';
export const relationshipToVeteranTitle = 'Your relationship to the Veteran';
export const isDeceasedTitle = 'Is the Veteran deceased?';
export const dateOfDeathTitle = 'Date of Death if known';
export const branchOfServiceTitle = 'Branch of service';

/* Additional Veteran Information */
export const dateOfBirthTitle = 'Date of Birth';
export const socialSecurityNumberTitle = 'Social Security number';
export const serviceStartDateTitle = 'Service start date';
export const claimNumberTitle = 'Claim number';
export const serviceEndDateTitle = 'Service end date';
export const serviceNumberTitle = 'Service number';

/* Additional Veteran Errors */
export const socialSecurityNumberPatternErrorMessage =
  'Please enter a valid Social Security Number';
export const serviceNumberPatternErrorMessage =
  'Please enter a valid Service Number';
export const claimNumberPatternErrorMessage =
  'Please enter a valid Claim Number';
export const serviceDateRangeErrorMessage =
  'End of service must be after start of service';

/* --------------- Contact Information --------------- */

export const contactInformationPageDescription = PageDescription(
  'Your contact info',
);
export const preferredContactMethodTitle =
  'How should we get in touch with you?';
export const phoneTitle = 'Daytime phone';

/* Address fields */
export const countryTitle = 'Country';
export const stateTitle = 'State';
export const canadaStateTitle = 'Province';
export const streetTwoTitle = 'Line 2';
export const streetThreeTitle = 'Line 3';
export const cityTitle = 'City';
export const postalCodeTitle = 'Postal code';
export const zipCodeTitle = 'Zip code';

/* Address error messages */
export const stateOrProvinceMissingErrorMessage =
  'Please enter a state or province, or remove other address information.';
export const stateOrProvinceErrorMessage = 'Please select a state or province';
export const stateErrorMessage = 'Please enter a state';
export const streetErrorMessage = 'Please enter a street address';
export const cityErrorMessage = 'Please enter a city';
export const postalCodeErrorMessage = 'Please provide a valid postal code';
export const zipCodeRequiredErrorMessage = 'Please enter a zip code';
export const zipCodePatternErrorMessage =
  'Please enter a valid 5- or 9-digit zip code (dashes allowed)';
