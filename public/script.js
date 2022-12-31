// const { default: axios } = require("axios")

window.onload = ()=> {
    const timeElements = document.querySelectorAll(".time")
    timeElements.forEach(element => {
        element.addEventListener("click", timeclick)
    }) 
}
const ragaclick = (event)=> {
    let id = event.target.id
    axios.get("http://localhost:4004/ragas/"+id).then((res)=> {
        console.log(res)
        const ragasDiv= document.querySelector("#ragadetails");
        ragasDiv.innerHTML= "";
        const h1=document.createElement("h1")
        h1.textContent=res.data[0].raganame
        ragasDiv.appendChild(h1)
        const description=document.createElement("p")
        description.textContent=res.data[0].description
        ragasDiv.appendChild(description)
        const iframe=document.createElement("iframe")
        iframe.setAttribute("width",560)
        iframe.setAttribute("height",300)
        iframe.setAttribute("allowfullscreen","true")
        iframe.setAttribute("src", res.data[0].url)
        ragasDiv.appendChild(iframe)
    })
}
let timeclick = (event)=>{
    const ragadetails= document.querySelector("#ragadetails");
    ragadetails.innerHTML = ""
    let [starttime, endtime] = event.target.id.split("-")
    // let body = {
    //     starttime: parseInt(starttime), endtime: parseInt(endtime)
    // }
    axios.get("http://localhost:4004/ragas/"+starttime+"/"+endtime).then((res)=> {
        const ragasDiv= document.querySelector("#ragas");
        ragasDiv.innerHTML= "";
        for(const raga of res.data){
            const ragaElement = document.createElement("p")
            ragaElement.setAttribute("id", raga.ragaid)
            ragaElement.textContent = raga.raganame
            ragaElement.addEventListener("click", ragaclick)
            ragasDiv.appendChild(ragaElement)
        }
    })

}