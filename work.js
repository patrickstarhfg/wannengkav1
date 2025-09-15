// 1. 改成你的 Worker URL
const API_BASE = "https://wannengka-worker.yourid.workers.dev";

let xiaohuangCount = 0;
let xiaoqiCount = 0;

const countXH = document.getElementById("count-xiaohuang");
const countXQ = document.getElementById("count-xiaoqi");

// 2. 页面加载：获取 Worker KV 数量
async function loadData() {
    const res = await fetch(`${API_BASE}/get`);
    const data = await res.json();
    xiaohuangCount = data.xiaohuang;
    xiaoqiCount = data.xiaoqi;
    countXH.textContent = xiaohuangCount;
    countXQ.textContent = xiaoqiCount;
}

// 3. 保存到 Worker KV
async function saveData() {
    await fetch(`${API_BASE}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xiaohuang: xiaohuangCount, xiaoqi: xiaoqiCount })
    });
}

// 4. 修改数量函数
function changeCard(user, delta) {
    if (user === "xiaohuang") {
        xiaohuangCount = Math.max(0, xiaohuangCount + delta);
        countXH.textContent = xiaohuangCount;
    } else if (user === "xiaoqi") {
        xiaoqiCount = Math.max(0, xiaoqiCount + delta);
        countXQ.textContent = xiaoqiCount;
    }
    saveData();
}
