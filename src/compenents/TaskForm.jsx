import * as React from 'react';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function TaskForm(props) {
    const { onClose, open } = props;
    const [task, setTask] = React.useState({
        title: '',
        description: '',
        date: dayjs('2022-04-17T15:30')
    });
    // Close dialog
    const handleClose = () => {
        onClose();
    };

    // input handler
    const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value })

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(task)
    }

    // Form TaskForm
    return (
        <Dialog onClose={handleClose} open={open}>

            {/* Title */}
            <DialogTitle>New Task</DialogTitle>

            {/* Content */}
            <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
                <article className="grid grid-cols-3 gap-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker label="Time" value={task.date} name="date" onChange={(newValue) => setTask({ ...task, date: newValue.format('YYYY-MM-DDTHH:mm:ssZ[Z]') })} />
                    </LocalizationProvider>
                    <TextField name="title" onChange={handleChange} id="outlined-basic" className="col-span-2" label="Title" variant="outlined" />
                </article>
                <TextField name="description" onChange={handleChange} id="outlined-multiline-flexible" label="Description" multiline maxRows={12} />
                <Button variant="contained" type="submit">Save</Button>
            </form>
        </Dialog>
    );
}

// TaskForm component events
TaskForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default TaskForm