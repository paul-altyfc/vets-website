import React from 'react';
import fullSchema from 'vets-json-schema/dist/28-1900-schema.json';
import { addressUISchema } from '../../../../../disability-benefits/686c-674/config/address-schema';

const { newAddress, isMoving, yearsOfEducation } = fullSchema.properties;

const newAddressUI = addressUISchema(
  true,
  'newAddress',
  formData => formData.isMoving,
);
// reset title for checkbox
newAddressUI['view:livesOnMilitaryBase']['ui:title'] =
  'I will live on a United States military base outside of the U.S.';

export const schema = {
  type: 'object',
  properties: {
    yearsOfEducation,
    isMoving,
    newAddress,
  },
};

export const uiSchema = {
  'ui:description': (
    <p>
      <strong>Giving this information is optional.</strong> If you skip this
      page, and we don't have this information in your record, we may ask you
      for this again when we process your application.
    </p>
  ),
  'ui:title': 'Additional Information',
  yearsOfEducation: {
    'ui:title': 'How many years of education do you have?',
    'ui:errorMessages': {
      pattern: 'Please enter a number',
    },
  },
  isMoving: {
    'ui:widget': 'yesNo',
    'ui:title': (
      <p className="vads-u-margin--0">
        Are you moving in the <strong>next 30 days?</strong>
      </p>
    ),
  },
  newAddress: {
    'ui:title': (
      <p className="vads-u-font-size--md vads-u-color--gray-dark vads-u-font-weight--bold">
        Your new address
      </p>
    ),
    ...newAddressUI,
    'ui:options': {
      expandUnder: 'isMoving',
      expandUnderCondition: true,
    },
  },
};
