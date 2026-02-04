import { create } from "zustand";
import  toast from 'react-hot-toast'
import { axiosInstance } from "../lib/axios";
import { useAuth } from './useAuth'


export const useChatStore = create((set,get) =>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    messageHandle:null,

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
            console.log('err',err)
        }
    },

    // optimize later
    ListenMessage:() =>{
        const {selectedUser} = get()
        if(!selectedUser) return
        const socket = useAuth.getState().Socket
        if(!socket) return

        const handler = (newMessage) =>{
            set((state) => ({
                messages : [...state.messages,newMessage]
            }))
        }
        socket.on("newMessage",handler)
        set({messageHandle:handler})
    },  
    UnlistenMessage:() =>{
        const socket = useAuth.getState().Socket
        const handler = get().messageHandle
        if(!socket || !handler) return
        socket.off('newMessage')
    },

    setSelectedUser:(selectedUser) =>{
        set({selectedUser})
    }
}))