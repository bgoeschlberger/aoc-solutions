export class IO {

    static get lines(){
        return document.body.textContent.trim().split('\n');
    }

    static getScriptContent(name){
        return new Promise((resolve) => {
            const req = new XMLHttpRequest();
            req.open('get', name + '.bundle.js');
            req.addEventListener('readystatechange', (e) => {
                if(req.readyState === XMLHttpRequest.DONE){
                    resolve(req.responseText);
                }
            });
            req.send();
        });
    }

}