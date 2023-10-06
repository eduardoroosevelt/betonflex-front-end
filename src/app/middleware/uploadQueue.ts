import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addUpload } from "../../feature/upalod/UploadSlice";
import { updateVideo } from "../../feature/upalod/uploadThunk";


const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
  actionCreator: addUpload,
  effect: async (action, store) => {
    await store.dispatch(updateVideo(action.payload));
  },
});

export { uploadQueue };
