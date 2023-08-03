import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './compenents/TaskList'
import TaskForm from './compenents/TaskForm'
import NavBar from './compenents/navbar'
import { Container } from '@mui/material'

function App() {
    return (
        <BrowserRouter>
            <Container maxWidth="xl" className='mt-4'>
                <Routes>
                    <Route path='/' element={<TaskList />} />
                    <Route path='/tasks/new' element={<TaskForm />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
