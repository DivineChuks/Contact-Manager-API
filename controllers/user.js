import asyncHandler from "express-async-handler";


export const getUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})