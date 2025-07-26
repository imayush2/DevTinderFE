import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
    name : "connections",
    initialState : [], 
    reducers : {
        addConnection : (state , action) => {
            return action.payload;
        },
        removeConnections : (state, action) => {
            return state.filter((req) => req._id !== action.payload);
          }
    }
})

export const {addConnection, removeConnections} = connection.actions;

export default connection.reducer;