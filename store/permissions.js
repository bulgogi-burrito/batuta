
export const updateCameraPermission = (bool) => {
    return {
        type : 'SET_CAMERA_PERMISSION' , 
        cameraPermission : bool 
    }
}

const initialState = {
    cameraPermission : false 
}

export default function permissionsReducer (state = initialState , action) {
    switch (action.type) {
        case 'SET_CAMERA_PERMISSION' :
            return { ...state , cameraPermission : action.cameraPermission } ; 
        default : return state    
    }
}