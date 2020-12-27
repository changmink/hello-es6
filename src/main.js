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
            const postTitle = target.previousElementSibling.textContent;

            if (targetClassName === "unlike") {
                this.likedSet.delete(postTitle)
                target.className = "like"
            }

            if (targetClassName === "like") {
                this.likedSet.add(postTitle)
                target.className = "unlike"
            }
            this.updateLikedList();
        });
    }

    updateLikedList(){
        const ul = document.querySelector(".like-list > ul");
        let likedList = "";
        this.likedSet.forEach((value) => {
            likedList += `<li>${value}</li>`
        })
        ul.innerHTML = likedList;
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