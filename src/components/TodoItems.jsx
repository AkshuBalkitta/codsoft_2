import React from 'react';
import check from '../assets/check.png';
import uncheck from '../assets/uncheck.png';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';

const TodoItems = ({text,id,isComplete,isEditable,deleteTodo,toggle,toggleEdit,handleInputChange}) =>{
    return(
        <div className='flex items-center my-3 gap-2'>
            <div onClick={()=>{toggle(id)}}className='flex flex-1 items-center cursor-pointer'>
                <img className='w-7' src={isComplete? check:uncheck} alt="check"/>
                {isEditable ? (
          <input
            type="text"
            value={text}
            onChange={(e) => handleInputChange(id, e.target.value)}
            onBlur={() => toggleEdit(id)} // Save and exit edit mode on blur
            className="ml-4 text-white bg-transparent outline-none border-b border-gray-400"
            autoFocus
          />
        ) : (
          <p
            className={`text-white ml-4 text-[17px] decoration-red-500 ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
            </div>
            <img onClick={()=>{toggleEdit(id)}} className='w-6 cursor-pointer'src={edit} alt="edit"/>
            <img onClick={()=>{deleteTodo(id)}} className='w-6 cursor-pointer'src={del} alt="delete"/>
        </div>
    );
}
export default TodoItems;