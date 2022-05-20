import { TYPE_FEATURES } from "./constants";
import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import store from "../store";

const uploadFileOnFirebase = (
  e,
  typeFeature = TYPE_FEATURES.DOCUMENT_CLASS
) => {
  // e.preventDefault();
  const classroomAccessId = store.state.classroom.classroomAccess._id;
  const file = e.target.files[0];
  if (!file || !classroomAccessId) return;

  store.commit("setSpinLoading", true, { root: true });
  const storageRef = ref(
    storage,
    `classroom/${classroomAccessId}/${Date.now()}_${file.name}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgresspercent(progress);
    },
    (error) => {
      store.commit("setSpinLoading", false, { root: true });
      alert(error);
    },
    async () => {
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const author = store.state.user.user._id;
        if (typeFeature === TYPE_FEATURES.DOCUMENT_CLASS) {
          const data = {
            title: file.name,
            classroom: classroomAccessId,
            url: downloadURL,
            type: file.type,
            author,
          };
          if (store.state.classroom.classroomAccess.statusActive === 0) {
            data.isDocumentActive = true;
          }
          store.dispatch("document/createDocument", data);
        }

        if (typeFeature === TYPE_FEATURES.DOCUMENT_EXAM) {
          const data = {
            title: file.name,
            url: downloadURL,
            type: file.type,
            author,
          };
          store.commit("document/setFileExam", [data]);
          store.commit("setSpinLoading", false, { root: true });
        }
      });
    }
  );
};

export const storageService = { uploadFileOnFirebase };
