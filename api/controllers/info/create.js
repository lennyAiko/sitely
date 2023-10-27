module.exports = {


  friendlyName: 'Create',


  description: 'Create info.',


  inputs: {

    secret: {
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      statusCode: 200,
      description: 'created'
    },

    badCombo: {
      statusCode: 401,
      description: 'invalid'
    }

  },


  fn: async function ({secret}, exits) {

    const info = await Info.create({ secret })
      .intercept('E_UNIQUE', () => {
        return exits.badCombo({
          error: 'Secret already exists'
        })
      })
      .fetch()

    // All done.
    return exits.success({
      status: 201,
      secret: info.secret,
      message: `Account has been created with "${info.secret}". Keep it safe`
    })

  }


};
