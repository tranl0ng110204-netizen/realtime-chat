import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from 'socket.io-client'



export const useAuth = create((set,get) =>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    Socket:null,
    onlineUsers:[],

    checkAuth : async() =>{
        try{
            const res = await axiosInstance.get('/user/check')
            console.log('res check auth',res.data)
            set({authUser:res.data})
            get().connectSocket()
        }
        catch(err){
            console.log('Error checking user : ',err)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signUp: async(data) =>{
        try{
            console.log('data',data)
            const res = await axiosInstance.post('/user/sign-up',data)
            if(res){
                set({isSigningUp:true})
            }
        }
        catch(err){ 
            console.log('err',err)

        }
    },
    logIn:async(data) =>{
        try{
            const res = await axiosInstance.post('user/log-in',data)
            set({authUser:res.data})
            set({isLoggingIn:true})
            get().connectSocket()
            console.log('login data',res.data)
        }
        catch(err){ 

        }
    },
    logOut: async() =>{ 
        try{
            await axiosInstance.post('/user/log-out')
            set({authUser:null})
            get().disconnectSocket()
        }
        catch(err){
            console.log('error when logging out : ',err)
        }
       
    },
    updateProfile: async(userData) =>{
        const formData = new FormData()
        formData.append('image',userData.image)
        try{
            const res = await axiosInstance.put('/user/update',userData,{
                headers:{
                    'Content-Type' : "multipart/form-data"
                }
            })
            set({authUser:res.data})
        }
        catch(err){
            console.log('error update image',err)
        }
    },
    connectSocket:() =>{
        const {authUser} = get()
        if(!authUser || get().Socket?.connected) return 

        const socket = io('http://localhost:3000',{
            query:{
                userID:authUser._id
            }
        })
        set({Socket:socket})
        socket.on("getOnlineUsers",(userIds) =>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:() =>{
        if(get().Socket?.connected) {
            get().Socket.disconnect()
        }
    }
}))


