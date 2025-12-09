import { verify } from "jsonwebtoken"
import User from "../models/User.js"

export const auth = async(req, res, next) => {
    const tokenData = verify(req.cookies.token)
    const user = await User.findOne({_id: tokenData.id})

    if(!user){
        res.status(401).json('Пользователь не найден')
        return
    }
    req.user = user

    next()

    
}