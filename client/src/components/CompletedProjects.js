import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// CUSTOM HOOKS
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Completedprojects({ project }) {
    // if (project.status === 'Completed') {

    const { dispatch } = useProjectsContext()
    // we have the access to the token in this 'user' ie 'user.toke'
    const { user } = useAuthContext()

    const handleDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/projects/' + project._id, {
            method: 'DELETE',
            headers: {
                // we sends this 'authorization' headers now to backend and we grab it inside the middleware's 'requireAuth.js' to verify.
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PROJECT', payload: json })

        }

    }

    return (

        <div>Completedprojects
            <div className='project-details'>

                <ul>
                    <li><strong>Project Ref: </strong>{project.projectRef}</li>
                    <li><strong>Project Name: </strong>{project.projectName}</li>
                    <li><strong>Owner </strong>{project.owner}</li>
                    <li><strong>Duration: </strong>{project.duration}</li>
                    <li><strong>Start Date: </strong>{project.start}</li>
                    <li><strong>Completion Date: </strong>{project.end}</li>
                    <li><strong>Status: </strong>{project.status}</li>
                    <li><strong>File Created On: </strong>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</li>
                </ul>


                {/* images temporary */}

                <div className="image-main-container">
                    <h5>Images:</h5>

                    <div className="img-box">

                        <img src={process.env.PUBLIC_URL + '/images/cons1.jpg'} width='200' alt="cont images" />
                        <img src={process.env.PUBLIC_URL + '/images/cons2.jpg'} width='200' alt="cont images" />
                        <img src={process.env.PUBLIC_URL + '/images/cons3.jpg'} width='200' alt="cont images" />
                        <img src={process.env.PUBLIC_URL + '/images/cons4.jpg'} width='200' alt="cont images" />
                    </div>
                </div>
                <button className="delete-project-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
    // }
}
