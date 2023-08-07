import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userName:'randomQi',
        age: 18,
        address: 'cd',
        token: 'kjasdhfkhasfly78685678'
    },
    reducers: {
        updateUserInfoAction(state, action){
            console.log(state, action)
        }
    }
})
console.log(userSlice)
export default userSlice.reducer
