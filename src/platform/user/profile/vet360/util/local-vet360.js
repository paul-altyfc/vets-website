import { uniqueId } from 'lodash';
import * as VET360_CONSTANTS from '../constants';

export function isVet360Configured() {
  return [
    'staging.vets.gov',
    'www.vets.gov',
    'dev.va.gov',
    'preview.va.gov',
    'staging.va.gov',
    'va.gov',
    'www.va.gov',
  ].includes(document.location.hostname);
}

export const mockContactInformation = {
  email: {
    id: 100,
    emailAddress: 'veteran@gmail.com',
  },
  mobilePhone: {
    areaCode: '503',
    countryCode: '1',
    createdAt: '2018-04-21T20:09:50Z',
    effectiveEndDate: '2018-04-21T20:09:50Z',
    effectiveStartDate: '2018-04-21T20:09:50Z',
    extension: '0000',
    id: 123,
    isInternational: false,
    isTextable: true,
    isTextPermitted: false,
    isTty: true,
    isVoicemailable: true,
    phoneNumber: '5551234',
    phoneType: 'MOBILE',
    sourceDate: '2018-04-21T20:09:50Z',
    updatedAt: '2018-04-21T20:09:50Z',
  },
  homePhone: {
    areaCode: '503',
    countryCode: '1',
    createdAt: '2018-04-21T20:09:50Z',
    effectiveEndDate: '2018-04-21T20:09:50Z',
    effectiveStartDate: '2018-04-21T20:09:50Z',
    extension: '0000',
    id: 123,
    isInternational: false,
    isTextable: false,
    isTextPermitted: false,
    isTty: true,
    isVoicemailable: true,
    phoneNumber: '2222222',
    phoneType: 'HOME',
    sourceDate: '2018-04-21T20:09:50Z',
    updatedAt: '2018-04-21T20:09:50Z',
  },
  workPhone: null,
  faxNumber: null,
  temporaryPhone: {
    areaCode: '503',
    countryCode: '1',
    createdAt: '2018-04-21T20:09:50Z',
    effectiveEndDate: '2018-04-21T20:09:50Z',
    effectiveStartDate: '2018-04-21T20:09:50Z',
    extension: '0000',
    id: 123,
    isInternational: false,
    isTextable: false,
    isTextPermitted: false,
    isTty: true,
    isVoicemailable: true,
    phoneNumber: '5555555',
    phoneType: 'MOBILE',
    sourceDate: '2018-04-21T20:09:50Z',
    updatedAt: '2018-04-21T20:09:50Z',
  },
  mailingAddress: {
    addressLine1: '1493 Martin Luther King Rd',
    addressLine2: 'string',
    addressLine3: 'string',
    addressPou: 'CORRESPONDENCE',
    addressType: 'domestic',
    city: 'Fulton',
    countryName: 'United States',
    countryCodeFips: 'US',
    countryCodeIso2: 'US',
    countryCodeIso3: 'USA',
    createdAt: '2018-04-21T20:09:50Z',
    effectiveEndDate: '2018-04-21T20:09:50Z',
    effectiveStartDate: '2018-04-21T20:09:50Z',
    id: 123,
    internationalPostalCode: '54321',
    province: 'string',
    sourceDate: '2018-04-21T20:09:50Z',
    stateCode: 'NY',
    updatedAt: '2018-04-21T20:09:50Z',
    zipCode: '97062',
    zipCodeSuffix: '1234',
  },
  residentialAddress: {
    addressLine1: 'PSC 808 Box 37',
    addressLine2: '',
    addressLine3: '',
    addressPou: 'RESIDENCE/CHOICE',
    addressType: 'MILITARY OVERSEAS',
    city: 'FPO',
    countryName: 'United States',
    countryCodeFips: 'US',
    countryCodeIso2: 'US',
    countryCodeIso3: 'USA',
    createdAt: '2018-04-21T20:09:50Z',
    effectiveEndDate: '2018-04-21T20:09:50Z',
    effectiveStartDate: '2018-04-21T20:09:50Z',
    id: 124,
    internationalPostalCode: '54321',
    province: 'string',
    sourceDate: '2018-04-21T20:09:50Z',
    stateCode: 'AE',
    updatedAt: '2018-04-21T20:09:50Z',
    zipCode: '09618',
    zipCodeSuffix: '1234',
  },
};

function asyncReturn(returnValue, delay = 300) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(returnValue);
    }, delay);
  });
}

export default {
  getUserTransactions() {
    const data = [
      VET360_CONSTANTS.TRANSACTION_CATEGORY_TYPES.ADDRESS,
      VET360_CONSTANTS.TRANSACTION_CATEGORY_TYPES.EMAIL,
      VET360_CONSTANTS.TRANSACTION_CATEGORY_TYPES.PHONE,
    ]
      .filter(() => Math.random() > 0.5)
      .map(transactionType => ({
        attributes: {
          transactionId: uniqueId('transaction_'),
          transactionStatus: VET360_CONSTANTS.TRANSACTION_STATUS.RECEIVED,
          type: transactionType,
        },
      }));

    return {
      data,
    };
  },
  createTransaction() {
    return asyncReturn({
      data: {
        attributes: {
          transactionId: uniqueId('transaction_'),
          transactionStatus: VET360_CONSTANTS.TRANSACTION_STATUS.RECEIVED,
        },
      },
    });
  },
  updateTransactionRandom(...args) {
    return asyncReturn(
      Math.random() > 0.5
        ? this.updateTransaction(...args)
        : this.updateTransactionToFailure(...args),
      3000,
    );
  },
  updateTransaction(transactionId) {
    return asyncReturn({
      data: {
        attributes: {
          transactionId,
          transactionStatus:
            VET360_CONSTANTS.TRANSACTION_STATUS.COMPLETED_SUCCESS,
        },
      },
    });
  },
  updateTransactionToFailure(transactionId, code = 'VET360_CORE100') {
    return {
      data: {
        attributes: {
          transactionStatus: VET360_CONSTANTS.TRANSACTION_STATUS.REJECTED,
          transactionId,
          type: 'AsyncTransaction::Vet360::MockedTransaction',
          metadata: [
            {
              code,
              key: '_CUF_NOT_FOUND',
              severity: 'ERROR',
              text: 'The tx for id/criteria XZY could not be found.',
            },
          ],
        },
      },
    };
  },
  addressValidationSuccessSingleConfirmedSuggestion() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '400 N 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98103',
              zipCodeSuffix: '5252',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation: 'CONFIRMED',
            },
          },
        ],
        validationKey: -245128725,
      },
      1000,
    );
  },
  addressValidationSuccessSingleMissingUnitNumber() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '400 N 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98103',
              zipCodeSuffix: '5252',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation:
                'STREET_NUMBER_VALIDATED_BUT_MISSING_UNIT_NUMBER',
            },
          },
        ],
        validationKey: -245128725,
      },
      1000,
    );
  },
  addressValidationSuccessSingleBadUnitNumber() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '400 N 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98103',
              zipCodeSuffix: '5252',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation:
                'STREET_NUMBER_VALIDATED_BUT_BAD_UNIT_NUMBER',
            },
          },
        ],
        validationKey: -245128725,
      },
      1000,
    );
  },
  // This is the response we are now getting when we enter total garbage data and the address can't be found. It seems to replace the ADDRVAL112 error response that we used to get for "bad" addresses
  addressValidationSuccessSingleBadAddress() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '123 McGee',
              addressType: 'UNKNOWN',
              city: 'San Francisco',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              stateCode: 'CA',
              zipCode: '94122',
            },
            addressMetaData: {
              confidenceScore: 0.0,
              addressType: 'Unknown',
              deliveryPointValidation: 'MISSING_ZIP',
            },
          },
        ],
        validationKey: -245128725,
      },
      1000,
    );
  },
  addressValidationSuccessSingleBadAddressNoValidationKey() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '123 McGee',
              addressType: 'UNKNOWN',
              city: 'San Francisco',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              stateCode: 'CA',
              zipCode: '94122',
            },
            addressMetaData: {
              confidenceScore: 0.0,
              addressType: 'Unknown',
              deliveryPointValidation: 'MISSING_ZIP',
            },
          },
        ],
      },
      1000,
    );
  },
  addressValidationSuccess() {
    return asyncReturn(
      {
        addresses: [
          {
            address: {
              addressLine1: '400 N 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98103',
              zipCodeSuffix: '5252',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation: 'UNDELIVERABLE',
            },
          },
          {
            address: {
              addressLine1: '400 NW 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98117',
              zipCodeSuffix: '5026',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation: 'CONFIRMED',
              residentialDeliveryIndicator: 'RESIDENTIAL',
            },
          },
          {
            address: {
              addressLine1: '400 NW 65th Street',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98117',
              zipCodeSuffix: '5026',
            },
            addressMetaData: {
              confidenceScore: 100.0,
              addressType: 'Domestic',
              deliveryPointValidation: 'CONFIRMED',
              residentialDeliveryIndicator: 'RESIDENTIAL',
            },
          },
          {
            address: {
              addressLine1: '400 NE 65th St',
              addressType: 'DOMESTIC',
              city: 'Seattle',
              countryName: 'United States',
              countryCodeIso3: 'USA',
              countyCode: '53033',
              countyName: 'King',
              stateCode: 'WA',
              zipCode: '98115',
              zipCodeSuffix: '6463',
            },
            addressMetaData: {
              confidenceScore: 98.0,
              addressType: 'Domestic',
              deliveryPointValidation:
                'STREET_NUMBER_VALIDATED_BUT_MISSING_UNIT_NUMBER',
              residentialDeliveryIndicator: 'RESIDENTIAL',
            },
          },
        ],
        validationKey: 12345,
      },
      1000,
    );
  },
};
