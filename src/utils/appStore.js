import { configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import conncetionReducer from "./connectionSlice";
import requestReducer from "./RequestSlice"

const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReducer,
        connections : conncetionReducer,
        requests : requestReducer
    
    }
})

export default appStore;
