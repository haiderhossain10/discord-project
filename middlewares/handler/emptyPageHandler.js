const emptyPageHandler = (req, res) => {
    res.status(404).json({
        error: {
            msg: "404 not found (api)",
        },
    });
};

export default emptyPageHandler;
