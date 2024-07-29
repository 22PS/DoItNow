import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
const TodoItems = ({ id, text, isComplete, deleteTodo, toggle, editTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditMode(false);
    }
  };

  return (
    <div className="flex items-center my-3 gap-3">
      <div className="flex flex-1 items-center cursor-pointer ml-[6px]">
        {isComplete && !editMode ? (
          <GrCheckboxSelected
            className="text-orange-600 text-xl"
            onClick={() => {
              toggle(id);
            }}
          />
        ) : (
          <GrCheckbox
            className="text-orange-600 text-xl"
            onClick={() => {
              toggle(id);
            }}
          />
        )}
        {!editMode && (
          <p
            className={`text-slate-700 ml-3 text-lg decoration-slate-900
            ${isComplete ? 'line-through' : ''}`}
            onClick={() => {
              toggle(id);
            }}
          >
            {text}
          </p>
        )}
        {editMode && (
          <input
            className="text-slate-700 ml-3 text-lg decoration-slate-900 focus:rounded-md focus:pl-2 focus:text-[17px] focus:border-slate-900"
            autoFocus
            value={text}
            onBlur={() => setEditMode(false)}
            onChange={(e) => editTodo(id, e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
      <div className="flex text-xl text-slate-700 ml-1 mr-1 cursor-pointer">
        <FaEdit
          className="mr-[6px]"
          onClick={() => {
            isComplete ? '' : setEditMode((prev) => !prev);
          }}
        />
        <RiDeleteBin6Line
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItems;
