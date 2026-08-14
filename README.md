# 系统班打卡与PK工作台 · 免费云端部署指南（Render）

本应用是一个 Node.js 后端 + 单页 HTML 的工作台，已适配 Render 免费节点部署。
部署后：任何城市、手机/电脑浏览器直接打开公网链接即可使用，数据实时共享，**本机可关机**。

---

## 一、你需要做的两步（注册免费账号，约 2 分钟）

### 1. 注册 GitHub（免费）
打开 https://github.com → Sign up → 用邮箱注册（需验证邮箱）。

### 2. 注册 Render（免费，用 GitHub 一键登录）
打开 https://render.com → Sign Up → 选「Continue with GitHub」授权登录（无需信用卡）。

---

## 二、上传代码到 GitHub（约 1 分钟）

1. GitHub 右上角 **+ → New repository**
   - 名字随便，如 `sysclass`
   - 选 **Public**
   - 点 **Create repository**
2. 在新仓库点 **Add file → Upload files**，把本目录这 5 个文件拖进去上传：
   - `server.js`
   - `system-class-checkin.html`
   - `package.json`
   - `db.json`（已含 3 个助教账号，部署后可直接登录）
   - `render.yaml`（部署配置，Render 自动读取）
3. 点 **Commit changes** 保存。

---

## 三、在 Render 一键部署（约 3 分钟）

1. Render 控制台点 **New + → Blueprints**（或 New → Web Service 选 Git 仓库）。
2. 连你的 GitHub 仓库 `sysclass`，Render 会自动读取 `render.yaml`，无需手动填配置。
3. 点 **Apply / Create** → 等待构建（看到日志出现 `系统班工作台服务器已启动` 即成功）。
4. 部署完成，Render 顶部给出公网网址，形如：
   **https://sysclass-workbench.onrender.com**
   直接打开就是工作台（根路径已指向 system-class-checkin.html）。

把这个链接发给学生/助教/教练，任何城市都能用。

---

## 四、使用须知

- **助教登录**：账号 `ta1` / `ta001`、`ta2` / `ta002`、`ta3` / `ta003`（详见 db.json）。
- **创建学员账号**：登录后在工作台里添加学员，云端网络稳定，不会再出现保存失败。
- **休眠**：Render 免费层 15 分钟无人访问会休眠，首次访问需等 30–60 秒唤醒；系统班期间频繁使用不会休眠。
- **数据持久**：运行期间数据保留（含休眠唤醒）。**重新部署会重置数据**（db.json 回到初始 3 个助教），系统班几天内不要改代码重新部署即可。
- **换固定域名/不休眠**：升级 Render 付费层，或后续改用轻量云服务器。

---

## 五、本机原有方案（备用）

本机仍可用 cloudflared 临时内网穿透（`启动服务.bat` 一键启动），但依赖本机开机联网。
云端部署成功后，优先用云端链接，本机方案作为备份。
