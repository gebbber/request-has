# request-has v0.0.2

Simple request body / session validation middleware for Express

## Quick Start

```javascript
const app = express();
const {bodyMustHave, sessionMustHave} = require('request-has');

const {logIn, logOut} = require('./auth/log-in-log-out.js');

app.get('/log-in', bodyMustHave('username password'), logIn);
app.get('/log-out', sessionMustHave('userId'), logOut);

app.get('/profile', ifSessionHas('emailUserId'), emailUserProfile);
app.get('/profile', ifSessionHas('regularUserId'), regularUserProfile);

```

The following functions are available:
- `bodyMustHave(properties)`: Stops the request if there is no request body, or if properties are missing. Returns status code `400` (`Bad Request`) with the message `"No request body"` or a list of missing body property names.
- `ifBodyHas(properties)`: Validates the request body in the same way, but proceeds to the next route if the criteria is not met.
- `sessionMustHave(properties)`: Stops the request if there is no `req.session` or if any listed properties are missing. Returns status code `401` (`Unauthorized`) with only a message `"Unauthorized"`.
- `sessionMustHave(properties, errCode)`: Validates the `req.session` object in the same way, but uses `errCode` for the status code and sends the standard message.
- `ifSessionHas(properties)`: Validates the `req.session` object in the same way, but proceeds to the next route if the criteria is not met.

All above functions look for `properties` on `req.session` or `req.body`, as appropriate. They assume the body has already been parsed with `express.json()`, and that a `session` has been added to the request object using `request-session` or similar.

The `properties` argument can be an array of property names, or a space-delimited string. The following are equivalent:

```javascript
app.get('/log-in', bodyMustHave('username password'), logIn); // space-delimited string
app.get('/log-in', bodyMustHave(['username','password']), logIn); // array of strings
```

If no properties are passed, they simply check that `req.body` or `req.session` exist. Note that for use with `express-session`, `req.session` will always exist on the request object and simply checking for its presence does not mean that the session has been saved or otherwise initiated.  See `express-session` documentation for details.

## Behavior

All functions proceed to the next middleware if `req.body` or `req.session` are present and either:
- Have all required properties, or
- Don't require any properties

They consider the request invalid if any of the following occur:
- `req.body` or `req.session` is missing entirely
- Any listed property is absent
- A listed property is present, but explicitly set to `undefined`

**Note**: If the property is present, any falsy value other than `undefined` is considered to be valid, such as an empty string. 

The functions behave differently when they see an invalid request:
- `bodyMustHave` blocks the request. It sets a status code `400` (`Bad Request`) for any invalid request. It responds to the user with `"no request body"`, or `"request body needs:"` and a list of missing property names.
- `sessionMustHave` blocks the request. If no `errCode` argument is provided, it assumes `401` and sets the response status code and responds with the standard message for that code.
- `ifBodyHas` and `ifSessionHas` do not block the request. They both execute `next('route')` and Express proceeds with the next route.