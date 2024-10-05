import { useState } from 'react'

// CUSTOM HOOKS
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// render to (pages > Home.js component)
export default function ProjectForm() {
    const { dispatch } = useProjectsContext()
    // we have the access to the token in this 'user' ie 'user.toke'
    const { user } = useAuthContext()

    const [projectRef, setProjectRef] = useState('')
    const [projectName, setProjectName] = useState('')
    const [owner, setOwner] = useState('')
    const [duration, setDuration] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [status, setStatus] = useState('')
    const [errorForm, setErrorForm] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setErrorForm('You must be logged in')
            return
        }

        const project = {
            projectRef,
            projectName,
            owner,
            duration,
            start,
            end,
            status

        }

        // sending POST request to backend API
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json',

                // we sends this 'authorization' headers now to backend and we grab it inside the middleware's 'requireAuth.js' to verify
                'Authorization': `Bearer ${user.token}`

            }
        })
        // returns either the newly create project or error message that backend response
        const json = await response.json()
        // console.log(json)


        // we have the access to 'emptyFields' from backend
        if (!response.ok) {
            setErrorForm(json.error)
            setEmptyFields(json.emptyFields)
            // console.log(`Error message: ${json.error}`)
        }

        if (response.ok) {
            setProjectRef('')
            setProjectName('')
            setOwner('')
            setDuration('')
            setStart('')
            setEnd('')
            setStatus('')
            setErrorForm(null)
            setEmptyFields([])
            console.log('new project added', json)
            dispatch({ type: 'CREATE_PROJECT', payload: json })
        }

    }
    return (
        // when button is clicked on this form the 'handleSubmit' function fires off
        // and when clicked the states above will be updated on the inputs value.
        <form onSubmit={handleSubmit}>
            <h3>Add new Project</h3>
            <div className='create-project'>
                <div className="col-one">
                    <label>Reference</label>
                    <input
                        type="text"
                        onChange={(e) => setProjectRef(e.target.value)}
                        value={projectRef}
                        // if 'projectRef' is included in the emptyFields array then the className is 'error' if not then className is empty string or none.
                        className={emptyFields.includes('projectRef') ? 'create-form-error' : ''}
                    // className='create-form-error'
                    />
                    <label>Project Name</label>
                    <input
                        type="text"
                        onChange={(e) => setProjectName(e.target.value)}
                        value={projectName}
                        className={emptyFields.includes('projectName') ? 'create-form-error' : ''}
                    // className='create-form-error'
                    />
                    <label>Owner</label>
                    <input
                        type="text"
                        onChange={(e) => setOwner(e.target.value)}
                        value={owner}
                        className={emptyFields.includes('owner') ? 'create-form-error' : ''}
                    // className='create-form-error'

                    />
                    <label>Duration</label>
                    <input
                        type="text"
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                        // className='create-form-error'
                        className={emptyFields.includes('duration') ? 'create-form-error' : ''}
                    />

                </div>

                <div className="col-two">
                    <label>Start</label>
                    <input
                        type="text"
                        onChange={(e) => setStart(e.target.value)}
                        value={start}
                        className={emptyFields.includes('start') ? 'create-form-error' : ''}
                    // className='create-form-error'
                    />
                    <label>Completion</label>
                    <input
                        type="text"
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}
                        className={emptyFields.includes('end') ? 'create-form-error' : ''}
                    // className='create-form-error'
                    />
                    <label>Status</label>
                    <input
                        type="text"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className={emptyFields.includes('status') ? 'create-form-error' : ''}
                    // className='create-form-error'
                    />
                    <button>Save Project</button>
                </div>
            </div>

            {errorForm &&
                <div className='form-error-box'>
                    <p>{errorForm}</p>
                </div>}

        </form>
    )
}
