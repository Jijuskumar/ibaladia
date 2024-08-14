import {createSlice} from '@reduxjs/toolkit';
import {UserBO} from '../../BOs/UserBO';

const initialState: {value: UserBO} = {
  value: {
    member_type: 'user',
    r_object_id: '',
    login_name: '',
    is_superuser: false,
    member_email: '',
    name: '',
    label: '',
    user_privileges: 0,
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {updateUser} = accountSlice.actions;

export default accountSlice.reducer;
