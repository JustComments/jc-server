'use strict';

const Ajv = require('ajv');
const ajv = new Ajv();
const schema = {
  $id: 'https://just-comments.com/comment-input.json',
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-06/schema#',
  properties: {
    itemId: {
      $id: '/properties/itemId',
      type: 'string',
      title: 'The Itemid Schema ',
      default: '',
      examples: ['127.0.0.1/demo.html'],
      minLength: 1,
      maxLength: 2048,
    },
    originalItemId: {
      $id: '/properties/originalItemId',
      type: 'string',
      title: 'The Originalitemid Schema ',
      default: '',
      examples: ['127.0.0.1/demo.html'],
      minLength: 1,
      maxLength: 2048,
    },
    itemProtocol: {
      $id: '/properties/itemProtocol',
      type: 'string',
      title: 'The Itemprotocol Schema ',
      default: '',
      minLength: 1,
      maxLength: 32,
      examples: ['http:'],
    },
    itemPort: {
      $id: '/properties/itemPort',
      type: 'string',
      title: 'The Itemport Schema ',
      default: '',
      minLength: 0,
      maxLength: 16,
      examples: ['8080'],
    },
    commentId: {
      $id: '/properties/commentId',
      type: 'string',
      title: 'The Commentid Schema ',
      default: '',
      minLength: 1,
      maxLength: 128,
      examples: ['9f6c226d-f754-48e6-a8b0-d957719fd23c'],
    },
    message: {
      $id: '/properties/message',
      type: 'string',
      title: 'The Message Schema',
      default: '',
      minLength: 1,
      maxLength: 5000,
      examples: ['comment message'],
    },
    website: {
      $id: '/properties/website',
      type: 'string',
      title: 'The Website Schema ',
      default: '',
      examples: ['https://just-comments.com'],
      format: 'uri',
    },
    captchaResult: {
      $id: '/properties/captchaResult',
      type: 'string',
      title: 'captchaResult schema',
    },
    pageUrl: {
      $id: '/properties/pageUrl',
      type: 'string',
      title: 'pageUrl schema',
    },
    pageTitle: {
      $id: '/properties/pageTitle',
      type: 'string',
      title: 'pageTitle schema',
    },
    locale: {
      $id: '/properties/locale',
      type: 'string',
      title: 'locale schema',
    },
    timezone: {
      $id: '/properties/timezone',
      type: 'string',
      title: 'timezone schema',
    },
  },
  required: ['itemId', 'originalItemId', 'itemProtocol', 'itemPort', 'message'],
};

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

const validateComment = ajv.compile(schema);

module.exports = {
  validateComment,
};
