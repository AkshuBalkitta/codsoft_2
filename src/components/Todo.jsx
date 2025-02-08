import React, { useEffect, useRef, useState } from 'react';
import todo from  '../assets/to_do.png';
import TodoItems from './TodoItems';

const Todo = () =>{
    const [todoList,setTodoList]=useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[]);
    const inputRef=useRef();
    const add = () =>{
        const inputText=inputRef.current.value.trim();
        if(inputText===""){
            return null;
        }
        const newTodo={
            id:Date.now(),
            text:inputText,
            isComplete:false,
            isEditable:false,
        }
        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value="";
    }
    const deleteTodo=(id)=>{
        setTodoList((prevTodos)=>{
            const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
            return updatedTodos;
        })
    }
    const toggle=(id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){ 
                    return{...todo, isComplete: !todo.isComplete }
                }
                return todo;
            })
        })
    }
    const toggleEdit = (id) => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id
              ? { ...todo, isEditable: !todo.isEditable }
              : todo
          )
        );
      };    
      const handleInputChange = (id, value) => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: value } : todo
          )
        );
      };
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList])
    return(
        <div className='bg-indigo-950 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo} alt="todo"/>
                <h1 className='text-3xl font-semibold text-white'>To-Do List</h1>
            </div>
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task'/>
                <button onClick={add} className='border-none rounded-full bg-red-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
            </div>
            <div>
                {todoList.map((item,index)=>{
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} isEditable={item.isEditable} deleteTodo={deleteTodo} toggle={toggle} toggleEdit={toggleEdit} handleInputChange={handleInputChange}/>
                })}
            </div>
        </div>
    );
}
export default Todo;