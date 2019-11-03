const removeName = (name)=>{
    return {
        type: "REMOVE_NAME",
        payload: {value:name, label: name}
    }
}
export default removeName;