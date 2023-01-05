// const { default: axios } = require("axios")

window.onload = ()=> {
    const timeElements = document.querySelectorAll(".time")
    timeElements.forEach(element => {
        element.addEventListener("click", timeclick)
    }) 
    const editElements = document.querySelectorAll(".edit")
    editElements.forEach(element => {
        element.addEventListener("click", editclick)
        element.addEventListener("keypress", putRaga)
        element.addEventListener("focusout", putRaga)

    }) 
    document.getElementById("raga-form").addEventListener("submit", submitRaga)
} 

const putRaga = () => {}
    const editclick = (e) => {
    e.target.sibling.editable=true
}
const ragaclick = (event)=> {
    event.stopPropagation()
    const ragasDiv= event.target.parentElement.parentElement.querySelector(".ragadetails");
    ragasDiv.innerHTML= "";
    let id = event.target.id
    axios.get("http://localhost:4004/ragas/"+id).then((res)=> {
        console.log(res)
        const h1=document.createElement("h1")
        h1.innerHTML="<span class = 'edit'> &#9998; </span>" + `<span class = 'content'> ${res.data[0].raganame} </span>`
        ragasDiv.appendChild(h1)
        const description=document.createElement("p")
        description.innerHTML="<span class = 'edit'> &#9998; </span>" + `<span class = 'content'> ${res.data[0].description} </span>`
        ragasDiv.appendChild(description)
        // const iframe=document.createElement("iframe")
        // iframe.setAttribute("width",560)
        // iframe.setAttribute("height",300)
        // iframe.setAttribute("allowfullscreen","true")
        // iframe.setAttribute("src", res.data[0].url)
        // ragasDiv.appendChild(iframe)
        ragasDiv.innerHTML = `
        <iframe width="560" height="315" src="${res.data[0].url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `
    })
}
let timeclick = (event)=>{
    event.stopPropagation()
    const ragadetails= event.target.parentElement.querySelector(".ragadetails");
    ragadetails.innerHTML = ""
    let [starttime, endtime] = event.target.id.split("-")
    // let body = {
    //     starttime: parseInt(starttime), endtime: parseInt(endtime)
    // }
    axios.get("http://localhost:4004/ragas/"+starttime+"/"+endtime).then((res)=> {
        const ragasDiv= event.target.querySelector(".ragas");
        ragasDiv.innerHTML= "";
        for(const raga of res.data){
            const ragaElement = document.createElement("p")
            ragaElement.setAttribute("id", raga.ragaid)
            ragaElement.innerHTML=raga.raganame
            ragaElement.addEventListener("click", ragaclick)
            ragasDiv.appendChild(ragaElement)
        }
    })

}

const submitRaga = (e) => {
    e.preventDefault()
    console.log("hi")
    console.log(e)
    const raganame = e.target.elements.raganame.value
    const description = e.target.elements.description.value
    const starttime = Number(e.target.elements.starttime.value)
    const endtime = Number(e.target.elements.endtime.value)
    const url = e.target.elements.url.value
    axios.post("/postRaga", {body: {
        raganame, description, starttime, endtime, url
    }}).then((res)=> {
        console.log(res)
    })
}
