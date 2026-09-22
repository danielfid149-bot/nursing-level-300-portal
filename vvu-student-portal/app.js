
const courses=[
["ENGL111","Language and Writing Skills I"],["RELB163","Life and Teachings of Jesus"],["FREN121","French for General Communication I"],["PEAC100","Physical Activity"],["GNED125","Study Skills"],["PHYS106","Physics for Computer Science"],["COSC115","Introduction to Computer Science I"],["COSC113","Elements of Programming"],["MATH171","Introductory Mathematics for Computer Science"]
];
function setTheme(t){document.documentElement.classList.toggle("light",t==="light");localStorage.setItem("vvu-theme",t)}
function toggleTheme(){setTheme(document.documentElement.classList.contains("light")?"dark":"light")}
setTheme(localStorage.getItem("vvu-theme")||"dark");
function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open("vvuPortalDB",1);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains("files"))db.createObjectStore("files",{keyPath:"id",autoIncrement:true}).createIndex("course","course")};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function addFile(course,file,category){const db=await openDB();const tx=db.transaction("files","readwrite");tx.objectStore("files").add({course,name:file.name,type:file.type,size:file.size,category,data:file,created:Date.now()});return new Promise(r=>tx.oncomplete=r)}
async function listFiles(course){const db=await openDB();return new Promise((res,rej)=>{const tx=db.transaction("files","readonly");const idx=tx.objectStore("files").index("course");const q=idx.getAll(course);q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error)})}
async function deleteFile(id){const db=await openDB();const tx=db.transaction("files","readwrite");tx.objectStore("files").delete(id);return new Promise(r=>tx.oncomplete=r)}
function bytes(n){if(n<1024)return n+" B";if(n<1048576)return (n/1024).toFixed(1)+" KB";return (n/1048576).toFixed(1)+" MB"}
function courseLink(code){return "course.html?course="+encodeURIComponent(code)}
