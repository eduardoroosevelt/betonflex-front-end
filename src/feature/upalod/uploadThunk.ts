import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosProgressEvent } from "axios";
import { RootState } from "../../app/store";
import { uploadProgress, uploadService } from "./uploadAPI";
import { setUploadProgress, UploadState } from "./UploadSlice";

export const updateVideo = createAsyncThunk(
  "uploads/uploadVideo",
  async ({ idInterno, file, endpoint, field }: UploadState, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = uploadProgress(progressEvent);
      thunkAPI.dispatch(setUploadProgress({ idInterno, progress }));
    };

    try {
      const params = { idInterno, file, field, onUploadProgress, endpoint, token: state.auth.token };
            
      const response = await uploadService(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
      // You can provide a generic error message here if the error is not an instance of Error
      return thunkAPI.rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);
