const { getDrupalValue } = require('./helpers');

const transform = entity => ({
  entityType: 'node',
  entityBundle: 'press_releases_listing',
  status: getDrupalValue(entity.status),
  title: getDrupalValue(entity.title),
  created: getDrupalValue(entity.created),
  changed: getDrupalValue(entity.changed),
  metatag: getDrupalValue(entity.metatag),
  path: getDrupalValue(entity.path),
  fieldAdministration: getDrupalValue(entity.fieldAdministration),
  fieldIntroText: getDrupalValue(entity.fieldIntroText),
  reverseFieldListing: getDrupalValue(entity.reverseFieldListing),
});

module.exports = {
  filter: [
    'status',
    'title',
    'created',
    'changed',
    'metatag',
    'path',
    'fieldAdministration',
    'fieldIntroText',
    'reverse_field_listing',
  ],
  transform,
};
