import * as React from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function TaskForm() {
    const navigate = useNavigate()
    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [task, setTask] = React.useState({
        title: '',
        description: '',
        date: dayjs(new Date)
    });

    // input handler
    const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value })

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {

            const res = await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()

            navigate('/')
        } catch (err) {
            setError('Failed to connect to server.')
        }
        setLoading(false)
    }

    // Form TaskForm
    return (
        <>
            <Grid container alignItems='center' justifyContent='center'>
                <Grid item sx={3}>
                    <Card sx={{ mt: 5 }} style={{
                        borderRadius: '.5rem',
                        borderWidth: '1px',
                        padding: '1rem',
                        backgroundColor: '#ffffff',
                        borderColor: '#e8e5e333',
                        backdropFilter: 'blur(15px)',
                    }}>
                        <Typography textAlign='center'>
                            Create Task
                        </Typography>
                        <CardContent>
                            <form className='flex flex-col justify-end' onSubmit={handleSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker slotProps={{ color: 'white' }}
                                        value={task.date} name="date" onChange={(newValue) =>
                                            setTask({ ...task, date: newValue.format('YYYY-MM-DDTHH:mm:ssZ[Z]') })}
                                        defaultValue={new Date()}
                                        renderInput={(params) => (
                                            <TextField {...params} inputProps={{ style: { color: 'white', width: '256px' } }} />
                                        )} />
                                </LocalizationProvider>
                                <TextField inputProps={{ style: { width: '256px' } }} sx={{ display: 'block', margin: '.5rem 0' }} name="title" onChange={handleChange} id="outlined-basic" label="Title" variant="outlined" />
                                <TextField inputProps={{ style: { width: '256px' } }} sx={{ display: 'block', margin: '.5rem 0' }} name="description" onChange={handleChange} id="outlined-multiline-flexible" label="Description" multiline rows={4} maxRows={12} />
                                <Typography color='red' textAlign='center'>
                                    {error}
                                </Typography>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Button variant='contained' onClick={() => navigate('/')}>Cancel</Button>
                                    <Button variant="contained" type="submit" disabled={!(task.title && task.description && task.date)}>
                                        {loading ? <CircularProgress
                                        color='inherit'
                                        size={24}
                                        /> : 'save'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Content */}
            </Grid>
        </>

    );
}

export default TaskForm