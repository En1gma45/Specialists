
export interface SpecialistsState {
    data: any[];
    loading: boolean;
    error: null | string;
}

export enum SpecialistsActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR',
    UPDATE_DATA = 'UPDATE_DATA'
}

interface FetchDataAction {
    type: SpecialistsActionTypes.FETCH_DATA
}

interface FetchDataSuccessAction {
    type: SpecialistsActionTypes.FETCH_DATA_SUCCESS
    payload: any[]
}

interface FetchDataErrorAction {
    type: SpecialistsActionTypes.FETCH_DATA_ERROR
    payload: string
}

interface FetchDataUpdateAction {
    type: SpecialistsActionTypes.UPDATE_DATA
}

export type SpecialistsAction = FetchDataAction | FetchDataSuccessAction | FetchDataErrorAction | FetchDataUpdateAction