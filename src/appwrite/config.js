import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query} from 'appwrite'
export class Services{
    client=new Client()
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImg,status,userId}){
        try {
            return await this.database.createDocument(
                conf.appWriteDataId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error
            
        }
    }

    async updatePost(slug,{title,content,featuredImg,status}){
        try {
            return await this.database.updateDocument(
                conf.appWriteDataId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: update post ::error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appWriteDataId,
                conf.appWriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: delete post ::error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appWriteDataId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service :: get post ::error",error);
            return false
        }
    }

    async getPosts(query=[Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                conf.appWriteDataId,
                conf.appWriteCollectionId,
                query,
            )
        } catch (error) {
            console.log("Appwrite Service :: get posts ::error",error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: upload post ::error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service :: delete post ::error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service=new Services()

export default service