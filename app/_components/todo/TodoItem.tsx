import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { ITodo } from "./ITodo";

export default function TodoItem({ todo }: { todo: ITodo }) {
  return (
    <div className="flex text-black">
      {todo.isCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      {todo.title}
    </div>
  );
}
