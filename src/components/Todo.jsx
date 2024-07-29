import { RiTodoLine } from 'react-icons/ri';
import TodoItems from './TodoItems';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      toast.error('Nothing to add!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);

    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (id, newText) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });
    });
  };

  const toggle = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <RiTodoLine className="mt-[6px] text-3xl" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          onKeyDown={(e) => {
            if (e.key === 'Enter') add();
          }}
        />
        <button
          className="border-none bg-orange-600 w-32 h-14 text-white font-medium cursor-pointer rounded-full"
          onClick={add}
        >
          ADD +
        </button>
      </div>
      {todoList.map((item) => {
        return (
          <TodoItems
            key={item.id}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            editTodo={editTodo}
          />
        );
      })}

      <ToastContainer />
    </div>
  );
};

export default Todo;
