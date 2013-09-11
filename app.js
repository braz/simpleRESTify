var restify = require('restify')
  , userSave = require('save')('user')

var server = restify.createServer({ name: 'simpleRESTify' })

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get('/user/:id', function (req, res, next) {
  userSave.findOne({ _id: req.params.id }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    if (user) {
      res.send(user)
    } else {
      res.send(404)
    }
  })
})

server.post('/user', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.create({ name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send(201, user)
  })
})

server.put('/user/:id', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.update({ _id: req.params.id, name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send()
  })
})

server.del('/user/:id', function (req, res, next) {
  userSave.delete(req.params.id, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send()
  })
})

server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url)
})