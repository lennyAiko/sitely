module.exports = {


  friendlyName: 'Fetch',


  description: 'Fetch info.',


  inputs: {

  },


  exits: {

    success: {
      statusCode: 200,
      description: 'Fetched'
    },

    badCombo: {
      statusCode: 401,
      description: 'Invalid'
    }

  },


  fn: async function (inputs, exits) {

    let secret = this.req.secret

    if (!secret) {
      exits.badCombo({
        message: "Analytics info not found"
      })
    }

    let infoRecord = await Info.findOne({ secret })
    
    if (!infoRecord) {
      exits.badCombo({
        message: "Analytics info not found"
      })
    }

    // All done.
    return exits.success(infoRecord);

  }


};
