function exposeMethod(methodName, method){
    if (window[methodName]) return;
    window[methodName] = method;
}

export {
    exposeMethod
};