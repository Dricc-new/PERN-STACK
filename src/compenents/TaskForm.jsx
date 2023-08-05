import * as React from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

function TaskForm() {

    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [task, setTask] = React.useState({
        title: '',
        description: '',
        date: dayjs(new Date)
    });

    // route props
    const navigate = useNavigate()
    const params = useParams()

    // loader a task
    const GetTask = ((id) => {

    })

    // get a task 
    const loadTask = async (id) => {
        try {
            const res = await fetch('http://localhost:4000/tasks/' + id)
            const data = await res.json()
            setTask({ title: data.title, description: data.description, date: dayjs(new Date(data.date)) })
        } catch (err) {
            console.log(err)
        }
    }

    // On load get a task, if it is the edit route 
    React.useEffect(() => {
        if (params.id)
            loadTask(params.id)
    }, [params.id])

    // input handler
    const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value })

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Init var to request to server
        setError('')
        setLoading(true)
        try {
            if (params.id) {
                await fetch('http://localhost:4000/tasks/' + params.id, {
                    method: 'PUT',
                    body: JSON.stringify(task),
                    headers: { 'Content-Type': 'application/json' }
                })

            } else {
                await fetch('http://localhost:4000/tasks', {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: { 'Content-Type': 'application/json' }
                })
            }

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
                <Grid item>
                    <Card sx={{ mt: 5 }} style={{
                        borderRadius: '.5rem',
                        borderWidth: '1px',
                        padding: '1rem',
                        backgroundColor: '#ffffff',
                        borderColor: '#e8e5e333',
                        backdropFilter: 'blur(15px)',
                    }}>
                        <Typography textAlign='center'>
                            {params.id?'Edit Task':'Create Task'}
                        </Typography>
                        <CardContent>
                            <form className='flex flex-col justify-end' onSubmit={handleSubmit}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker slotProps={{ color: 'white' }}
                                        value={task.date} name="date" onChange={(newValue) =>
                                            setTask({ ...task, date: newValue.format('YYYY-MM-DDTHH:mm:ssZ[Z]') })}
                                        defaultValue={new Date()}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    inputProps={{ style: { width: '256px' } }}
                                    sx={{ display: 'block', margin: '.5rem 0' }}
                                    name="title" value={task.title} onChange={handleChange} id="outlined-basic" label="Title" variant="outlined" />
                                <TextField
                                    inputProps={{ style: { width: '256px' } }}
                                    sx={{ display: 'block', margin: '.5rem 0' }}
                                    name="description" value={task.description} onChange={handleChange} id="outlined-multiline-flexible" label="Description" multiline rows={4} />
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