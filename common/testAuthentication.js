/* eslint-env node, mocha */
var config = require('./config').getConfig()
var preparedRequest = require('./preparedRequest')

function testAuthentication (handler, verb, apiVersion) {
  if (!apiVersion) {
    apiVersion = '2.13'
  }
  if (apiVersion !== '2.13') {
    throw Error('testAuthentication doesn\'t support this api version')
  }

  if (config.authentication === 'basic') {
    it('should reject unauthorized requests with 401', function (done) {
      if (verb === 'GET') {
        preparedRequest()
          .get(handler)
          .set('X-Broker-API-Version', apiVersion)
          .expect(401, done)
      } else if (verb === 'PUT') {
        preparedRequest()
          .put(handler)
          .set('X-Broker-API-Version', apiVersion)
          .send({})
          .expect(401, done)
      } else if (verb === 'PATCH') {
        preparedRequest()
          .patch(handler)
          .set('X-Broker-API-Version', apiVersion)
          .send({})
          .expect(401, done)
      } else if (verb === 'DELETE') {
        preparedRequest()
          .delete(handler)
          .set('X-Broker-API-Version', apiVersion)
          .send({})
          .expect(401, done)
      }
    })
    it('should reject bad credentials with 401', function (done) {
      if (verb === 'GET') {
        preparedRequest()
          .get(handler)
          .set('X-Broker-API-Version', apiVersion)
          .auth('spock', 'spockpass')
          .expect(401, done)
      } else if (verb === 'PUT') {
        preparedRequest()
          .put(handler)
          .set('X-Broker-API-Version', apiVersion)
          .auth('spock', 'spockpass')
          .send({})
          .expect(401, done)
      } else if (verb === 'PATCH') {
        preparedRequest()
          .patch(handler)
          .set('X-Broker-API-Version', apiVersion)
          .auth('spock', 'spockpass')
          .send({})
          .expect(401, done)
      } else if (verb === 'DELETE') {
        preparedRequest()
          .delete(handler)
          .set('X-Broker-API-Version', apiVersion)
          .auth('spock', 'spockpass')
          .expect(401, done)
      }
    })
  }
}

module.exports = testAuthentication
