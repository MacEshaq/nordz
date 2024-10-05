import { createContext, useReducer } from 'react'


export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                projects: action.payload
            }
        case 'CREATE_PROJECT':
            return {
                projects: [action.payload, ...state.projects]

            }
        case 'DELETE_PROJECT':
            return {

                // 'projects' object here will be a new object which remove the false
                projects: state.projects.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

// state being share to the children
export const ProjectsContextProvider = ({ children }) => {
    const url = "https://eng-nordz-server.onrender.com"
    const [state, dispatch] = useReducer(projectsReducer, {
        projects: null
    })

    return (
        <ProjectsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProjectsContext.Provider>
    )

}
