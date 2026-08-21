function TaskItem(inputs){
    return(
        <li>
            <span>{inputs.task.title}</span>
            <button onClick={function () { inputs.onToggle(inputs.task._id);
            }}> Toggle </button>
        </li>
    )
}

export default TaskItem;