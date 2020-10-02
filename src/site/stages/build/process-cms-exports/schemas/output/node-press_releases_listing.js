const { usePartialSchema } = require('../../transformers/helpers');
const pressReleaseSchema = require('./node-press_release');

module.exports = {
  type: 'object',
  properties: {
    entityType: { type: 'string', enum: ['node'] },
    entityBundle: { type: 'string', enum: ['press_releases_listing'] },
    title: { type: 'string' },
    created: { type: 'number' },
    changed: { type: 'number' },
    metatag: { $ref: 'RawMetaTags' },
    path: { type: 'string' },
    fieldAdministration: { type: 'string' },
    fieldPressReleaseBlurb: { type: ['string', 'null'] },
    reverseFieldListingNode: {
      type: 'object',
      properties: {
        entities: {
          type: 'array',
          items: {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            entity: usePartialSchema(pressReleaseSchema, [
              'title',
              'fieldReleaseDate',
              'entityUrl',
              'promote',
              'created',
              'fieldIntroText',
              'entityPublished',
            ]),
          },
        },
      },
    },
    entityPublished: { type: 'boolean' },
    status: { type: 'boolean' },
    required: [
      'status',
      'title',
      'created',
      'changed',
      'metatag',
      'path',
      'fieldAdministration',
      'fieldIntroText',
      'reverseFieldListing',
    ],
  },
};
