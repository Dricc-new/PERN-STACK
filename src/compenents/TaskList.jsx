import * as React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import TaskForm from './TaskForm';

// Add a day to a date
function addDay(date) {
  date.setDate(date.getDate() + 1)
}

// TaskList component
export default function TaskList() {

  const [open, setOpen] = React.useState(false);

  // Open TaskForm
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Closed TaskForm
  const handleClose = () => {
    setOpen(false);
  };

  // Calendar Variables
  const day = (new Date)
  const month = new Intl.DateTimeFormat('en-EN', { month: 'long', year: 'numeric' }).format(day)
  const firstDayMonth = new Date(day.getFullYear(), day.getMonth(), 1)
  var tempDay = new Date(day.getFullYear(), day.getMonth(), 1)
  tempDay.setDate(-firstDayMonth.getDay() + 1)
  const daysMonth = []

  // Get the days of the previous month
  for (var i = 1; i <= firstDayMonth.getDay(); i++) {
    daysMonth.push(<li key={tempDay.toString()} className="box-container h-24 hover:scale-[1.05] cursor-pointer text-slate-600">{tempDay.getDate()}</li>)
    addDay(tempDay)
  }

  // Get the days of this month
  while (tempDay.getMonth() == day.getMonth()) {
    daysMonth.push(<li key={tempDay.toString()} className="box-container h-24 hover:scale-[1.05] cursor-pointer">{tempDay.getDate()}</li>)
    addDay(tempDay)
  }

  // Get the days of the next month
  while (tempDay.getDay()) {
    daysMonth.push(<li key={tempDay.toString()} className="box-container h-24 hover:scale-[1.05] cursor-pointer text-slate-600">{tempDay.getDate()}</li>)
    addDay(tempDay)
  }

  // Get the days of the week
  const listDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item) =>
    <li key={item} className="box-container text-center">{item}</li>
  );
  return (
    <div>
      <section className="flex gap-4">
        {/* Calendar */}
        <article className="container w-[768px] mx-auto flex flex-col gap-3">
          <div className="box-container flex justify-between p-3 items-center">
            <Button>
              <KeyboardArrowLeftIcon />
            </Button>
            <h1 className="text-4xl">{month}</h1>
            <Button>
              <KeyboardArrowRightIcon />
            </Button>
          </div>
          <div>
            <ul className="grid grid-cols-7 gap-1">{listDays}</ul>
            <ul className="grid grid-cols-7 gap-1 mt-1">{daysMonth}</ul>
          </div>
        </article>
        {/* List Task */}
        <article className="box-container grow relative">
          <div className="flex justify-between my-2">
            <h1 className="text-center text-lg font-bold">List Tasks</h1>
            <Button variant='outlined' onClick={handleClickOpen}>new task</Button>
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
      </section>
      <TaskForm
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}
