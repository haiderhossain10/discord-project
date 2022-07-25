const errorHandler = (err, req, res, next) => {
    res.json({
        error: {
            msg: err.message,
        },
    });
};
export default errorHandler;
