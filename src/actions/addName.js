const addName = (name)=>{
    return {
        type: "ADD_NAME",
        payload: {value:name, label: name}
    }
}
export default addName;