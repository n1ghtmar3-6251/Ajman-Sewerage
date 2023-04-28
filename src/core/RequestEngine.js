import axios from 'axios';
import Constants from "../core/Constants";
import {Memory} from "./Memory";

 class RequestEngine {
    constructor() {

        let token = Memory.getItem('token');
        this.apiEngine = axios.create({
            baseURL: Constants.serverlink,
            timeout: Constants.timeout,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'currentLanguage': 'en-US',//ar,hi,en-US
                'Accept-Language': 'en-US',
                'Authorization':'bearer '+token
            }
        });
       // this.debugit();
    }

    debugit(){
        this.apiEngine.interceptors.request.use(request => {
            console.log('Starting Request', request);
            return request
        });

        this.apiEngine.interceptors.response.use(response => {
            console.log('Response:', response);
            return response
        })
    }

     async getItemlistDirect(path,list="/list") {
         const link = '/api/admin/'+path+list;
         //console.warn(link);
         return await this.apiEngine.get(link)
     }

     toggleuserstatus(paramid,ismanager,callback) {
        if(ismanager){
            ismanager = 1;
        }else{
            ismanager = 0;
        }
         const link = '/api/admin/toggleuserstatus/'+paramid+"/"+ismanager;

         //console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveSettings(data,callback) {
         const link = '/api/admin/settings/save';
         //console.warn(link);
         this.apiEngine.post(link,data)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     deleteUser(id,callback) {
         const link = '/api/admin/user/delete/'+id;
        // console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     registerUser(formData,callback) {
        const link = '/api/appUser/register';
        this.apiEngine.post(link, formData)
            .then((response) => {
                callback(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

     deleteManager(id,callback) {
         const link = '/api/admin/manager/delete/'+id;
         // console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     deleteUsersubscribe(id,callback) {
         const link = '/api/admin/usersubscribe/delete/'+id;
         // console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     async deleteItem(path,id) {
         const link = '/api/admin/'+path+'/delete/'+id;
         console.log(link)
         return await this.apiEngine.get(link)
     }

     async approveItem(path,id) {
         const link = '/api/admin/'+path+'/approve/'+id;
         console.log(link)
         return await this.apiEngine.get(link)
     }

     async login(username,password) {
         const link = '/api/admin/login';
         const data = {username :username,password:password}
         //console.warn(link);
         return await this.apiEngine.post(link,data);
     }

     getUsers(manager,callback) {
         let link = '/api/admin/user/list';
         if(manager){
             link = '/api/admin/manager/list';
         }
         //console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     getSettingsinfo(callback) {
         const link = '/api/admin/settings';
         //console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     getdashboard(callback) {
         const link = '/api/admin/article';
         //console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveUserManager(data,callback) {
         const link = '/api/admin/manager/save';
         //console.warn(link);
         this.apiEngine.post(link,data)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveUserMobile(data,callback) {
         const link = '/api/admin/user/save';
         //console.warn(link);
         this.apiEngine.post(link,data)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveUser(formData,callback) {
         const link = '/api/admin/user/save';
         //console.warn(link);
         const config = {
             headers: {
                 'content-type': 'multipart/form-data'
             }
         };
         this.apiEngine.post(link,formData,config)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     async saveItemData(path,formData) {
         const link = path;

         const config = {
             headers: {
                 'content-type': 'multipart/form-data',
                 'currentLanguage': 'en-US',
                 'Accept-Language': 'en-US',
             }
         };
         return await this.apiEngine.post(link,formData,config)
     }
     async saveItem(path,data) {
         const link = '/api/admin/'+path+'/save';
         //console.warn(link);
         return await this.apiEngine.post(link,data);
     }


     async postItemData(path,formData) {
        const link = path;

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'currentLanguage': 'en-US',
                'Accept-Language': 'en-US',
            }
        };
        return await axios.create({
           timeout: Constants.timeout,
           mode: 'no-cors',
           headers: {
               'Content-Type': 'multipart/form-data',
           }
       }).post(link,formData,config)
    }

    async postFormData(path,formData) {
        const link = Constants.serverlink+'/'+path;

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Accept-Language': 'en-US',
            }
        };
        return await axios.create({
           timeout: Constants.timeout,
           mode: 'no-cors',
           headers: { 'Content-Type': 'multipart/form-data'}
       }).post(link,formData,config)
    }


     async getItem(path) {
         const link = '/'+path;
         console.warn(link);
         return await this.apiEngine.get(link)
     }

     async deleteItemAsync(path,param = "/delete") {
         const link = '/'+path+param;
         //console.warn(link);
         return await this.apiEngine.delete(link)
     }

     async exportCSV(path,param = "/list") {
         const link = Constants.serverlink+''+path+param;
         axios({
             url: link, //your url
             method: 'GET',
             responseType: 'blob', // important
         }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'export.csv'); //or any other extension
             document.body.appendChild(link);
             link.click();
         });
     }


     async postItem(path,data = {}) {
         const link =path;
         //console.warn(link);
         return await this.apiEngine.post(link,data)
     }

     async validateProperty(path) {
        
        const link = '/'+path;
        return await this.apiEngine.get(link)
    }

    async exportPDF(fileName, url, errorCallback) {
        
        const link = url;
        let token = Memory.getItem('token');
        axios({
            url: link, //your url
            method: 'GET',
            responseType: 'blob', // important
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'currentLanguage': 'en-US',
                'Accept-Language': 'en-US',
                'Authorization':'bearer '+token
            }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            errorCallback(error.response);
        });
    }


    async post(path, data = {}, callback, errorCallback) {
        const link = path;
        
        await this.apiEngine.post(link,data)
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            errorCallback(error.response);
        });
    }

    async postForm(path, formData, callback, errorCallback) {

        const link = Constants.serverlink + '/' + path;

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Accept-Language': 'en-US',
            }
        };

        await axios.create({
           timeout: Constants.timeout,
           mode: 'no-cors',
           headers: { 'Content-Type': 'multipart/form-data'}
       })
       .post(link,formData,config)
       .then((response) => {
            callback(response);
        })
        .catch((error) => {
            errorCallback(error.response);
        });
    }
}

export default RequestEngine;

