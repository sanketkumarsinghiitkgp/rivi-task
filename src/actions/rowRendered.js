const rowrendered = (ind)=>{
    return {
        type: "ROW_RENDERED",
        payload: {index: ind}
    }
}
export default rowrendered;