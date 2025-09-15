// 前端 JS，调用你的 Worker KV
const API_BASE = "https://wannengka-worker.fc8c4973166a429a824fee9e1fb43dad.workers.dev";

let xiaohuangCount = 0;
let xiaoqiCount = 0;

const countXH = document.getElementById("count-xiaohuang");
const countXQ = document.getElementById("count-xiaoqi");

// 页面加载时获取数据
async function loadData() {
    try {
        const res = await fetch(`${API_BASE}/get`);
        const data = await res.json();
        xiaohuangCount = data.xiaohuang;
        xiaoqiCount = data.xiaoqi;
        countXH.textContent = xiaohuangCount;
        countXQ.textContent = xiaoqiCount;
    } catch (e) {
        console.error("无法获取数据", e);
    }
}

// 保存数据到 Worker KV
async function saveData() {
    try {
        await fetch(`${API_BASE}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ xiaohuang: xiaohuangCount, xiaoqi: xiaoqiCount })
        });
    } catch (e) {
        console.error("保存数据失败", e);
    }
}

// 修改万能卡数量
function changeCard(user, delta) {
    if(user === "xiaohuang") {
        xiaohuangCount = Math.max(0, xiaohuangCount + delta);
        countXH.textContent = xiaohuangCount;
        animateCount(countXH);
    } else if(user === "xiaoqi") {
        xiaoqiCount = Math.max(0, xiaoqiCount + delta);
        countXQ.textContent = xiaoqiCount;
        animateCount(countXQ);
    }
    saveData();
}

// 数字动画
function animateCount(el) {
    el.classList.add('change');
    setTimeout(() => el.classList.remove('change'), 300);
}

// 支持键盘操作（左右箭头控制小黄，上下箭头控制小七）
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
            changeCard('xiaohuang', 1);
            break;
        case 'ArrowLeft':
            changeCard('xiaohuang', -1);
            break;
        case 'ArrowUp':
            changeCard('xiaoqi', 1);
            break;
        case 'ArrowDown':
            changeCard('xiaoqi', -1);
            break;
    }
});
