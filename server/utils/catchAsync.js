module.exports = () => {
    return (req, res, next) => {

        fn(req, res, next).catch(err => next(err));
    }
}