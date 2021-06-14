import { SpecialistsAction, SpecialistsActionTypes, SpecialistsState } from "../../types/specialists";

const initialState: SpecialistsState = {
    data: [],
    loading: false,
    error: null
}

export const specialistsReducer = (state = initialState, action: SpecialistsAction): SpecialistsState => {
    switch (action.type) {
        case SpecialistsActionTypes.FETCH_DATA:
            return {data:[], loading: true, error: null}
        case SpecialistsActionTypes.FETCH_DATA_SUCCESS:
            return {data: action.payload, loading: false, error: null}
        case SpecialistsActionTypes.FETCH_DATA_ERROR:
            return {data: [], loading: false, error: action.payload}
        case SpecialistsActionTypes.UPDATE_DATA:
            return {data:[], loading: false, error: null}
        default:
            return state;
    }
}