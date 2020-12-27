class Blog{
    constructor(args) {
        console.log('Blog is started!')
        const dataURL = "src/data/data.json"
        this.setInitData(dataURL);
    }

    setInitData(dataURL) {
        this.getData(dataURL);
    }

    getData(dataURL) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", ()=>{
            const list = JSON.parse(oReq.responseText).body
            console.log(list)
            list.forEach((v) => {
               console.log(v.title) 
            });
        })

        oReq.open('GET', dataURL);
        oReq.send();
    }
}

export default Blog