const isLoggedIn = (req, res, next) => {
    if(!req.headers.id) {
        return next({
            status: 403,
            message: 'Not logged in'
        })
    }
    next();

}

const isItMe = (req, res, next) => {
    if(req.headers.id !== req.params.id) {
        return next({
            status: 405,
            message: 'You can not be someone else!'
        })        
    }  
    next();  
}

module.exports = {isLoggedIn, isItMe};