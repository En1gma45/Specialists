import { specialistsReducer } from './SpecialistReducer';
import { combineReducers } from "redux";


export const rootReducer = combineReducers({
    posts: specialistsReducer
})

export type RootState = ReturnType<typeof rootReducer>