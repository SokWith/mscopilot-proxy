import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7860;

app.use(bodyParser.json());

const isipok = async (ip) => {
    const ret = await fetch("https://copilot.microsoft.com/", {
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
            "X-forwarded-for": ip
        }
    });
    if (!ret.ok) {
        return { ip, status: false };
    }
    const txt = await ret.text();
    if (txt.indexOf("studiostaticassetsprod.azureedge.net/bundle-cmc/assets/bundle.js") >= 0) {
        return { ip, status: false, reason: "nononononon" };
    }
    if (txt.indexOf('<div class="title" role="heading" aria-level="1">登录以体验 Microsoft Copilot</div>') >= 0) {
        return { ip, status: false, reason: "ddddddddddd" };
    }

    const rt = /Region:"(.*?)"/.exec(txt);
    if (!rt) {
        return { ip, status: false };
    }
    const rg = rt[1];
    if (!rg) {
        return { ip, status: false };
    }
    console.log(`[${ip}, ${rg}]`);
    return { ip, status: true, region: rg };
}

const testAll = async (startIP, endIP, res) => {
    const [startI, startI0, startI1, startI2] = startIP.split('.').map(Number);
    const [endI, endI0, endI1, endI2] = endIP.split('.').map(Number);

    let i = startI, i0 = startI0, i1 = startI1, i2 = startI2;

    const testNext = async () => {
        i2++;
        if (i2 > 255) {
            i2 = 0;
            i1++;
        }
        if (i1 > 255) {
            i1 = 0;
            i0++;
        }
        if (i0 > 255) {
            i0 = 0;
            i++;
        }
        if (i > endI || (i === endI && i0 > endI0) || (i === endI && i0 === endI0 && i1 > endI1) || (i === endI && i0 === endI0 && i1 === endI1 && i2 > endI2)) {
            return false;
        }
        const XForwardedForIP = `${i}.${i0}.${i1}.${i2}`;
        try {
            const result = await isipok(XForwardedForIP);
            if (result.status) {
                res.write(JSON.stringify([result.ip, result.region]) + ",\n");
            }
        } catch (error) {
            console.error(error);
        }
        return true;
    }

    let count = 0;
    let stop = false;
    res.write("[\n"); // Start of the array
    while (true) {
        while (count >= 16) {
            await new Promise((t) => { setTimeout(t, 100) });
        }
        count++;
        testNext().then((rt) => {
            count--;
            if (!rt) {
                stop = true;
            }
        });
        if (stop) {
            break;
        }
    }
    res.write("];\n"); // End of the array
    res.end();
}

app.post("/test", async (req, res) => {
    const { startIP, endIP } = req.body;
    res.setHeader('Content-Type', 'text/plain');
    await testAll(startIP, endIP, res);
});

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>IP Range Checker</title>
        </head>
        <body>
            <h1>IP Range Checker</h1>
            <form id="ipForm">
                <label for="startIP">开始地址:</label>
                <input type="text" id="startIP" name="startIP" required>
                <br>
                <label for="endIP">结束地址:</label>
                <input type="text" id="endIP" name="endIP" required>
                <br>
                <button type="submit">检查</button>
            </form>
            <h2>结果:</h2>
            <textarea id="results" rows="10" cols="50"></textarea>
            <br>
            <button id="copyButton">复制</button>
            <script>
                document.getElementById('ipForm').addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const startIP = document.getElementById('startIP').value;
                    const endIP = document.getElementById('endIP').value;
                    const response = await fetch('/test', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ startIP, endIP })
                    });
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let results = '';
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        results += decoder.decode(value);
                        document.getElementById('results').value = results;
                    }
                });
                document.getElementById('copyButton').addEventListener('click', () => {
                    const results = document.getElementById('results');
                    results.select();
                    document.execCommand('copy');
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
