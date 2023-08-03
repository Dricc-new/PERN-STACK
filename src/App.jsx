import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './compenents/TaskList'
import TaskForm from './compenents/TaskForm'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TaskList />} />
                <Route path='/tasks/new' element={<TaskForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
