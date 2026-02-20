const TaskService=require("../services/TaskServices");
const Response=require("../utils/Response");
class TaskController
{
    /**
     * CreateTask: HTTP handler to create a new task.
     * - Expects task payload in req.body.
     * - Delegates creation to TaskService and returns a standardized response.
     */
    async CreateTask(req,res,next)
    {
        try{
            console.log(req.body);
           const task=await TaskService.createTask(req.body);
           const response=Response.success(task,"Tast Created Successfully",201);
           task.populate("author");
           await task.save();
           return await res.status(201).json(response);

        }catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * GetSingleTask: HTTP handler to fetch a single task by id (req.params.id).
     * - Delegates retrieval to TaskService and returns a standardized response.
     */
    async GetSingleTask(req,res,next)
    {
        try{

           const task=await TaskService.getSingleTask(req.params.id)
            const response=Response.success(task,"Task fetched Successfully",201);
           return await res.status(200).json(response);            
        }catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * DeleteTask: HTTP handler to logically delete a task by id.
     * - Calls TaskService.deleteTask and returns standardized response.
     */
    async DeleteTask(req,res,next)
    {
        try{
            const response=Response.success(await TaskService.deleteTask(req.params.id),"Task Deleted Successfully",200);
            return await res.status(200).json(response);
        }catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * GetAllTasks: HTTP handler to retrieve all tasks.
     * - Delegates to TaskService.getAllTask and returns standardized response.
     */
    async GetAllTasks(req,res,next)
    {
        console.log("All tasks are being fetched");
        try{
            const tasks=await TaskService.getAllTask();
            const response=Response.success(tasks,"tasks retrived successfully",200);
            return await res.status(200).json(response);
        }
        catch(Exception)
        {
            next(Exception)
        }
    }
    /**
     * updateTask: HTTP handler to update a task by id using payload in req.body.
     * - Delegates to TaskService.updateTask and returns the updated task.
     */
    async updateTask(req,res,next)
    {
        try
        {
            const updatedTask=await TaskService.updateTask(req.params.id,req.body);
             const response=Response.success(updatedTask,"tasks updated successfully",200);
            return await res.status(200).json(updatedTask);
        }
        catch(Exception)
        {
            next(Exception);
        }
    }
    /**
     * MarkasComplete: HTTP handler to mark a task as complete by id.
     * - Calls TaskService.markTask and returns the completed task.
     */
    async MarkasComplete(req,res,next)
    {
        try
        {

            const CompletedTask=await TaskService.markTask(req.params.id);
             const response=Response.success(CompletedTask,"task completed successfully",200);
            return await res.status(200).json(response);
        }
        catch(Exception)
        {
            next(Exception);
        }
    }
}
module.exports=new TaskController();