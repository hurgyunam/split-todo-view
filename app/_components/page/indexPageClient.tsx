"use client";

import { useEffect, useState } from "react";
import AddTodoItem from "@/app/_components/todo/AddTodoItem";
import { ITodo } from "@/app/_components/todo/ITodo";
import TodoItem from "@/app/_components/todo/TodoItem";

export default function Index({ serverUrl }: { serverUrl: string }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  const init = async () => {
    const userId = await fetchAccount();

    await fetchTodo(userId);
  };

  const fetchAccount = async () => {
    const res = await fetch(`${serverUrl}/api/v1/auth/get`, {
      credentials: "include",
    });

    const json = await res.json();

    setUserId(json.id);

    return json.id;
  };

  const fetchTodo = async (userId: number) => {
    const queryParams = new URLSearchParams({
      userId: userId.toString(),
    }).toString();

    // 2. 요청 URL에 쿼리 파라미터 추가
    const url = `${serverUrl}/api/v1/todo?${queryParams}`;
    const res = await fetch(url, {
      credentials: "include",
    });

    const json = await res.json();

    const sortedTodos = [...json].sort((a, b) => {
      // 언어적 규칙(가나다 순 등)에 따라 문자열을 비교합니다.
      // 'ko'는 한국어, { sensitivity: 'base' }는 대소문자, 악센트 등을 무시하고 기본 문자만 비교합니다.
      return a.title.localeCompare(b.title, "ko", { sensitivity: "base" });
    });

    setTodos(sortedTodos);
  };

  const addTodo = async (title: string) => {
    const res = await fetch(`${serverUrl}/api/v1/todo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        parentId: null,
      }),
    });

    const json = await res.json();

    const unsortedTodos = [
      ...todos,
      {
        id: json.id,
        title,
        isCompleted: false,
      },
    ];

    const sortedTodos = [...unsortedTodos].sort((a, b) => {
      // 언어적 규칙(가나다 순 등)에 따라 문자열을 비교합니다.
      // 'ko'는 한국어, { sensitivity: 'base' }는 대소문자, 악센트 등을 무시하고 기본 문자만 비교합니다.
      return a.title.localeCompare(b.title, "ko", { sensitivity: "base" });
    });

    setTodos(sortedTodos);
    setIsAddMode(false);
  };

  useEffect(() => {
    init();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("keydown!!!");
    const isModifierPressed = e.metaKey || e.ctrlKey;

    if (e.key === "Enter" && isModifierPressed) {
      e.preventDefault();
      setIsAddMode(!isAddMode);
      return;
    }
  };

  return (
    <div className="flex" onKeyDown={onKeyDown} tabIndex={0}>
      <div className="flex flex-col bg-white p-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {isAddMode && <AddTodoItem addTodo={addTodo} />}
      </div>
    </div>
  );
}
