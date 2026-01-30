import { create } from "zustand";
import  toast from 'react-hot-toast'
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get) =>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUser : async() =>{
        set({isUserLoading:true})
        try{
            const res  = await axiosInstance.get('/message/user')
            set({users:res.data})
        }   

        catch(error){
            toast.error(error.response.data.message)
        }
        finally{
            set({isUserLoading:false})
        }
    },
    getMessages :async(userID) =>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/message/${userID}`)
            set({messages:res.data.message})
        }
        catch(error){
            toast.error(error.response.data.message)
        }
        finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async(messageData) =>{
        const {selectedUser}  = get()
        const formData = new FormData()
        formData.append('text',messageData.text)
        formData.append('image',messageData.image)
        try{
        const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,formData,
            {
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            }
        )
        set((state) =>({
            messages:[...state.messages,res.data]
        }))
        
        }
        catch(err){

        }
        
        
    },
    setSelectedUser:(selectedUser) =>{
        set({selectedUser})
    }
}))