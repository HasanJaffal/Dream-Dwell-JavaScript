import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn:'1d',
    });
    const oneDay = 100*24*60*60;
    res.cookie('token', token, {
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:'production',
        sameSite:'strict'
    } )
    return token;
}
export default generateToken;
