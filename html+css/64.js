export default {
    on(name, callback) {
        window.addEventListener(name, (e) => {
            typeof callback === 'function' && callback(e.detail)
        })
    },
    emit(name, data) {
        var myEvent = new CustomEvent(name, { 
            detail: data,
        });
        if(window.dispatchEvent) {  
            window.dispatchEvent(myEvent);
        } else {
            window.fireEvent(myEvent);
        }
    }
}