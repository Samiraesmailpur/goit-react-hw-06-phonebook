import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [
  { id: '1', name: 'Rosie Simpson', number: '4591256' },
  { id: 'id-2', name: 'Hermione Kline', number: '4438912' },
  { id: 'id-3', name: 'Eden Clements', number: '6451779' },
  { id: 'id-4', name: 'Annie Copeland', number: '2279126' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: contactsInitialState },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(index, 1);
    },
  },
});

export const { addTask, deleteTask } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
