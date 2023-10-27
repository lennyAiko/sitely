module.exports = async function (req, res, proceed) {

  var secret;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');

    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        secret = credentials;
      }

    } else {
      return res.status(401).json({err: 'Format is unauthorized: Bearer [secret]'});
    }
  } else {
    return res.status(401).json({err: 'No secret was found'});
  }


  req.secret = secret

  proceed()


}