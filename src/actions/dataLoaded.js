const dataloaded = (ind)=>{
    return {
        type: "DATA_LOADED",
        payload: {index: ind}
    }
}
export default dataloaded;