import columnsSchema from '../columns/columns.schema';

const boardsSchema = {
  type: 'object',
  required: ['title', 'columns'],
  additionalProperties: false,
  properties: {
    title: {
      type: 'string',
      minLength: 1,
    },
    columns: {
      type: 'array',
      minLength: 0,
      items: columnsSchema,
    },
  },
};

export default boardsSchema;
