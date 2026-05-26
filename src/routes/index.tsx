import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import charOriginal from "@/assets/char-original.png";
import charStar from "@/assets/char-star.png";
import charIce from "@/assets/char-ice.png";
import charSweet from "@/assets/char-sweet.png";

export const Route = createFileRoute("/")({ component: Index });

const SCREENS = [
  { id: 1, name: "亲子学盒主页" },
  { id: 2, name: "AI定制皮肤生成" },
  { id: 3, name: "生成结果预览" },
  { id: 4, name: "背包属性切换" },
];

function Index() {
  const [screen, setScreen] = useState(1);
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white py-6 px-4 flex flex-col items-center gap-4 font-sans">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {SCREENS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
              screen === s.id
                ? "bg-yellow-400 text-slate-900 border-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.7)]"
                : "bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500"
            }`}
          >
            {s.id}. {s.name}
          </button>
        ))}
      </div>

      <div
        className="relative shadow-[0_20px_80px_rgba(0,0,0,0.6)] rounded-[28px] overflow-hidden"
        style={{ width: 812, height: 375 }}
      >
        {screen === 1 && <Screen1 onEnter={() => setScreen(2)} />}
        {screen === 2 && <Screen2 onGenerate={() => setScreen(3)} />}
        {screen === 3 && <Screen3 onSave={() => setScreen(4)} onBack={() => setScreen(2)} />}
        {screen === 4 && <Screen4 />}
      </div>

      <p className="text-xs text-slate-400">画布尺寸 812 × 375 · 横屏儿童手游高保真原型</p>
    </div>
  );
}

/* ---------- Shared atoms ---------- */
const dreamBg =
  "bg-[radial-gradient(ellipse_at_top,#a78bfa_0%,#7c69e0_40%,#5b46c4_75%,#3b2aa0_100%)]";

function BackBtn() {
  return (
    <div className="absolute -top-2 -left-2 z-20">
      <div className="relative w-[110px] h-[70px]">
        <div className="absolute inset-0 bg-white/95 rounded-br-[40px] shadow-md" />
        <svg className="absolute left-5 top-5 w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
  );
}

function Currency({ diamonds, cheese }: { diamonds?: number; cheese: number }) {
  return (
    <div className="flex items-center gap-2">
      {diamonds !== undefined && (
        <div className="bg-white/20 backdrop-blur border border-white/30 rounded-full pl-2 pr-3 py-1 flex items-center gap-1 text-white text-sm font-bold">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-300 to-pink-400 inline-block shadow-inner" />
          {diamonds}
        </div>
      )}
      <div className="bg-white/20 backdrop-blur border border-white/30 rounded-full pl-2 pr-3 py-1 flex items-center gap-1 text-white text-sm font-bold">
        <span className="w-5 h-5 rounded-sm bg-yellow-400 inline-block shadow" />
        {cheese}
      </div>
    </div>
  );
}

function GameBtn({
  children,
  onClick,
  variant = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "yellow" | "blue" | "pink" | "ghost";
  className?: string;
}) {
  const styles: Record<string, string> = {
    yellow:
      "bg-gradient-to-b from-yellow-300 to-orange-400 text-slate-900 border-yellow-100 shadow-[0_4px_0_#b45309,0_8px_20px_rgba(250,150,0,0.5)]",
    blue:
      "bg-gradient-to-b from-cyan-300 to-sky-500 text-white border-cyan-100 shadow-[0_4px_0_#0369a1,0_8px_20px_rgba(56,189,248,0.5)]",
    pink:
      "bg-gradient-to-b from-pink-300 to-fuchsia-500 text-white border-pink-100 shadow-[0_4px_0_#9d174d,0_8px_20px_rgba(244,114,182,0.5)]",
    ghost:
      "bg-white/15 text-white border-white/40 backdrop-blur",
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 font-extrabold tracking-wide transition active:translate-y-[2px] ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- SCREEN 1: 亲子学盒主页 ---------- */
function Screen1({ onEnter }: { onEnter: () => void }) {
  const categories = ["月令宝藏", "至臻宝藏", "普通宝藏", "亲子学盒"];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      {/* sparkles */}
      <Sparkles />
      <BackBtn />

      {/* Top right currency */}
      <div className="absolute top-3 right-4 z-10">
        <Currency diamonds={672} cheese={1781} />
      </div>

      {/* Left nav */}
      <div className="absolute left-4 top-[80px] flex flex-col gap-3 z-10">
        {categories.map((c) => {
          const active = c === "亲子学盒";
          return (
            <div
              key={c}
              className={`px-4 py-1.5 rounded-full text-sm font-extrabold ${
                active
                  ? "bg-gradient-to-r from-lime-300 to-yellow-300 text-slate-900 shadow-[0_0_14px_rgba(190,255,100,0.6)]"
                  : "text-white/90"
              }`}
            >
              {c}
            </div>
          );
        })}
      </div>

      {/* Center banner + grid */}
      <div className="absolute left-[150px] right-[210px] top-3 bottom-3 flex flex-col gap-2">
        {/* Banner */}
        <div className="relative h-[110px] rounded-2xl border-[3px] border-yellow-200 bg-gradient-to-r from-sky-300 via-pink-200 to-orange-200 overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.6),transparent_60%)]" />
          <div className="absolute left-3 top-3">
            <div className="text-[18px] font-black text-rose-600 leading-tight drop-shadow-[0_2px_0_white]">绝版皮肤</div>
            <div className="text-[20px] font-black text-rose-600 leading-tight drop-shadow-[0_2px_0_white]">奇迹归来！</div>
            <div className="mt-2 inline-flex items-center gap-1 bg-white/80 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-700">
              🔍 奖励预览
            </div>
            <div className="flex gap-1.5 mt-1.5">
              {[
                { c: "from-amber-300 to-orange-400", t: "传说套装" },
                { c: "from-fuchsia-400 to-purple-500", t: "精致皮肤" },
                { c: "from-pink-300 to-rose-400", t: "趣味表情" },
              ].map((b) => (
                <div key={b.t} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${b.c} border border-white shadow`} />
                  <div className="text-[8px] font-bold text-slate-700 mt-0.5">{b.t}</div>
                </div>
              ))}
            </div>
          </div>
          {/* hero chars */}
          <img src={charOriginal} className="absolute right-2 -bottom-2 h-[140px] object-contain" alt="" />
        </div>

        {/* Shelf with boxes */}
        <div className="flex-1 rounded-2xl bg-gradient-to-b from-cyan-300/70 to-sky-400/70 border-[3px] border-cyan-200 p-2 grid grid-cols-5 gap-1.5 relative">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="relative">
              <div className="w-full h-[70px] rounded-md bg-gradient-to-br from-yellow-300 to-sky-400 border-2 border-white shadow-md flex items-center justify-center">
                <div className="text-[11px] font-black text-white drop-shadow leading-none text-center">
                  ABC<br />英语角
                </div>
              </div>
              <div className="absolute bottom-1 right-1 text-white/80 text-lg font-black">?</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="absolute right-3 top-3 bottom-3 w-[200px] flex flex-col gap-2 z-10">
        <div className="rounded-xl bg-white/15 border border-white/30 p-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-[9px] font-black text-white">随机</div>
          <div className="flex-1">
            <div className="text-[10px] text-white">30抽必得随机</div>
            <div className="text-[10px] font-bold"><span className="bg-yellow-300 text-slate-900 rounded px-1 mr-1">传说</span>套装</div>
            <div className="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[3%] bg-yellow-300" />
            </div>
          </div>
          <div className="text-[10px] font-bold text-white">1/30</div>
        </div>

        <div className="self-end bg-white rounded-full px-3 py-0.5 text-[11px] font-bold text-slate-700 shadow">累计可抽 0 次</div>

        <GameBtn variant="yellow" className="text-base py-2.5 w-full">
          抽取 1 次 🔒
        </GameBtn>

        <div className="text-center text-[10px] text-white/90 leading-tight">
          完成【亲子约定学】每天获得<br />1次抽学盒机会
        </div>

        {/* NEW: AI Customize entry */}
        <div className="mt-auto relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300 blur opacity-80 animate-pulse" />
          <button
            onClick={onEnter}
            className="relative w-full rounded-2xl bg-gradient-to-b from-fuchsia-500 to-purple-600 border-2 border-white/80 px-3 py-2 text-left shadow-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-lg">✨</div>
              <div className="flex-1">
                <div className="text-white font-black text-[14px] leading-tight">AI 定制皮肤</div>
                <div className="text-yellow-200 text-[9px] font-bold">NEW · 专属限定玩法</div>
              </div>
            </div>
            <div className="text-[9px] text-white/90 mt-1.5 leading-tight">
              VIP用户每完成 7 次亲子约定学<br />可解锁 1 次定制机会
            </div>
            <div className="mt-1.5 flex justify-end">
              <span className="text-[9px] bg-white/25 text-white rounded-full px-2 py-0.5 border border-white/40">查看示例 ›</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- SCREEN 2: AI Generate ---------- */
const SKIN_LIST = [
  { name: "梦幻公主", rarity: "传说", color: "from-pink-300 to-fuchsia-400", img: charOriginal },
  { name: "星梦礼裙", rarity: "史诗", color: "from-purple-300 to-indigo-400", img: charStar },
  { name: "冰雪魔法", rarity: "稀有", color: "from-cyan-200 to-sky-400", img: charIce },
  { name: "甜心娃娃", rarity: "稀有", color: "from-pink-200 to-rose-300", img: charSweet },
];

const PRESETS = [
  { t: "梦幻公主", c: "from-pink-400 to-fuchsia-500" },
  { t: "星光偶像", c: "from-amber-300 to-pink-400" },
  { t: "森林精灵", c: "from-lime-300 to-emerald-500" },
  { t: "冰雪魔法", c: "from-cyan-300 to-sky-500" },
  { t: "中国风仙女", c: "from-rose-300 to-red-500" },
  { t: "酷酷机甲", c: "from-slate-300 to-indigo-500" },
];

function Screen2({ onGenerate }: { onGenerate: () => void }) {
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState("");
  const skin = SKIN_LIST[selected];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-amber-300 to-orange-400 rounded-full px-5 py-1.5 border-2 border-white shadow-lg">
          <span className="text-white font-black text-sm drop-shadow">✨ AI 定制皮肤 ✨</span>
        </div>
      </div>
      <div className="absolute top-3 right-4 z-10"><Currency cheese={1781} /></div>

      {/* LEFT skin list */}
      <div className="absolute left-3 top-[60px] bottom-3 w-[160px] bg-white/12 backdrop-blur border border-white/25 rounded-2xl p-2 flex flex-col gap-1.5 z-10">
        <div className="text-white text-[11px] font-black px-1">选择要定制的皮肤</div>
        <div className="flex gap-1 px-1">
          {["全部", "传说", "史诗"].map((t, i) => (
            <span key={t} className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${i===0?"bg-yellow-300 text-slate-900":"bg-white/20 text-white"}`}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-1 overflow-y-auto pr-0.5">
          {SKIN_LIST.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setSelected(i)}
              className={`relative rounded-xl p-1 border-2 transition ${
                selected === i
                  ? "border-yellow-300 bg-white/30 shadow-[0_0_12px_rgba(253,224,71,0.8)]"
                  : "border-white/30 bg-white/10"
              }`}
            >
              <div className={`h-[52px] rounded-lg bg-gradient-to-br ${s.color} flex items-end justify-center overflow-hidden`}>
                <img src={s.img} className="h-[60px] object-contain" alt="" />
              </div>
              <div className="text-white text-[10px] font-bold mt-0.5 leading-tight">{s.name}</div>
              <div className={`absolute top-0.5 left-0.5 text-[8px] font-black px-1 rounded ${
                s.rarity==="传说"?"bg-amber-400 text-amber-900":
                s.rarity==="史诗"?"bg-fuchsia-400 text-white":"bg-cyan-300 text-cyan-900"
              }`}>{s.rarity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CENTER stage */}
      <div className="absolute left-[175px] right-[265px] top-[60px] bottom-3 z-0">
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-indigo-400/40 to-purple-700/60 border border-white/20 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.25),transparent_70%)]" />
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <img src={skin.img} className="h-[290px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" alt="" />
          </div>
          <div className="absolute bottom-1 left-0 right-0 text-center text-white/80 text-[10px]">
            模型与动作不变，仅定制服装贴图风格
          </div>
          <div className="absolute top-2 left-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
            当前选中：{skin.name}
          </div>
        </div>
      </div>

      {/* RIGHT input + generate */}
      <div className="absolute right-3 top-[60px] bottom-3 w-[252px] flex flex-col gap-1.5 z-10">
        <div className="text-white text-[11px] font-black">描述你想要的皮肤风格</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="想要星空公主风 / 粉色甜美蝴蝶结 / 像冰雪女王一样梦幻"
          className="w-full h-[52px] rounded-xl bg-white/95 text-slate-800 text-[11px] p-2 resize-none placeholder:text-slate-400 border-2 border-white shadow-inner"
        />

        <div className="flex gap-1.5">
          <div className="flex-1 rounded-xl border-2 border-dashed border-white/60 bg-white/10 p-1.5 flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-lg">＋</div>
            <div className="flex-1">
              <div className="text-white text-[10px] font-bold">上传参考图片（可选）</div>
              <div className="text-white/70 text-[8px]">服装·配色·风格图</div>
            </div>
          </div>
        </div>

        <div className="text-white text-[10px] font-black mt-0.5">预置灵感</div>
        <div className="grid grid-cols-3 gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.t}
              onClick={() => setText(p.t + "风格")}
              className={`rounded-full bg-gradient-to-r ${p.c} text-white text-[10px] font-bold py-1 border border-white/60 shadow`}
            >
              {p.t}
            </button>
          ))}
        </div>

        <div className="rounded-lg bg-white/10 border border-white/25 px-2 py-1 text-[9px] text-white/90 leading-tight">
          · 本次消耗 <b className="text-yellow-300">1 次</b>定制机会<br />
          · 系统生成 <b className="text-yellow-300">3 款</b>候选 · 可选 1 款保存到背包
        </div>

        <div className="flex gap-1.5 mt-auto">
          <GameBtn variant="ghost" className="px-3 py-2 text-xs">查看示例</GameBtn>
          <GameBtn variant="yellow" onClick={onGenerate} className="flex-1 py-2 text-sm">
            ✨ 开始生成
          </GameBtn>
        </div>
      </div>
    </div>
  );
}

/* ---------- SCREEN 3: Result preview ---------- */
const RESULTS = [
  { name: "星梦公主款", tag: "推荐", desc: "甜美梦幻，适合喜欢粉紫色和蝴蝶结元素的小朋友。", img: charOriginal, color: "from-pink-300 to-fuchsia-500" },
  { name: "星河礼裙款", tag: "更梦幻", desc: "深空星河纹样，闪耀点缀，神秘又灵动的偶像舞台风。", img: charStar, color: "from-indigo-400 to-purple-600" },
  { name: "冰晶舞台款", tag: "更华丽", desc: "冰雪魔法贴图，水晶质感裙摆，宛如冬日女王。", img: charIce, color: "from-cyan-300 to-sky-500" },
];

function Screen3({ onSave, onBack }: { onSave: () => void; onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [compare, setCompare] = useState<"orig"|"new">("new");
  const r = RESULTS[idx];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-full px-5 py-1.5 border-2 border-white shadow-lg">
          <span className="text-white font-black text-sm drop-shadow">🎁 生成结果 · 3 款候选</span>
        </div>
      </div>
      <div className="absolute top-3 right-4 z-10"><Currency cheese={1781} /></div>

      {/* LEFT result cards */}
      <div className="absolute left-3 top-[60px] bottom-3 w-[150px] flex flex-col gap-2 z-10">
        {RESULTS.map((res, i) => (
          <button
            key={res.name}
            onClick={() => setIdx(i)}
            className={`relative flex-1 rounded-xl border-2 p-1.5 text-left transition ${
              idx === i
                ? "border-yellow-300 bg-white/30 shadow-[0_0_14px_rgba(253,224,71,0.8)]"
                : "border-white/30 bg-white/10"
            }`}
          >
            <div className={`absolute -top-1 -right-1 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r ${res.color} text-white border border-white shadow`}>
              {res.tag}
            </div>
            <div className="flex gap-1.5 items-center h-full">
              <div className={`w-12 h-full rounded-lg bg-gradient-to-br ${res.color} overflow-hidden flex items-end justify-center`}>
                <img src={res.img} className="h-[70px] object-contain" alt="" />
              </div>
              <div className="flex-1">
                <div className="text-white text-[11px] font-black leading-tight">{res.name}</div>
                <div className="text-yellow-200 text-[9px] font-bold mt-0.5">方案 0{i + 1}</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({length: 5}).map((_, k) => (
                    <span key={k} className="text-[8px] text-yellow-300">★</span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CENTER stage */}
      <div className="absolute left-[165px] right-[225px] top-[60px] bottom-3 z-0">
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-fuchsia-400/30 to-purple-800/60 border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.15),transparent_30%,rgba(255,255,255,0.15)_60%,transparent)]" />
          <div className="absolute inset-x-0 bottom-2 flex items-end justify-center">
            <img src={compare === "new" ? r.img : charOriginal} className="h-[260px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" alt="" />
          </div>
          {/* compare toggle */}
          <div className="absolute top-2 left-2 bg-black/30 rounded-full p-0.5 flex text-[10px] font-bold border border-white/30">
            <button onClick={() => setCompare("orig")} className={`px-2 py-1 rounded-full ${compare==="orig"?"bg-white text-slate-900":"text-white"}`}>原皮肤</button>
            <button onClick={() => setCompare("new")} className={`px-2 py-1 rounded-full ${compare==="new"?"bg-yellow-300 text-slate-900":"text-white"}`}>定制后</button>
          </div>
          <button onClick={() => setIdx((idx + 2) % 3)} className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/30 border border-white/50 text-white font-black">‹</button>
          <button onClick={() => setIdx((idx + 1) % 3)} className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/30 border border-white/50 text-white font-black">›</button>
          <div className="absolute bottom-1 left-0 right-0 text-center text-white/80 text-[10px]">
            预览：{r.name} · 试穿效果
          </div>
        </div>
      </div>

      {/* RIGHT info & actions */}
      <div className="absolute right-3 top-[60px] bottom-3 w-[212px] flex flex-col gap-1.5 z-10">
        <div className="rounded-xl bg-white/15 border border-white/30 p-2">
          <div className="flex items-center justify-between">
            <div className="text-white font-black text-sm">{r.name}</div>
            <span className="text-[9px] bg-yellow-300 text-slate-900 font-black px-1.5 py-0.5 rounded">{r.tag}</span>
          </div>
          <div className="text-white/85 text-[10px] mt-1 leading-snug">{r.desc}</div>
          <div className="mt-1.5 flex gap-1">
            {["梦幻", "甜美", "粉紫"].map(t => (
              <span key={t} className="text-[9px] bg-white/20 text-white rounded-full px-1.5 py-0.5 border border-white/30">#{t}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5">
          <GameBtn variant="ghost" className="flex-1 py-1.5 text-[11px]" onClick={() => setIdx((idx + 2) % 3)}>‹ 上一款</GameBtn>
          <GameBtn variant="ghost" className="flex-1 py-1.5 text-[11px]" onClick={() => setIdx((idx + 1) % 3)}>下一款 ›</GameBtn>
        </div>

        <GameBtn variant="yellow" onClick={onSave} className="py-2.5 text-sm">
          💾 保存到背包
        </GameBtn>
        <GameBtn variant="ghost" onClick={onBack} className="py-1.5 text-[11px]">
          ↻ 返回重新生成
        </GameBtn>

        <div className="text-center text-white/80 text-[9px] mt-auto leading-tight">
          本次共生成 3 款方案<br />可选择 1 款保存
        </div>
      </div>
    </div>
  );
}

/* ---------- SCREEN 4: Backpack ---------- */
const VARIANTS = [
  { t: "原版", img: charOriginal },
  { t: "甜美款", img: charSweet },
  { t: "星光款", img: charStar },
  { t: "冰雪款", img: charIce },
];

function Screen4() {
  const [variant, setVariant] = useState(0);
  const [equipped, setEquipped] = useState(0);
  const items = [
    { t: "小白龙头部", n: 1, custom: false, c: "from-cyan-200 to-pink-200" },
    { t: "花花王子", n: 1, custom: false, c: "from-amber-200 to-rose-200" },
    { t: "非主流发型", n: 1, custom: true, c: "from-cyan-300 to-sky-300" },
    { t: "星梦公主", n: 1, custom: true, c: "from-fuchsia-300 to-purple-400" },
    { t: "阳光大男孩", n: 1, custom: false, c: "from-sky-200 to-indigo-200" },
    { t: "男偏分", n: 1, custom: false, c: "from-slate-200 to-slate-300" },
    { t: "马尾", n: 1, custom: false, c: "from-pink-200 to-rose-200" },
    { t: "纹理", n: 1, custom: false, c: "from-violet-200 to-fuchsia-200" },
    { t: "短发齐刘海", n: 1, custom: true, c: "from-emerald-200 to-cyan-200" },
  ];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />

      {/* top center */}
      <div className="absolute top-3 left-[180px] flex items-center gap-2 z-10">
        <div className="bg-gradient-to-r from-orange-400 to-rose-500 rounded-full px-3 py-1 border-2 border-white shadow flex items-center gap-1">
          <span className="text-[11px] text-white font-bold">🔥 历史总潮流度</span>
          <span className="bg-white rounded-full px-2 text-rose-600 font-black text-[12px]">400</span>
        </div>
        <GameBtn variant="yellow" className="px-3 py-1 text-xs">抽学盒取</GameBtn>
      </div>
      <div className="absolute top-3 right-[60px] z-10"><Currency cheese={1781} /></div>

      {/* Left tabs */}
      <div className="absolute left-3 top-[80px] flex flex-col gap-3 z-10">
        <div className="px-4 py-1.5 rounded-full font-extrabold text-sm bg-gradient-to-r from-lime-300 to-yellow-300 text-slate-900 shadow-[0_0_14px_rgba(190,255,100,0.6)]">装扮</div>
        <div className="px-4 py-1.5 text-white/90 font-extrabold text-sm">互动</div>
      </div>

      {/* Center character stage */}
      <div className="absolute left-[90px] right-[330px] top-[60px] bottom-3 z-0">
        <div className="relative w-full h-full flex items-end justify-center">
          <img src={VARIANTS[variant].img} className="h-[280px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]" alt="" />
          {/* sparkles around */}
          <div className="absolute top-6 left-6 text-white/70 text-xl">✦</div>
          <div className="absolute top-12 right-10 text-pink-200 text-lg">✧</div>
          <div className="absolute bottom-16 left-10 text-yellow-200">★</div>
        </div>

        {/* Property switcher */}
        <div className="absolute -bottom-1 left-1 right-1">
          <div className="rounded-2xl bg-white/15 backdrop-blur border border-white/30 px-2 py-1.5 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="text-white text-[10px] font-black flex items-center gap-1">
                <span className="bg-fuchsia-400 text-white text-[8px] px-1 rounded">NEW</span>
                皮肤属性（同一皮肤多版本切换）
              </div>
              <span className="text-white/70 text-[9px]">星梦公主 · {VARIANTS[variant].t}</span>
            </div>
            <div className="flex gap-1.5">
              {VARIANTS.map((v, i) => (
                <button
                  key={v.t}
                  onClick={() => setVariant(i)}
                  className={`flex-1 rounded-full px-2 py-1 text-[10px] font-bold border-2 transition ${
                    variant === i
                      ? "bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 border-white shadow-[0_0_12px_rgba(253,224,71,0.7)]"
                      : "bg-white/15 text-white border-white/30"
                  }`}
                >
                  {i >= 1 && <span className="text-fuchsia-500 mr-0.5">✦</span>}
                  {v.t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom-left action buttons */}
      <div className="absolute left-3 bottom-3 flex flex-col items-center gap-1 z-10">
        <div className="flex gap-1">
          <GameBtn variant="pink" className="px-2 py-1 text-[10px]">穿戴</GameBtn>
          <GameBtn variant="ghost" className="px-2 py-1 text-[10px]">取消</GameBtn>
        </div>
        <GameBtn variant="ghost" className="px-2 py-1 text-[10px]">📷 分享造型</GameBtn>
      </div>

      {/* Right: items grid */}
      <div className="absolute right-[44px] top-[60px] bottom-3 w-[280px] flex flex-col gap-1.5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white text-[11px] font-bold">
            <span>👒</span> 头部
          </div>
          <div className="bg-white/90 text-slate-700 text-[10px] rounded-full px-2 py-0.5 font-bold">全部 ▾</div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-1.5 overflow-hidden">
          {items.map((it, i) => (
            <button
              key={it.t}
              onClick={() => setEquipped(i)}
              className={`relative rounded-xl p-1 border-2 ${
                equipped === i ? "border-yellow-300 bg-white/30 shadow-[0_0_10px_rgba(253,224,71,0.7)]" : "border-white/30 bg-white/15"
              }`}
            >
              <div className={`h-[48px] rounded-lg bg-gradient-to-br ${it.c} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center text-[18px]">👧</div>
                {it.custom && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-[7px] font-black px-1 py-0.5 rounded-br-md">
                    ✦定制
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-white/90 text-slate-700 text-[8px] font-bold rounded-tl px-1">{it.n}</div>
              </div>
              <div className="text-white text-[9px] font-bold mt-0.5 leading-tight truncate">{it.t}</div>
            </button>
          ))}
        </div>
        <div className="text-center text-white/70 text-[9px]">— 没有更多数据了 —</div>
      </div>

      {/* Far right category icons */}
      <div className="absolute right-1 top-[60px] bottom-3 w-[40px] flex flex-col gap-1.5 items-center z-10">
        {["👤","👒","👕","👖","👓","🎀","✨"].map((e, i) => (
          <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${i===1?"bg-slate-900/40 border border-white":"bg-white/10"}`}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- sparkles bg ---------- */
function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[
        { l: "10%", t: "20%" },
        { l: "30%", t: "70%" },
        { l: "60%", t: "15%" },
        { l: "80%", t: "55%" },
        { l: "45%", t: "40%" },
        { l: "90%", t: "80%" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute text-white/30 text-xs"
          style={{ left: p.l, top: p.t }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}
