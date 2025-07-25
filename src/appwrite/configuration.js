import conf from "../conf/config.js";

import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    account;
    databases;
    bucket;

    constructor(){
         this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
      this.databases= new Databases(this.client)
      this.bucket = new Storage(this.client)
   
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug,{
                title,content,featuredImage,status,userId
            })
            
        } catch (error) {
            console.log(error)
            
        }

    }

   async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug,{
            title,content,featuredImage,status
        })
    } catch (error) {
        console.log(error)
        
    }


   } 
   async deletePost(slug){
    try {
         await this.databases.deleteDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }


   } 
async getPost(slug){
    try {
        await this.databases.getDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug)
        return true;

        
    } catch (error) {
        console.log(error)
        return false
        
    }
}
async getPosts(queries = [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabseId,
            conf.appwriteCollectionId,
            queries,
        )
        
    } catch (error) {
        console.log(error)
        return false
    }
}
async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(error)
        return false
    }
}
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId

        )
    } catch (error) {
        console.log(error)
        return false
    }
}
getfilePreview(fileId){
    this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}
}
const service = new Service()

export default service;
