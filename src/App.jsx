import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('')
  const [todos, settodos] = useState([])
  const [showfinoshed,setshowfinished] = useState(true)


  useEffect(() => {
    let todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      let todo=JSON.parse(localStorage.getItem("todos"))[0].todo
       setTodo(todo)
    }
    settodos(todos || [])
  }, [])
  

  const handleAddTodo = () => {
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo('')
    saveTolS([...todos, {id: uuidv4(), todo, isCompleted: false}])
  }


  const togglefinished=(params)=>{
    setshowfinished(!showfinoshed)        

  }

  const handleEdit = (e,id) => {
      let t=todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item => item.id !== id)
      settodos(newTodos)
        saveTolS(newTodos)

  }

  const saveTolS=(params)=>{
    localStorage.setItem('todos', JSON.stringify(params))
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)  
    saveTolS(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }
  const handleCheckboxChange = (e) => {
    let id = e.target.name
    let checked = e.target.checked
    
    let newTodos = todos.map(item => {
      if(item.id === id){
        return {...item, isCompleted: checked}
      }
      return item
    })
    settodos(newTodos)
    saveTolS(newTodos)
  }


  return (
    <>
    <Navbar />

      <div className=" container md-auto my-5 rounded-xl p-5 bg-pink-100 min-h-[80vh] ">
        <h1 className="text-2xl font-bold mb-4 text-center">iTask Manage our todos at one place</h1>
        
        <div className="add-todo">
          <h2 className="text-lg font-bold">Add a Todo</h2>

          <input onChange={handleChange} value={todo}
            type="text"
            className="border-2 border-pink-300 rounded-md p-2 w-full my-3"
            placeholder="Enter your todo here"
          />

          <button onClick={handleAddTodo} disabled={todo.length<=2} className="bg-pink-500 text-white px-4 py-2 w-full rounded-md disabled:bg-pink-500 hover:bg-pink-600 transition-all duration-300">
            Save
          </button>
          
        </div>

        <input onChange={togglefinished} type="checkbox" checked={showfinoshed} id="showfinished" className='mr-2 mt-5' />show finished todos
        <h2 className="text-lg font-bold mt-5">Your Todos</h2>
        <div className="todo-list mt-3">
          {todos.filter(item => showfinoshed || !item.isCompleted).length === 0 && <div>No todos to show</div>}
          {todos.map(item => {
            return (showfinoshed || !item.isCompleted) && <div key={item.id} className='flex items-center md.w-1/3 justify-between my-2'>
              <div className='flex items-center'>
              <input name={item.id} onChange={handleCheckboxChange} type="checkbox" checked={item.isCompleted} id={item.id} className='mr-2' />

              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              
                  <div className='but flex '>
                      <button onClick={(e) => handleEdit(e,item.id)} className='bg-pink-500 text-white px-2
                      py-2 mx-1 rounded-md hover:bg-pink-600'><FaRegEdit /></button>
                      <button onClick={(e) => handleDelete(e,item.id)} className='bg-pink-500 text-white px-2
                      py-2 mx-1 rounded-md hover:bg-pink-600'><MdOutlineDelete /></button>
                  </div>
            </div>
          })}
        </div>
        
  
      </div>

      
    </>
  )
}

export default App
