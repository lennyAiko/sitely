module.exports = {


  friendlyName: 'Update',


  description: 'Update info.',


  inputs: {

    toUpdate: {
      type: 'string'
    }

  },


  exits: {

    success: {
      statusCode: 200,
      description: 'updated'
    },

    badCombo: {
      statusCode: 401,
      description: 'invalid param'
    }

  },


  fn: async function ({toUpdate}, exits) {

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

    let userPageViews = infoRecord.pageViews + 1
    let userVisits = infoRecord.visits
    if (toUpdate === 'vp') { userVisits = infoRecord.visits + 1 }

    await Info.updateOne({ secret: infoRecord.secret })
    .set({ 
      pageViews: userPageViews, visits: userVisits
    })

    // All done.
    return exits.success({
      message: 'updated'
    });

  }


};
