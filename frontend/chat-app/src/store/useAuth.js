import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuth = create((set) =>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth : async() =>{
        try{
            const res = await axiosInstance.get('/user/check')
            console.log('res check auth',res.data)
            set({authUser:res.data})
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
            console.log('login data',res.data)
        }
        catch(err){ 

        }
    },
    logOut: async() =>{ 
        try{
            await axiosInstance.post('/user/log-out')
            set({authUser:null})
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
    }
}))


