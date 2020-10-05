import React from 'react';
import { expect } from 'chai';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import _ from 'lodash';

import ContactInformationPage from '../../../../config/pages/contactInformationPage';
import AskAQuestionFormConfig from '../../../../config/form';

import {DefinitionTester} from "platform/testing/unit/schemaform-utils";
import fullName from 'platform/forms-system/src/js/definitions/fullName';
import { uiSchema as addressUI } from '../../../../contactInformation/address/address';
import {preferredContactMethodTitle} from "../../../../content/labels";

const address = addressUI();

describe("Contact Information Page", () => {

    it('should require full name', () => {
        const {getByLabelText} = render(
            <DefinitionTester
                schema={ContactInformationPage.schema}
                uiSchema={ContactInformationPage.uiSchema}
                definitions={AskAQuestionFormConfig.defaultDefinitions}
            />);

        const firstName = getByLabelText(fullName.first["ui:title"], { exact: false });
        const lastName = getByLabelText(fullName.last["ui:title"], { exact: false });

        expect(firstName).to.have.property('required', true);
        expect(lastName).to.have.property('required', true);
    });

    it("should require preferred contact method", () => {
        const {getByText} = render(
            <DefinitionTester
                schema={ContactInformationPage.schema}
                uiSchema={ContactInformationPage.uiSchema}
                definitions={AskAQuestionFormConfig.defaultDefinitions}
            />);

        const preferredContactMethod = getByText(preferredContactMethodTitle, { exact: false });

        expect(preferredContactMethod).to.contain.text("Required");
    });

    it("should require country", () => {
        const {getByLabelText} = render(
            <DefinitionTester
                schema={ContactInformationPage.schema}
                uiSchema={ContactInformationPage.uiSchema}
                definitions={AskAQuestionFormConfig.defaultDefinitions}
            />);

        const country = getByLabelText(address.country["ui:title"], { exact: false });

        expect(country).to.have.property('required', true);
    });

    it('should require email when preferred contact method is email', async () => {
        const {getAllByLabelText, getByText} = render(
            <DefinitionTester
                schema={ContactInformationPage.schema}
                uiSchema={ContactInformationPage.uiSchema}
                definitions={AskAQuestionFormConfig.defaultDefinitions}
            />
        );

        fireEvent.click(getByText("Email (Recommended)"));

        const emails = getAllByLabelText("Email address", {exact: false});
        expect(emails.length).to.equal(2);
        expect(emails[0]).to.have.property("required", true);
        expect(emails[0]).to.have.property("required", true);
    });



});