class Blog {
    constructor(args) {
        console.log('Blog is started!')
        const dataURL = "src/data/data.json"
        this.setInitData(dataURL);
    }

    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts);
    }

    getData(dataURL, func) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", ()=>{
            const list = JSON.parse(oReq.responseText).body
            func(list)
        })

        oReq.open('GET', dataURL);
        oReq.send();
    }

    insertPosts(list) {
        const ul = document.querySelector(".blogList > ul");
        list.forEach((v) => {
            ul.innerHTML += `
                <li><a href=${v.link}> ${v.title}</a></li>
            `;
        })
    }
}

export default Blog