class HttpRequests{

    static get(url, params = {}){
        console.log('REQUEST GET DADO AQUI')
        console.log('URL DE GET REQUISITADA:', url)
        HttpRequests.request('GET', url, params);
    }
    static delete(url, params = {}){
        HttpRequests.request('DELETE', url, params);
    }
    static put(url, params = {}){
        HttpRequests.request('PUT', url, params);
    }
    static post(url, params = {}){
        HttpRequests.request('POST', url, params);
    }

    static request(method, url, params = {}) {

        return new Promise((resolve, reject) => {

            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);

            ajax.onerror = event => {
                console.log('OK DEU ERRO1')
                reject(e);

            };
    
            ajax.onload = event => {
    
                let obj = {};
    
                try {
    
                    obj = JSON.parse(ajax.responseText);
                    console.log('JSON RETURN', JSON.stringify(obj))
    
                } catch (e) {

                    console.log('DEU ERRO 2')
                    reject(e);
                    console.error(e);
    
                }

                resolve(obj);
    
            };
    
            ajax.send();

        });

    }
}