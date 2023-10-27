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

    console.log(secret, toUpdate)

    let infoRecord = await Info.findOne({ secret })

    if (!infoRecord) {
      exits.badCombo({
        message: "Analytics info not found"
      })
    }

    let userPageViews = infoRecord.pageViews + 1
    let userVisits = infoRecord.visits
    if (toUpdate === 'vp') { userVisits = infoRecord.visits + 1 }

    let updateInfo = await Info.updateOne({ secret: infoRecord.secret })
    .set({ 
      pageViews: userPageViews, visits: userVisits
    })

    console.log(updateInfo)
    // All done.
    return exits.success({
      message: 'updated'
    });

  }


};
