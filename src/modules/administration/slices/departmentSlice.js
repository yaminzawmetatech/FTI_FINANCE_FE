import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import departmentService from "../services/departmentService"
// import Cookies from "js-cookie";
const initialState = {
  departments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new department
export const createDepartment = createAsyncThunk(
  'departments/create',
  async (departmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await departmentService.createDepartment(departmentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



// Get user departments
export const getDepartments = createAsyncThunk(
  'departments',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await departmentService.getDepartments(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user department
export const deleteDepartment = createAsyncThunk(
  'departments/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await departmentService.deleteDepartment(id, token)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const updateDepartment = createAsyncThunk(
//   'department/update',
//   async ({ departmentUUID, updatedDepartmentData }, thunkAPI) => {
//     console.log( updatedDepartmentData, departmentUUID)
//     // try {
//     //   const token = thunkAPI.getState().auth.user.access_token
//     //   return await applicationInformationSetupService.updateDepartment(departmentUUID,updatedDepartmentData, token)
//     // } catch (error) {
//     //   console.log(error)
//     //   const message =
//     //     (error.response &&
//     //       error.response.data &&
//     //       error.response.data.message) ||
//     //     error.message ||
//     //     error.toString()
//     //   return thunkAPI.rejectWithValue(message)
//     // }
//   }
// )

export const updateDepartment = createAsyncThunk(
  'department/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await departmentService.updateDepartment(id, newData, token)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const batchDeleteDepartments = createAsyncThunk(
  'department/batchDelete',
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await departmentService.batchDeleteDepartments(ids, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDepartment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments.push(action.payload)
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments = action.payload.data
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments = state.departments.filter(
          (department) => department._id !== action.payload.id
        )
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments = action.payload.data
        // state.departments = state.departments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = departmentSlice.actions
export default departmentSlice.reducer
