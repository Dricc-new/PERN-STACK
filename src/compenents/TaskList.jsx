import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// TaskList component
export default function TaskList() {

  const navigate = useNavigate()

  return (
    <>
      {/* List Task */}
      <article className="box-container grow relative">
        <div className="flex justify-between my-2">
          <h1 className="text-center text-lg font-bold">List Tasks</h1>
          <Button variant='outlined' onClick={() => navigate('/tasks/new')}>new task</Button>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="box-container cursor-pointer hover:translate-x-1">
            <h4 className="text-xs float-right opacity-60">1/10/2023 8:00 PM</h4>
            <h4 className="text-xs font-bold">title</h4>
            <p className="texl-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
          <li className="box-container cursor-pointer hover:translate-x-1">
            <h4 className="text-xs float-right opacity-60">1/10/2023 8:00 PM</h4>
            <h4 className="text-xs font-bold">title</h4>
            <p className="texl-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
          <li className="box-container cursor-pointer hover:translate-x-1">
            <h4 className="text-xs float-right opacity-60">1/10/2023 8:00 PM</h4>
            <h4 className="text-xs font-bold">title</h4>
            <p className="texl-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
        </ul>
      </article>
    </>
  )
}
