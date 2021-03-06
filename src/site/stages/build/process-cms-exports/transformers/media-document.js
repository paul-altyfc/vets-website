const transform = entity => ({
  entityType: 'media',
  entityBundle: 'document',
  fieldDocument: {
    entity: {
      filename: entity.fieldDocument[0].filename,
      url: entity.fieldDocument[0].url,
    },
  },
});

module.exports = {
  filter: ['name', 'path', 'field_document'],
  transform,
};
