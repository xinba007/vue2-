// import { getsnitchlist } from '@/api/salesManage/index'
export default {
   state: {
      uploafileddata:null,
      droplistdata:null,
   },
   mutations: {
      SET_UPLOADFILEDATA: (state, data) => {
         state.uploafileddata = data
      },
      SET_DROPLISTDATA: (state, data) => {
         state.droplistdata = data
      }
   },
   actions: {
      setUploaddata: ({ commit }, data) => {
         commit('SET_UPLOADFILEDATA',data)
      },
      setDroplistdata: ({ commit }, data) => {
         commit('SET_DROPLISTDATA',data)
      }
   }
}