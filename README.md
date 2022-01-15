# if-request-has v0.0.1

Simple request body / session validation middleware for Express

## Quick Start

```javascript
const app = express();
const {ifBodyHas, ifSessionHas} = require('if-request-has');

const {logIn, logOut} = require('./auth/log-in-log-out.js');

app.get('/log-in', ifBodyHas('username password'), logIn);

app.get('/log-out', ifSessionHas('userId'), logOut);
```

`ifSessionHas(properties)` and `ifBodyHas(properties)` look for `properties` on `req.session` and `req.body`, respectively.They assume the body has already been parsed with `express.json()`, and that a `session` has been added to the request object using `request-session` or similar.

The `properties` argument can be an array of property names, or a space-delimited string. The following are equivalent:

```javascript
app.get('/log-in', ifBodyHas('username password'), logIn);
app.get('/log-in', ifBodyHas(['username','password']), logIn);
```

If no properties are passed, they simply check that `req.body` or `req.session` exist. Note that for use with `express-session`, `req.session` will always exist on the request object and simply checking for its presence does not mean that the session has been saved or otherwise initiated.  See `express-session` documentation for details.

## Common Behavior

Both `ifSessionHas(properties)` and `ifBodyHas(properties)` have the same behavior.

They proceed to the next middleware if `req.body` or `req.session` are present and either:
- Have all required properties
- Don't require any properties

They stop the request and respond with an error message if any of the following occur:
- `req.body` or `req.session` is missing entirely
- Any listed property is absent
- A listed property is present but explicitly set to `undefined`

**Note**: The request is considered valid if the property is present, but set to any other falsy value (such as an empty string).

When they stop the request, they:
- Set status `400` (`Bad Request`) for any invalid request
- Respond to the request with "No request body" or "No session" for a missing `req.body` or `req.session`
- Otherwise, respond to the request with the names of any missing properties:
  - `"session needs: userId"`
  - `"request body needs: username, password"`