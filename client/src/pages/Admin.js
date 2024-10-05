import React from 'react'
import { useEffect } from 'react'

// CUSTOM HOOKS
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// COMPONENTS
import ProjectDetails from '../components/ProjectDetails'
import ProjectForm from '../components/ProjectForm'

export default function Admin() {
    const { projects, dispatch } = useProjectsContext()
    // we have the access to the token in this 'user' ie 'user.token' from the 'useAuthContext' hook
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchProjects = async () => {
            // we fetch only if some user is logged in
            const response = await fetch('/api/projects', {
                headers: {
                    // we sends this 'authorization' headers now to backend and we grab it inside the middleware's 'requireAuth.js'
                    'Authorization': `Bearer ${user.token}`
                }
            })

            // we get the json from the response the the api returns the json
            const json = await response.json()

            // if response is 'ok' update the local state(projects)
            if (response.ok) {
                dispatch({ type: 'SET_PROJECTS', payload: json })
            }

        }

        // if we have a user then fetch if no user then we dont even try to fetch in the first place.
        if (user) {
            fetchProjects()
        }

    }, [dispatch, user])

    return (
        <div className='home'>
            <div className="projects">
                <div className='form-container'>

                    <ProjectForm />
                </div>
                <div className="project-details-container">
                    <h2>Projects</h2>
                    <div className="project-list">
                        {projects && projects.map((project) => (
                            <ProjectDetails key={project._id} project={project} />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}
