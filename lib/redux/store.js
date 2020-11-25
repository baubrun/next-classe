import {configureStore} from "@reduxjs/toolkit"
import userReducer from "@lib/redux/userSlice"
import courseReducer from "@lib/redux/courseSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer,
    },
    devTools: true,
})