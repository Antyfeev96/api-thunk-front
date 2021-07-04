import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    fetchServicesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchServiceSuccess(state, action) {
      console.log(action.payload)
      const { name, price, content } = action.payload;
      return state = {...state, name, price, content, loading: false, error: null}
    },
    fetchServicesSuccess(state, action) {
      const list = action.payload;
      return state = {...state, list, filteredList: list, loading: false, error: null}
    },
    fetchServicesError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setList(state, action) {
      if (state.list.length !== 0) return;
      state.list = action.payload;
    },
    addItem(state, action) {
      const { name, price } = action.payload;
      state.list.push({ id: nanoid(), name, price })
    },
    editItem(state, action) {
      const { name, value } = action.payload;
      state.name = name;
      state.price = value
    },
    removeItem(state, action) {
      const { id } = action.payload;
      state.list = state.list.filter(item => item.id !== id)
    },
    changeInputField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    changeEditedId(state, action) {
      state.editedId = action.payload;
    },
    saveEditedItem(state, action) {
      const { name, price } = action.payload;
      state.list = state.list.map(item => {
        if (item.id === state.editedId) {
          item.name = name;
          item.price = price
        }
        return item;
      })
    },
    applyFilter(state, action) {
      state.filterString = action.payload.toLowerCase();
    },
    changeFilteredList(state) {
      state.filteredList = [...state.list.filter(item => item.name.toLowerCase().includes(state.filterString))];
    }
  }
})


export default toolkitSlice.reducer;
export const { addItem, editItem, removeItem, changeInputField, changeEditedId, saveEditedItem, applyFilter, changeFilteredList, setList, fetchServicesRequest, fetchServiceSuccess, fetchServicesSuccess, fetchServicesError } = toolkitSlice.actions;