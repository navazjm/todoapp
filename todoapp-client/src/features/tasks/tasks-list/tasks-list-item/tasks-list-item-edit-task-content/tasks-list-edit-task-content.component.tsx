import { ChangeEvent, useState } from "react";
import { ITasksListBaseProps } from "../../tasks-list.types";
import "./tasks-list-edit-task-content.component.css";

interface IEditTaskContentInputProps extends ITasksListBaseProps {
    updateTask(taskID: number, taskContent: string, taskIsDone: boolean): void;
}
export default function EditTaskContentInputComponent({ task, updateTask }: IEditTaskContentInputProps) {
    const [taskContent, setTaskContent] = useState(task.content);

    function onChangeTaskContent(evt: ChangeEvent<HTMLInputElement>) {
        setTaskContent(evt.target.value);
    }

    function onBlurTaskContent() {
        if (task.content === taskContent) return;
        updateTask(task.id, taskContent, task.isDone);
    }

    return (
        <input
            className="edit-task-content-input"
            value={taskContent}
            onChange={(evt) => onChangeTaskContent(evt)}
            onBlur={onBlurTaskContent}
        />
    );
}
