const load = (obj)=>{
    return {
        type: "LOAD",
        payload: {value: obj}
    }
}
export default load;