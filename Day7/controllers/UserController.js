const userService=require("../services/UserServices");
const Response = require("../utils/Response");
class UserController
{
    /**
     * getAll: HTTP handler to retrieve all users.
     * - Delegates to userService.getAllUsers and returns a standardized response.
     */
    async getAll(req,res,next)
    {
        try
        {
            const users=await userService.getAllUsers();
            const response=Response.success(
                users,
                "All users fetched successfully",
                200
            )
            return await res.status(200).json(response);
        }
        catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * getUser: HTTP handler to fetch a user by id (req.params.id).
     * - Delegates to userService.getUserById and returns a standardized response.
     */
    async getUser(req,res,next)
    {
        try{
            const user=await userService.getUserById(req.params.id);
            const response=Response.success(user,"User afetched Successfully",200);
            res.status(200).json(response);
        }
        catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * create: HTTP handler to create a new user.
     * - Expects user payload in req.body and returns the created user on success.
     */
    async create(req,res,next)
    {
        try{
            
            const user=await userService.createUser(req.body);
            const response=Response.success(user,"User Created Successfully",201);
            res.status(201).json(response);
        }
        catch(Error)
        {
            next(Error);
        }
    }
}
module.exports=new UserController();