/**
 * Info.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    secret: {
      type: 'string',
      unique: true,
      required: true,
      description: 'This secret will be your key to access your data, no log in or auth required. Just make sure you keep it safe, power is in your hands.',
      example: '@ihwiki2023'
    },

    pageViews: {
      type: 'number',
      description: 'This counts the page views'
    },

    visits: {
      type: 'number',
      description: 'This counts your visits'
    }

  },

};

