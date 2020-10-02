/* eslint-disable camelcase */

module.exports = {
  type: 'object',
  properties: {
    status: { $ref: 'GenericNestedBoolean' },
    title: { $ref: 'GenericNestedString' },
    created: { $ref: 'GenericNestedString' },
    changed: { $ref: 'GenericNestedString' },
    metatag: { $ref: 'RawMetaTag' },
    path: { $ref: 'GenericNestedString' },
    field_administration: { $ref: 'GenericNestedString' },
    field_intro_text: { $ref: 'GenericNestedString' },
    reverse_field_listing: { $ref: 'EntityReferenceArray' },
  },
  required: [
    'status',
    'title',
    'created',
    'changed',
    'metatag',
    'path',
    'field_administration',
    'field_intro_text',
    'reverse_field_listing',
  ],
};
