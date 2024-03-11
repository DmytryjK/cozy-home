import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType } from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';
import fetchData from '../../utils/fetchData';

interface DataType {
    products: [
        {
            skuCode: string;
            name: string;
            imagePath: string;
            colorHex: string;
            price: number;
            priceWithDiscount: number;
            quantityStatus?: string;
        }
    ];
    categories: [
        {
            id: string;
            name: string;
            countOfProducts: number;
        }
    ];
}

interface SearchInitialState {
    loading: Loading;
    error: ErrorType;
    data: DataType | null;
}

const initialState: SearchInitialState = {
    loading: 'idle',
    error: null,
    data: null,
};

let controller: any = null;

export const fetchResultsBySearchValue = createAsyncThunk(
    'search/fetchResultsBySearchValue',
    async function (searchValue: string, thunkAPI) {
        try {
            if (controller) {
                controller.abort();
            }
            controller = new AbortController();
            const encodeValue = encodeURI(searchValue);

            const response = await fetchData({
                method: 'GET',
                request: `${API_BASE}product/search?keyWord=${encodeValue}`,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                signal: controller.signal,
            });
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearch(state) {
            state.loading = 'idle';
            state.error = null;
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchResultsBySearchValue.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchResultsBySearchValue.fulfilled,
            (state, action: PayloadAction<DataType>) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            }
        );
        builder.addCase(
            fetchResultsBySearchValue.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.error = action.payload;
            }
        );
    },
});
export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
