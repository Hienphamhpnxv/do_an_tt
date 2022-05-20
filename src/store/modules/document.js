import instance from "../axios.config";
import { ROLES } from "../../utils/constants";

export const document = {
  namespaced: true,
  state: () => ({
    documents: [],
    fileExam: [],
    exams: [],
  }),
  mutations: {
    setDocuments(state, payload) {
      state.documents = payload;
    },
    setFileExam(state, payload) {
      console.log(payload);
      state.fileExam = [...state.fileExam, ...payload];
    },
    setExams(state, payload) {
      state.exams = payload;
    },
    setAddDocument(state, payload) {
      state.documents = [...state.documents, ...payload];
    },
    setAddExamDocument(state, payload) {
      state.exams = [...state.exams, ...payload];
    },
    setDocumentAfterDelete(state, payload) {
      state.documents = state.documents.filter((el) => el._id !== payload.id);
    },
    setExamDocumentAfterDelete(state, payload) {
      state.exams = state.exams.filter((el) => el._id !== payload.id);
    },
    setExamAfterUpdate(state, payload) {
      const index = state.exams.findIndex((el) => el._id === payload.id);
      if (index >= 0) {
        console.log(payload.data);
        state.exams.splice(index, 1, {
          ...payload.data,
        });
      }
    },
  },
  actions: {
    resetFileExam(_, payload) {
      _.state.fileExam = [];
    },
    resetState(_, payload) {
      _.dispatch("resetFileExam");
      _.commit("setDocuments", []);
      _.commit("setExams", []);
    },
    async createDocument(_, payload) {
      await instance
        .post("/document/create-document", payload)
        .then((res) => {
          _.commit("setAddDocument", [{ ...res.data }]);
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
    async createDocumentExam(_, payload) {
      await instance
        .post("/exam/create-exam-document", payload)
        .then((res) => {
          _.commit("setAddExamDocument", [{ ...res.data }]);
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
    async updateDocumentExam(_, { id, data }) {
      await instance
        .put(`/exam/update-exam-document/${id}`, data)
        .then((res) => {
          _.commit("setExamAfterUpdate", { id, data: res.data.result });
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
    async deleteDocumentById(_, { id }) {
      await instance
        .delete(`/document/delete-document/${id}`)
        .then((res) => {
          _.commit("setDocumentAfterDelete", { id });
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
    async getAllDocumentByClassroomID(_, { classroomId }) {
      let url = `/document/get-all-document/${classroomId}`;
      const user = _.rootState.user.user;
      if (user.roles.standOf === ROLES.QL) {
        url = `/document/get-all-document/${classroomId}/active`;
      }

      await instance
        .get(url)
        .then((res) => {
          _.commit("setDocuments", []);
          _.commit("setDocuments", res.data.result);
        })
        .catch((err) => {});
    },
    async getAllExamDocumentByClassroomID(_, { classroomId }) {
      let url = `/document/get-exam-document/${classroomId}`;
      await instance
        .get(url)
        .then((res) => {
          _.commit("setExams", res.data.result);
        })
        .catch((err) => {});
    },
    async deleteExamDocumentById(_, { id }) {
      await instance
        .delete(`/document/exam-document/${id}`)
        .then((res) => {
          _.commit("setExamDocumentAfterDelete", { id });
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsSuccess", true, { root: true });
        })
        .catch((err) => {
          _.commit("setSpinLoading", false, { root: true });
          _.commit("setIsDanger", true, { root: true });
        });
    },
  },
  getters: {},
};
