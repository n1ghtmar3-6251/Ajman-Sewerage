export class Memory {

    static setRemeberMe(value = false) {
     localStorage.setItem("remeberme",value)
    }

    static isRemeberMe() {
        localStorage.getItem("remeberme")
    }

    static setItem(key,value) {
        localStorage.setItem(key,value)
    }

    static getItem(key) {
        try 
        {
            if(localStorage == undefined){
                return false;
            }
        }
        catch (e) 
        {
            return false
        }

        return  localStorage.getItem(key)
    }

    static setItemInfo(key, model) {
        localStorage.setItem(key, JSON.stringify(model));
    }

    static getItemInfo(key) {
        try 
        {
         if(localStorage === undefined){
            return null;
         }
         var retrievedObject = localStorage.getItem(key);
         return  JSON.parse(retrievedObject)
        
        }
        catch (e) {
            return null
        }
    }

    static clearItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear()
        sessionStorage.clear()
    }

}
