const password = "BMICE28012026";

function checkPass(){
    const input = document.getElementById("pass").value;

    if(input === password){
        document.getElementById("lock").style.display="none";
        document.getElementById("home").classList.remove("hidden");
    }else{
        document.getElementById("error").innerText="รหัสไม่ถูกน้าา ลองอีกที 💔";
    }
}
const noQuestions = [
    "แน่ใจออออ 😢",
    "คิดดีๆนาาา 🤔",
    "ไม่รักเค้าอออ 💔",
    "ลองกดใหม่อีกรอบสิ 😳",
    "เค้าให้โอกาสแก้ตัวนะ 😾",
    "ถ้ากดอีกทีเค้างอนจริงๆละนะ 😿",
    "โอเค งั้นถามใหม่… รักเค้ามั้ยยย 💖"
];

let noIndex = 0;

let loveSize = 18;

function growLove(){
    loveSize += 10;
    let loveBtn = document.getElementById("loveBtn");
    loveBtn.style.fontSize = loveSize+"px";

    const title = document.querySelector("#home h1");
    title.innerText = noQuestions[noIndex];

    noIndex++;

    // 👉 ถ้าถึงคำถามสุดท้าย
    if(noIndex >= noQuestions.length){
        noIndex = noQuestions.length - 1;

        // ซ่อนปุ่มไม่รัก
        document.getElementById("noBtn").style.display = "none";
    }

    // clone ปุ่มรักเหมือนเดิม
    for(let i=0;i<2;i++){
        let clone = loveBtn.cloneNode(true);
        clone.innerText = "รัก";
        document.getElementById("home").appendChild(clone);
}

}



function love(){
    document.getElementById("home").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

function openMode(mode){
    document.getElementById("menu").classList.add("hidden");
    document.getElementById(mode).classList.remove("hidden");
}

function back(){
    document.querySelectorAll("#quiz,#photo,#secret")
        .forEach(e=>e.classList.add("hidden"));
    document.getElementById("menu").classList.remove("hidden");
}

/* ===== QUIZ ===== */

const questions = [
    "เราเจอกันครั้งแรกที่ไหน?",
    "ใครทักใครก่อน?",
    "วาเลนไทน์นี้อยากทำอะไรด้วยกันบ้างงง?",
    "ถ้าให้บอกสิ่งหนึ่งที่เธอชอบในตัวเค้าคืออะไร?",
    "เพลงรักที่สื่อถึงเราาช่วงนี้?",
    "1คำที่ใช้สื่อถึงความรักที่มีให้กันน?",
    "เธอรักเค้ามั้ย?"
];

const myAnswers = [
    "โรงเรียนตอนวันที่จัดกิจกรรมชุดรีไซเคิลตอนนั้นแUบเธอสวยมากกกทำเค้าตะลึงไปพักนึงเรยยย",
    "เธOงัยย",
    "อยากออกไปIที่ยวด้วยกันสักที่นึงสงบๆ กินอะไรอร่อยๆด้วยกันน นอนมองหน้าเธอเฉยๆไม่ต้องคิดอะไรให้ปวดหัวไม่ต้องทำงานหนักให้มันเหนื่อยแค่อยู่ด้วยกันสงบๆไม่ต้องทำอะไรปล่อยตัวปล่อยใจปล่อยให้เวลามันไหลไปเป็นของเราแค่2คน",
    "ความฉดใฉฉฉขอVเธออ",
    "vaLentine",
    "EntropY",
    "รักค้าบบน้องกระตุ่ยน้Oยของเค้าาา"
];

function checkAnswer(){
    let table = `
        <table style="width:100%;margin-top:20px;border-collapse:collapse">
        <tr style="background:#ffe4ec">
            <th style="padding:10px">คำถาม</th>
            <th>คำตอบเธอ 💬</th>
            <th>ของเค้า 💭</th>
        </tr>
    `;

    for(let i=1;i<=7;i++){
        let userAns = document.getElementById("q"+i).value || "-";

        table += `
            <tr>
                <td style="padding:8px;border-top:1px solid #eee">${questions[i-1]}</td>
                <td style="border-top:1px solid #eee">${userAns}</td>
                <td style="border-top:1px solid #eee">${myAnswers[i-1]}</td>
            </tr>
        `;
    }

    table += "</table>";

    document.getElementById("quizTable").innerHTML =
        "<div class='loveCard'>💌 จดหมาย<br>"+table+"</div>";
}

/* ===== HEART EFFECT WHEN TYPING ===== */

document.querySelectorAll("#quiz input, #secretMainPass").forEach(inp=>{
    inp.addEventListener("input", ()=>{
        const rect = inp.getBoundingClientRect();

        for(let i=0;i<3;i++){
            let heart=document.createElement("div");
            heart.className="heart";
            heart.innerText="💖";

            heart.style.left = (rect.left + Math.random()*rect.width) + "px";
            heart.style.top  = (rect.top  + Math.random()*rect.height) + "px";

            document.body.appendChild(heart);
            setTimeout(()=>heart.remove(),1200);
        }
    });
});

/* ===== PHOTO SYSTEM ===== */

function openPhotoPage(type){
    document.getElementById("photo").classList.add("hidden");

    if(type==="her"){
        document.getElementById("herPage").classList.remove("hidden");
        loadHer();
    }
    if(type==="us"){
        document.getElementById("usPage").classList.remove("hidden");
        loadUs();
    }
    if(type==="me"){
        document.getElementById("mePage").classList.remove("hidden");
        loadMe('normal');
    }
}

function backToPhoto(){
    document.querySelectorAll("#herPage,#usPage,#mePage")
        .forEach(e=>e.classList.add("hidden"));

    document.getElementById("photo").classList.remove("hidden");
}

function loadHer(){
    const box=document.getElementById("herGallery");
    box.innerHTML="";
    ["images/her1.jpg","images/her2.jpg"].forEach(src=>{
        const img=document.createElement("img");
        img.src=src;
        img.className="photo";
        box.appendChild(img);
    });
}

function loadUs(){
    const box=document.getElementById("usGallery");
    box.innerHTML="";
    ["images/us1.jpg","images/us2.jpg"].forEach(src=>{
        const img=document.createElement("img");
        img.src=src;
        img.className="photo";
        box.appendChild(img);
    });
}

function loadMe(mode){
    const box=document.getElementById("meGallery");
    box.innerHTML="";

    let imgs = mode==="secret"
        ? ["secret2.webp"]
        : ["me1.jpg","images/me2.jpg"];

    imgs.forEach(src=>{
        const img=document.createElement("img");
        img.src=src;
        img.className="photo";
        box.appendChild(img);
    });
}

/* ===== SECRET MODE ===== */

function showSecretBox(){
    document.getElementById("secretInputBox").classList.remove("hidden");
}

function unlockSecret(){
    const pass=document.getElementById("secretPass").value;

    if(pass==="K56"){
        document.getElementById("secretInputBox").classList.add("hidden");
        loadMe("secret");
    }else{
        document.getElementById("secretError").innerText="รหัสไม่ถูกน้าา 💔";
    }
}

function openSecret(){
    const pass=document.getElementById("secretMainPass").value;

    if(pass==="I LOVE YOU"){
        document.getElementById("secretContent").classList.remove("hidden");
        document.getElementById("secretMainError").innerText="";
        generateTree();   // 👉 สร้างต้นไม้ตอนเปิด secret เท่านั้น
    }else{
        document.getElementById("secretMainError").innerText="รหัสไม่ถูกน้าา 💔";
    }
}

/* ===== TREE GENERATOR (ใบไม้หัวใจ) ===== */

function generateTree(){
    const crown = document.getElementById("crown");
    if(!crown) return;

    crown.innerHTML="";

    const centerX = 260;
    const centerY = 190;

    for(let i=0;i<160;i++){   // ใบเพิ่มเป็น 160
        const t = Math.random()*Math.PI*2;

        // สูตรหัวใจ
        const x = 16*Math.pow(Math.sin(t),3);
        const y = -(13*Math.cos(t)
                  -5*Math.cos(2*t)
                  -2*Math.cos(3*t)
                  -Math.cos(4*t));

        const scale = 9 + Math.random()*2;

        const leaf=document.createElement("div");
        leaf.className="leaf";

        leaf.style.left = centerX + x*scale + "px";
        leaf.style.top  = centerY + y*scale + "px";

        crown.appendChild(leaf);
    }
}

/* ===== FALLING HEARTS ===== */

setInterval(()=>{
    const zone = document.getElementById("fallingHearts");
    if(!zone) return;

    const heart=document.createElement("div");
    heart.className="fallHeart";
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.top="-20px";
    heart.style.animationDuration=4+Math.random()*4+"s";

    zone.appendChild(heart);
    setTimeout(()=>heart.remove(),8000);
},350);
