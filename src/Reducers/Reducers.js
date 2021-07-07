import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Error from "../Components/Error/Error";
import API from "../API";

const api = new API();

export const fetchServices = createAsyncThunk(
    'fetchServices',
    async () => {
      const response = await api.fetchItems();
      if (!response.ok) {
        return response.statusText;
      }
      return await response.json();
    }
)

export const fetchService = createAsyncThunk(
    'fetchService',
    async (id) => {
      const response = await api.getItem(id);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    }
)

export const deleteService = createAsyncThunk(
    'deleteService',
    async (id) => {
      const response = await api.deleteItem(id);;
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    }
)

export const saveService = createAsyncThunk(
    'saveService',
    async (data) => {
      const response = await api.saveItem(data);;
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    }
)

const list = []

const filteredList = []

const initialState = {
  name: '',
  price: '',
  content: '',
  editedId: null,
  filterString: '',
  list,
  filteredList,
  error: null,
  loading: false
}

export const toolkitSlice = createSlice({
  name: 'myState',

  initialState,

  reducers: {
    setList(state, action) {
      if (state.list.length !== 0) return;
      state.list = action.payload;
    },
    editItem(state, action) {
      const { name, value } = action.payload;
      state.name = name;
      state.price = value
    },
    changeInputField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    changeEditedId(state, action) {
      state.editedId = action.payload;
    }
  },
  extraReducers: {
    [fetchServices.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchServices.fulfilled]: (state, action) => {
      const list = action.payload;
      return state = {...state, list, filteredList: list, loading: false, error: null}
    },
    [fetchServices.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [deleteService.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteService.fulfilled]: (state, action) => {
      const list = action.payload;
      return state = {...state, list, filteredList: list, loading: false, error: null}
    },
    [deleteService.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [fetchService.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchService.fulfilled]: (state, action) => {
      const { name, price, content } = action.payload;
      return state = {...state, name, price, content, loading: false, error: null}
    },
    [fetchService.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [saveService.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [saveService.fulfilled]: (state, action) => {
      const list = action.payload;
      return state = {...state, list, filteredList: list, loading: false, error: null}
    },
    [saveService.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  }
})


export default toolkitSlice.reducer;
export const { editItem, changeInputField, changeEditedId, applyFilter, changeFilteredList, setList, fetchServicesRequest, fetchServiceSuccess, fetchServicesSuccess, fetchServicesError } = toolkitSlice.actions;