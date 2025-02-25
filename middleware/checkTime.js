function checkTime(req, res, next) {
    const currHour = new Date().getHours();

    if (currHour >= 22 || currHour < 7) {
        return res.send("Error")
    }
    next();
}
module.exports= checkTime;