module.exports = {
    bodyMustHave, 
    sessionMustHave,
    ifSessionHas,
    ifBodyHas,
    
    // just for unit tests:
    _have: have, 
    _haveObj: haveObj,
    _parse: parse
}

function bodyMustHave(items) {
    return (req, res, next) => {
        checkFor({"request body":req.body}, items, res, next);
    }
}

function ifBodyHas(items) {
    return (req, res, next) => {
        checkFor({"request body":req.body}, items, res, next, 'route');
    }
}

function ifSessionHas(items) {
    return (req, res, next) => {
        checkFor({"session":req.session}, items, res, next, 'route');
    }
}

function sessionMustHave(items, errCode) {
    return (req, res, next) => {
        checkFor({"session":req.session}, items, res, next, errCode || 401);
    }
}

function checkFor(obj, items, res, next, errCode) {
    const key = Object.keys(obj)[0];
    const target = obj[key];
    if (!target) {
        if (errCode) {
            if (typeof errCode === 'number') return res.sendStatus(errCode);
            return next(errCode);
        }
        return res.status(errCode || 400).send('No '+key);
    }
    const missing = have(parse(items), target);
    if (missing.length) {
        if (errCode) {
            if (typeof errCode === 'number') return res.sendStatus(errCode);
            return next(errCode);
        }
        return res.status(400).send(key+' needs: '+missing.join(', '));
    }
    next();
}

// null is a fail (no object)
// otherwise return array of missing items
// array.length === 0 is a pass
function have(items, obj) {
    if (!haveObj(obj)) return false;

    let missing = [];
    const keys = Object.keys(obj);
    items.forEach(item=>{
        if (!keys.includes(item) || obj[item] === undefined) missing.push(item);
    });

    return missing;
}

function haveObj(obj) {
    return !Array.isArray(obj) && typeof obj === 'object';
}

function parse(items) {
    if (Array.isArray(items)) return items;
    if (items && typeof items === 'string') return items.split(' ');
    return [];
}

// function sort(args, onObject) {
//     if (Array.isArray(args)) return {items: args, obj: onObject || {}};
//     if (args && typeof args === 'string') return {items: args.split(' '), obj: onObject || {}};
//     return {items: null, obj: args || null};
// }
