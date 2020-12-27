class Blog {
    constructor(args) {
        console.log('Blog is started!')
        this.setInitVariables();
        this.registerEvents();
        this.likedSet = new Set();
    }

    setInitVariables() {
        this.blogList = document.querySelector(".blogList > ul")
    }

    registerEvents() {
        const startBtn = document.querySelector(".start")
        const dataURL = "src/data/data.json"

        startBtn.addEventListener("click", () => {
            this.setInitData(dataURL);
        })

        this.blogList.addEventListener("click", ({target}) => {
            const targetClassName = target.className;
            if (targetClassName === "like") {
                const postTitle = target.previousElementSibling.textContent;
                this.likedSet.add(postTitle)
            }
        });
    }

    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts.bind(this));
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
        list.forEach((v) => {
            this.blogList.innerHTML += `
                <li>
                    <a href=${v.link}> ${v.title}</a>
                    <div class="like">찜하기</div>
                </li>
            `;
        })
    }
}

export default Blog