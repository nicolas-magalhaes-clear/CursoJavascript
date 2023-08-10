module.exports = {
    send: (err, req, res, code = 400)=>{
        console.log(`error: ${JSON.stringify(err)}`);
        res.status(code).json({
            error: err
        })
    }
}