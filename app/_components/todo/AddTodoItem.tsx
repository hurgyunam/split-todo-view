import { Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useRef, useState } from "react";

export default function AddTodoItem({
  addTodo,
}: {
  addTodo: (title: string) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Enter 키인지 확인
    if (e.key === "Enter" && !isComposing) {
      // 기본 엔터 동작(예: 새 줄)을 막음
      e.preventDefault();

      add();
    }
  };

  const add = () => {
    if (title) {
      addTodo(title);

      setTitle("");
    } else {
      setErrorText("타이틀명이 없습니다.");
    }
  };

  // 2. 컴포넌트가 마운트(생성)될 때 포커스 설정
  useEffect(() => {
    // inputRef.current가 존재하고 focus 메서드를 가질 때만 실행
    // MUI TextField는 내부적으로 input 요소를 가지고 있어 .focus() 호출 가능
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // 빈 의존성 배열 []을 사용하여 마운트 시점에만 실행

  return (
    <div className="flex gap-2">
      <TextField
        inputRef={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        fullWidth
        error={errorText !== null}
        helperText={errorText}
      />
      <Button
        variant="outlined" // <--- 아웃라인 추가
        aria-label="추가"
        onClick={add}
      >
        <AddIcon />
      </Button>
      <Button
        variant="outlined" // <--- 아웃라인 추가
        aria-label="추가"
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
}
