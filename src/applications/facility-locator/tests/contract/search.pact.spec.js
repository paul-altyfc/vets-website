import contractTest from 'platform/testing/contract';

import { fetchLocations } from '../../actions';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';
import sinon from 'sinon';

const bounds = ['-112.54', '32.53', '-111.04', '34.03'];

/* eslint-disable camelcase */
const interaction = {
  state: 'facilities: ccp data exists',
  uponReceiving: 'a request for ccp data',
  withRequest: {
    method: 'GET',
    path: '/v1/facilities/ccp',
    headers: {
      'X-Key-Inflection': 'camel',
    },
    query: {
      'bbox[]': bounds,
      type: 'pharmacy',
      page: '1',
      per_page: '10',
      trim: 'true',
    },
  },
  willRespondWith: {
    status: 200,
    body: {
      data: eachLike({
        id: '1972660348',
        type: 'provider',
        attributes: {
          acc_new_patients: 'false',
          address: {
            street: '2750 E GERMANN RD',
            city: 'CHANDLER',
            state: 'AZ',
            zip: '85249',
          },
          caresite_phone: '4808122942',
          email: 'ENROLLM@WAL-MART.COM',
          gender: 'NotSpecified',
          lat: 33.281291,
          long: -111.793486,
          name: 'WAL-MART',
          unique_id: '1972660348',
        },
        relationships: {
          specialties: {
            data: [
              {
                id: '3336C0003X',
                type: 'specialty',
              },
            ],
          },
        },
      }),
    },
  },
};

const dispatch = sinon.stub();

contractTest('Facility Locator', 'VA.gov API', mockApi => {
  describe('GET /v1/facilities/ccp', () => {
    before(() => {
      window.disableMockLocatorApi = true;
    });

    context('facilities: ccp data exists', () => {
      it('responds with status 200 for pharmacy', async () => {
        mockApi.addInteraction(interaction);
        await fetchLocations(null, bounds, 'pharmacy', null, 1, dispatch);
      });
    });
  });
});
