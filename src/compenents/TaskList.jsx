import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// TaskList component
export default function TaskList() {
  const [tasks, setTasks] = React.useState([])

  // Charge task to the server
  const loadTask = async () => {
    try {
      const res = await fetch('http://localhost:4000/tasks')
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      console.log(err)
    }
  }

  // handle the task delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch('http://localhost:4000/tasks/' + id, {
        method: "DELETE"
      })
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      console.log(err)
    }

  }

  // On change get tasks
  React.useEffect(() => {
    loadTask()
  }, [])

  const navigate = useNavigate()

  return (
    <>
      {/* List Task */}
      <article className="box-container grow relative">
        <div className="flex justify-between my-2">
          <h1 className="text-center text-lg font-bold">List Tasks</h1>
          <Button variant='outlined' onClick={() => navigate('/tasks/new')}>new task</Button>
        </div>
        <ul className="flex flex-col gap-2 max-h-[85vh] overflow-x-hidden box-scroll pr-2 overflow-y-scroll">
          {tasks.map((task) => (
            <li key={task.id} className="box-container cursor-pointer relative">
              <h4 className="text-xs float-right opacity-60">{(new Date(task.date).toLocaleTimeString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }))}</h4>
              <h4 className="text-xs font-bold">{task.title}</h4>
              <p className="texl-sm">{task.description}</p>
              <div className='hover:opacity-100 opacity-0 backdrop-blur top-0 left-0 absolute w-full h-full flex justify-end items-end gap-2 p-1'>
                <Button variant='contained' className='h-7' onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                  <EditIcon />
                </Button>
                <Button variant='contained' color='error' className='h-7' onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}
