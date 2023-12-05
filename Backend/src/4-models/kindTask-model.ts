class kindTask{

    public kindTaskId:number;
    public taskName:string;

    public constructor(task:kindTask){
        this.kindTaskId = task.kindTaskId;
        this.taskName = task.taskName;
    }
}

export default kindTask