import JWT from "jsonwebtoken"



const isAuth = async (req, res, next) => {

    try {
        let { token } = req.cookies;

        if (!token) {
            res.send({
                status: 404,
                message: 'token is not avalible'
            })
        }
        if (token) {

            const varifytoken = JWT.varifytoken(token, process.env.JWT_SECRET)
            if (!varifytoken) {
                res.send({
                    status: 404,
                    message: 'invalid token '
                })

            }
            if(varifytoken){
                req.userid = varifytoken.userid
                next()

                  res.send({
                    status: 404,
                    message: 'yes this user exist '
                })

            }



        }

    } catch (error) {
          res.send({
                    status: 404,
                    message: 'some error in isauth '
                })

    }
}
export default isAuth;