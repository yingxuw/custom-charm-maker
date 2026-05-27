import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import charOriginal from "@/assets/char-original.png";
import charStar from "@/assets/char-star.png";
import charIce from "@/assets/char-ice.png";
import charSweet from "@/assets/char-sweet.png";

export const Route = createFileRoute("/")({ component: Index });

const SCREENS = [
  { id: 1, name: "亲子学盒主页" },
  { id: 2, name: "AI定制皮肤生成" },
  { id: 3, name: "审核失败 Toast" },
  { id: 4, name: "生成中" },
  { id: 5, name: "退出确认弹层" },
  { id: 6, name: "结果预览" },
  { id: 7, name: "背包·套装" },
];

function Index() {
  const [screen, setScreen] = useState(1);
  const [isVip, setIsVip] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [hasPending, setHasPending] = useState(false);

  const handleEnterFromHome = () => {
    setHasPending(false);
    if (!isVip) {
      setShowDemo(true);
    } else {
      setScreen(2);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white py-6 px-4 flex flex-col items-center gap-4 font-sans">
      <div className="flex items-center gap-2 flex-wrap justify-center max-w-[900px]">
        {SCREENS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition ${
              screen === s.id
                ? "bg-yellow-400 text-slate-900 border-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.7)]"
                : "bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-500"
            }`}
          >
            {s.id}. {s.name}
          </button>
        ))}
        <button
          onClick={() => setIsVip((v) => !v)}
          className={`px-3 py-1.5 rounded-full text-xs font-black border-2 ${
            isVip
              ? "bg-yellow-300 text-slate-900 border-yellow-100"
              : "bg-slate-800 text-slate-300 border-slate-600"
          }`}
          title="演示用：切换VIP身份（影响主页入口与生成行为）"
        >
          {isVip ? "👑 VIP身份" : "非VIP身份"}
        </button>
        <button
          onClick={() => setShowDemo(true)}
          className="px-3 py-1.5 rounded-full text-xs font-bold border-2 bg-fuchsia-600/40 text-white border-fuchsia-300/60"
        >
          预览：动效演示弹窗
        </button>
      </div>

      <div
        className="relative shadow-[0_20px_80px_rgba(0,0,0,0.6)] rounded-[28px] overflow-hidden"
        style={{ width: 812, height: 375 }}
      >
        {screen === 1 && <Screen1 onEnter={handleEnterFromHome} hasPending={hasPending} />}
        {screen === 2 && (
          <Screen2
            isVip={isVip}
            setIsVip={setIsVip}
            onOpenDemo={() => setShowDemo(true)}
            onGenerateOk={() => setScreen(4)}
            onGenerateFail={() => setScreen(3)}
          />
        )}
        {screen === 3 && <Screen2 toast isVip={isVip} setIsVip={setIsVip} onOpenDemo={() => setShowDemo(true)} onGenerateOk={() => setScreen(4)} onGenerateFail={() => setScreen(3)} />}
        {screen === 4 && <Screen4Generating onDone={() => setScreen(6)} onBack={() => setScreen(5)} />}
        {screen === 5 && <Screen4Generating modal onDone={() => setScreen(6)} onBack={() => setScreen(5)} onLeave={() => { setHasPending(true); setScreen(1); }} onStay={() => setScreen(4)} />}
        {screen === 6 && <Screen6 onSave={() => setScreen(7)} />}
        {screen === 7 && <Screen7 onCustomize={() => setScreen(2)} />}

        {showDemo && (
          <DemoModal
            onClose={() => setShowDemo(false)}
            onTry={() => { setShowDemo(false); setScreen(2); }}
            onUpgrade={() => { setIsVip(true); setShowDemo(false); setScreen(2); }}
          />
        )}
      </div>

      <p className="text-xs text-slate-400">画布尺寸 812 × 375 · 横屏儿童手游高保真原型</p>
    </div>
  );
}

/* ---------- Demo Modal (动效演示) ---------- */
function DemoModal({
  onClose,
  onTry,
  onUpgrade,
}: {
  onClose: () => void;
  onTry: () => void;
  onUpgrade: () => void;
}) {
  const STEPS = [
    { t: "普通皮肤", d: "选择已拥有的角色", img: charOriginal, c: "from-slate-300 to-slate-500", icon: "👤" },
    { t: "输入想法", d: "一句话描述风格", img: null, c: "from-sky-300 to-indigo-500", icon: "💭" },
    { t: "魔法生成", d: "AI 施展皮肤魔法", img: null, c: "from-fuchsia-400 to-purple-600", icon: "✨" },
    { t: "3款候选", d: "挑选最喜欢的一款", img: charStar, c: "from-amber-300 to-pink-500", icon: "🎁" },
    { t: "保存装扮", d: "立即换上专属皮肤", img: charIce, c: "from-cyan-300 to-emerald-500", icon: "👑" },
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1400);
    return () => clearInterval(id);
  }, []);
  const cur = STEPS[step];

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-[600px] rounded-3xl bg-gradient-to-b from-fuchsia-100 via-white to-amber-50 border-[3px] border-yellow-200 p-3 shadow-2xl">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-b from-fuchsia-500 to-purple-600 text-white font-black text-[12px] px-4 py-1 rounded-full border-2 border-white shadow-lg whitespace-nowrap">
          ✨ 一句话，把普通皮肤变成专属酷炫皮肤 ✨
        </div>
        <button onClick={onClose} className="absolute top-1.5 right-3 text-slate-400 text-lg font-bold">×</button>

        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {STEPS.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div key={s.t} className="flex flex-col items-center">
                <div
                  className={`relative w-full h-[78px] rounded-xl border-2 bg-gradient-to-br ${s.c} flex items-end justify-center overflow-hidden transition-all ${
                    active
                      ? "border-yellow-300 shadow-[0_0_18px_rgba(253,224,71,0.9)] scale-[1.06]"
                      : done
                      ? "border-fuchsia-300 opacity-90"
                      : "border-white/70 opacity-70"
                  }`}
                >
                  {s.img ? (
                    <img src={s.img} className="h-[90px] object-contain" alt="" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-3xl drop-shadow">{s.icon}</div>
                  )}
                  <span className="absolute top-0.5 left-0.5 bg-white/85 text-slate-700 text-[8px] font-black px-1 rounded">
                    {i + 1}
                  </span>
                  {active && (
                    <span className="absolute -top-1 -right-1 text-yellow-300 text-base animate-ping">✦</span>
                  )}
                </div>
                <div className={`text-[10px] font-black mt-0.5 ${active ? "text-fuchsia-600" : "text-slate-700"}`}>
                  {s.t}
                </div>
                <div className="text-[8px] text-slate-500 leading-tight text-center">{s.d}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 rounded-xl bg-gradient-to-r from-fuchsia-100 via-pink-100 to-amber-100 border border-fuchsia-200 px-3 py-1.5 text-center text-[11px] font-bold text-fuchsia-700">
          当前：<span className="text-slate-800">{cur.t}</span> · {cur.d}
        </div>

        <div className="flex gap-2 mt-2">
          <GameBtn
            variant="ghost"
            onClick={onTry}
            className="px-3 py-1.5 text-[12px] !text-slate-700 !bg-slate-100 !border-slate-300"
          >
            先看看玩法
          </GameBtn>
          <GameBtn variant="yellow" onClick={onUpgrade} className="flex-1 py-1.5 text-[13px]">
            👑 开通VIP
          </GameBtn>
        </div>
        <div className="text-center text-[9px] text-slate-400 mt-1">开通后立即解锁定制机会 · 可在背包自由切换</div>
      </div>
    </div>
  );
}

/* ---------- Shared atoms ---------- */
const dreamBg =
  "bg-[radial-gradient(ellipse_at_top,#a78bfa_0%,#7c69e0_40%,#5b46c4_75%,#3b2aa0_100%)]";

function BackBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="absolute -top-2 -left-2 z-30">
      <div className="relative w-[110px] h-[70px]">
        <div className="absolute inset-0 bg-white/95 rounded-br-[40px] shadow-md" />
        <svg className="absolute left-5 top-5 w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
    </button>
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
function Screen1({ onEnter, hasPending }: { onEnter: () => void; hasPending?: boolean }) {
  const categories = ["月令宝藏", "至臻宝藏", "普通宝藏", "亲子学盒"];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />

      <div className="absolute top-3 right-4 z-10">
        <Currency diamonds={672} cheese={1781} />
      </div>

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

      <div className="absolute left-[150px] right-[210px] top-3 bottom-3 flex flex-col gap-2">
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
          <img src={charOriginal} className="absolute right-2 -bottom-2 h-[140px] object-contain" alt="" />
        </div>

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

        {/* AI Customize entry — cleaner */}
        <div className="mt-auto relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300 blur opacity-80 animate-pulse" />
          <button
            onClick={onEnter}
            className="relative w-full rounded-2xl bg-gradient-to-b from-fuchsia-500 to-purple-600 border-2 border-white/80 px-3 py-2.5 text-left shadow-xl"
          >
            {hasPending && (
              <span className="absolute -top-1 -right-1 z-10 flex items-center justify-center">
                <span className="absolute w-3 h-3 bg-rose-500 rounded-full animate-ping opacity-75" />
                <span className="relative w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />
              </span>
            )}
            <div className="text-white font-black text-[15px] leading-tight">AI 定制皮肤</div>
            <div className="text-[10px] text-white/95 mt-1.5 leading-tight">
              {hasPending ? "上次生成仍在进行中，点击查看" : "完成 7 次亲子约定学可解锁 1 次机会"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- SCREEN 2: AI Generate ---------- */
const SKIN_LIST = [
  { name: "梦幻公主", color: "from-pink-300 to-fuchsia-400", img: charOriginal },
  { name: "星梦礼裙", color: "from-purple-300 to-indigo-400", img: charStar },
  { name: "冰雪魔法", color: "from-cyan-200 to-sky-400", img: charIce },
  { name: "甜心娃娃", color: "from-pink-200 to-rose-300", img: charSweet },
];

const STYLE_PRESETS = [
  { t: "梦幻精灵", c: "from-fuchsia-400 to-purple-500", text: "我想要像梦幻小精灵一样闪闪发光", img: charOriginal },
  { t: "冰雪魔法", c: "from-cyan-300 to-sky-500", text: "我想要冰雪公主一样会发光的裙子", img: charIce },
  { t: "宇宙探险", c: "from-indigo-400 to-violet-600", text: "我想要像小宇航员一样去太空冒险", img: charStar },
  { t: "闪电机甲", c: "from-slate-300 to-blue-600", text: "我想要像闪电机甲一样酷酷的感觉", img: charStar },
  { t: "森林守护者", c: "from-lime-300 to-emerald-500", text: "我想要像森林小守护者一样有树叶披风", img: charSweet },
  { t: "火焰英雄", c: "from-amber-400 to-rose-500", text: "我想要像火焰小英雄一样身上有火花", img: charSweet },
  { t: "中国风小侠", c: "from-rose-300 to-red-500", text: "我想要像中国风小侠一样威风", img: charOriginal },
  { t: "星光偶像", c: "from-amber-300 to-pink-400", text: "我想要像星光小偶像一样闪闪亮亮", img: charStar },
];



function Screen2({
  onGenerateOk,
  onGenerateFail,
  toast,
  isVip,
  setIsVip,
  onOpenDemo,
}: {
  onGenerateOk: () => void;
  onGenerateFail: () => void;
  toast?: boolean;
  isVip: boolean;
  setIsVip: (v: boolean) => void;
  onOpenDemo: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState("");
  const [tab, setTab] = useState(0);
  const [styleIdx, setStyleIdx] = useState<number | null>(null);
  const [showVip, setShowVip] = useState(false);

  const skin = SKIN_LIST[selected];
  const previewImg = styleIdx !== null ? STYLE_PRESETS[styleIdx].img : skin.img;
  const previewLabel = styleIdx !== null ? `${skin.name} · ${STYLE_PRESETS[styleIdx].t}` : skin.name;

  function pickStyle(i: number) {
    setStyleIdx(i);
    setText(STYLE_PRESETS[i].text);
  }
  function handleGenerate() {
    if (!isVip) { setShowVip(true); return; }
    onGenerateOk();
  }

  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-amber-300 to-orange-400 rounded-full px-5 py-1.5 border-2 border-white shadow-lg">
          <span className="text-white font-black text-sm drop-shadow">✨ AI 定制皮肤 ✨</span>
        </div>
      </div>
      <div className="absolute top-2.5 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsVip(!isVip)}
          className={`text-[9px] font-black px-2 py-0.5 rounded-full border-2 ${
            isVip ? "bg-yellow-300 text-slate-900 border-yellow-100" : "bg-white/20 text-white border-white/40"
          }`}
          title="演示用：切换VIP身份"
        >
          {isVip ? "VIP ✓" : "非VIP"}
        </button>
        <Currency cheese={1781} />
      </div>

      {/* LEFT skin list */}
      <div className="absolute left-3 top-[52px] bottom-3 w-[150px] bg-white/12 backdrop-blur border border-white/25 rounded-2xl p-2 flex flex-col gap-1.5 z-10">
        <div className="text-white text-[11px] font-black px-1">选择要定制的皮肤</div>
        <div className="flex gap-1 px-1 flex-wrap">
          {["全部", "传说", "神话", "至臻"].map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                tab === i ? "bg-yellow-300 text-slate-900" : "bg-white/20 text-white"
              }`}
            >
              {t}
            </button>
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
              <div className="text-white text-[9px] font-bold mt-0.5 leading-tight">{s.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CENTER stage */}
      <div className="absolute left-[165px] right-[275px] top-[52px] bottom-3 z-0">
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-indigo-400/40 to-purple-700/60 border border-white/20 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.25),transparent_70%)]" />
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <img src={previewImg} className="h-[260px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" alt="" />
          </div>
          <div className="absolute top-2 left-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
            预览：{previewLabel}
          </div>
          {/* 玩法演示入口（用户主动点击） */}
          <button
            onClick={onOpenDemo}
            className="absolute top-2 right-2 bg-white/90 text-fuchsia-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-fuchsia-300 shadow hover:scale-105 transition"
          >
            🎬 玩法演示
          </button>
          <div className="absolute bottom-1 left-0 right-0 text-center text-white/80 text-[10px]">
            模型与动作不变，仅定制服装贴图风格
          </div>
        </div>

        {toast && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 animate-pulse">
            <div className="bg-gradient-to-b from-rose-500 to-pink-600 border-2 border-white rounded-2xl px-4 py-2 shadow-[0_0_20px_rgba(244,63,94,0.7)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">!</span>
              <div className="text-white font-black text-[12px] drop-shadow">内容审核不通过</div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT input + presets + generate */}
      <div className="absolute right-3 top-[52px] bottom-3 w-[262px] flex flex-col gap-1.5 z-10">
        <div className="text-white text-[11px] font-black px-0.5">描述你想要的皮肤风格</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="比如：我想要像冰雪公主一样会发光的裙子"
          className="w-full h-[56px] rounded-xl bg-white/95 text-slate-800 text-[11px] p-2 resize-none placeholder:text-slate-400 border-2 border-white shadow-inner"
        />

        <div className="text-white text-[11px] font-black mt-0.5 px-0.5 flex items-center gap-1">
          想要哪种风格 <span className="text-white/60 font-normal text-[8px]">（点击即填入想法）</span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {STYLE_PRESETS.map((p, i) => {
            const active = styleIdx === i;
            return (
              <button
                key={p.t}
                onClick={() => pickStyle(i)}
                className={`rounded-full bg-gradient-to-r ${p.c} text-white text-[9px] font-bold py-1 border shadow transition ${
                  active ? "border-yellow-300 ring-2 ring-yellow-200 scale-[1.04]" : "border-white/60"
                }`}
              >
                {p.t}
              </button>
            );
          })}
        </div>

        <div className="text-[9px] text-white/70 text-center mt-0.5 leading-tight">
          最终效果以生成结果为准，每次生成 3 款候选
        </div>

        <div className="mt-auto flex items-center justify-between px-1 pt-1">
          <span className="text-white/90 text-[10px] font-bold">剩余次数：<b className="text-yellow-300">{isVip ? 1 : 0}</b></span>
          <span className="text-white/60 text-[9px]">{isVip ? "审核不通过不扣次数" : "VIP 限定功能"}</span>
        </div>
        <div className="flex gap-1.5">
          <GameBtn variant="ghost" onClick={onGenerateFail} className="px-2 py-1.5 text-[10px]">模拟审核失败</GameBtn>
          <GameBtn variant="yellow" onClick={handleGenerate} className="flex-1 py-1.5 text-sm">
            ✨ 开始生成
          </GameBtn>
        </div>
      </div>

      {/* VIP引导弹窗（静态） */}
      {showVip && (
        <div className="absolute inset-0 z-30 bg-black/55 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-[440px] rounded-3xl bg-gradient-to-b from-fuchsia-100 via-white to-amber-50 border-[3px] border-yellow-200 p-4 shadow-2xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-fuchsia-500 to-purple-600 text-white font-black text-[13px] px-4 py-1 rounded-full border-2 border-white shadow-lg whitespace-nowrap">
              👑 开通VIP，解锁 AI 定制皮肤
            </div>
            <button onClick={() => setShowVip(false)} className="absolute top-2 right-3 text-slate-400 text-lg font-bold">×</button>

            <div className="mt-3 text-center text-slate-700 text-[12px] font-black">
              把你的想法，变成专属皮肤
            </div>

            <div className="mt-2 rounded-xl bg-white/90 border border-fuchsia-200 px-3 py-2 text-[11px] text-slate-700 leading-relaxed">
              <div>✦ 每完成 <b className="text-fuchsia-600">7 次亲子约定学</b> 获得 1 次定制机会</div>
              <div>✦ 一次生成 <b className="text-fuchsia-600">3 款候选效果</b></div>
              <div>✦ 可选择 1 款保存并装扮</div>
              <div>✦ 定制版本可在 <b className="text-fuchsia-600">背包</b> 中切换使用</div>
            </div>

            <div className="flex gap-2 mt-3">
              <GameBtn
                variant="ghost"
                onClick={() => setShowVip(false)}
                className="px-4 py-2 text-[12px] !text-slate-600 !bg-slate-100 !border-slate-300"
              >
                再看看
              </GameBtn>
              <GameBtn
                variant="yellow"
                onClick={() => { setIsVip(true); setShowVip(false); }}
                className="flex-1 py-2 text-[13px]"
              >
                立即开通VIP
              </GameBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SCREEN 4 & 5: Generating + Exit Modal ---------- */
function Screen4Generating({
  onDone,
  onBack,
  modal,
  onLeave,
  onStay,
}: {
  onDone: () => void;
  onBack: () => void;
  modal?: boolean;
  onLeave?: () => void;
  onStay?: () => void;
}) {
  const [progress, setProgress] = useState(12);
  useEffect(() => {
    if (modal) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 4;
        if (next >= 96) clearInterval(id);
        return Math.min(next, 96);
      });
    }, 600);
    return () => clearInterval(id);
  }, [modal]);
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn onClick={onBack} />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-fuchsia-400 to-purple-500 rounded-full px-5 py-1.5 border-2 border-white shadow-lg">
          <span className="text-white font-black text-sm drop-shadow">✨ 皮肤魔法工坊 ✨</span>
        </div>
      </div>
      <div className="absolute top-3 right-4 z-10"><Currency cheese={1781} /></div>

      {/* Magic stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-8">
        <div className="relative w-[200px] h-[200px]">
          {/* orbiting rings */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{ animationDuration: "8s" }} />
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-fuchsia-300/70 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
          <div className="absolute inset-6 rounded-full border border-yellow-200/70 animate-spin" style={{ animationDuration: "10s" }} />
          {/* glow */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-b from-fuchsia-400/50 to-purple-700/40 blur-md" />
          {/* silhouette */}
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <img src={charOriginal} className="h-[170px] object-contain opacity-60 mix-blend-screen drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]" alt="" />
          </div>
          {/* sparkles */}
          {["top-2 left-4 text-yellow-200", "top-6 right-2 text-pink-200", "bottom-6 left-2 text-cyan-200", "bottom-2 right-8 text-fuchsia-200"].map((c, i) => (
            <div key={i} className={`absolute ${c} text-lg animate-pulse`}>✦</div>
          ))}
        </div>

        <div className="text-center mt-1">
          <div className="text-white font-black text-[18px] drop-shadow">正在为你制作专属皮肤</div>
          <div className="text-white/80 text-[11px] mt-1">请稍等一下，马上就好 ✨</div>
        </div>

        {/* progress */}
        <div className="w-[300px] mt-1">
          <div className="h-2.5 rounded-full bg-white/15 border border-white/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-white/80 mt-1 font-bold">
            <span>通常约 20 秒</span>
            <span>高峰期最多 5 分钟</span>
          </div>
        </div>

        {!modal && (
          <button onClick={onDone} className="text-[10px] text-yellow-200 underline mt-1">[ 演示：跳转到结果页 ]</button>
        )}
      </div>

      {/* Exit confirm modal */}
      {modal && (
        <div className="absolute inset-0 z-30 bg-black/55 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-[360px] rounded-3xl bg-gradient-to-b from-indigo-100 to-white border-[3px] border-yellow-200 p-4 shadow-2xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-fuchsia-400 to-purple-600 text-white font-black text-sm px-4 py-1 rounded-full border-2 border-white shadow-lg">
              确定要离开吗？
            </div>
            <div className="mt-3 text-slate-700 text-[12px] leading-relaxed text-center">
              当前生成任务<b className="text-fuchsia-600">仍会继续</b>，<br />
              你可以稍后回到「定制中心」查看结果。
            </div>
            <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-[11px] text-amber-700 font-bold text-center">
              ⚠ 本次机会已扣除（生成中退出不取消任务）
            </div>
            <div className="flex gap-2 mt-3">
              <GameBtn variant="ghost" onClick={onLeave} className="flex-1 py-2 text-[12px] !text-slate-700 !bg-slate-100 !border-slate-300">
                先离开
              </GameBtn>
              <GameBtn variant="yellow" onClick={onStay} className="flex-1 py-2 text-[12px]">
                继续等待
              </GameBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SCREEN 6: Result preview (精简) ---------- */
const RESULTS = [
  { name: "星梦精灵款", img: charStar, color: "from-indigo-400 to-purple-600" },
  { name: "冰雪公主款", img: charIce, color: "from-cyan-300 to-sky-500" },
  { name: "机甲探险款", img: charSweet, color: "from-fuchsia-400 to-pink-500" },
];

function Screen6({ onSave }: { onSave: () => void }) {
  const [idx, setIdx] = useState(0);
  const [compare, setCompare] = useState<"orig" | "new">("new");
  const r = RESULTS[idx];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-full px-5 py-1.5 border-2 border-white shadow-lg">
          <span className="text-white font-black text-sm drop-shadow">🎁 3 选 1 · 挑出最喜欢的</span>
        </div>
      </div>
      <div className="absolute top-3 right-4 z-10"><Currency cheese={1781} /></div>

      {/* LEFT result cards */}
      <div className="absolute left-3 top-[60px] bottom-3 w-[150px] flex flex-col gap-2 z-10">
        {RESULTS.map((res, i) => (
          <button
            key={res.name}
            onClick={() => setIdx(i)}
            className={`relative flex-1 rounded-xl border-2 p-1.5 transition flex flex-col ${
              idx === i
                ? "border-yellow-300 bg-white/30 shadow-[0_0_14px_rgba(253,224,71,0.8)]"
                : "border-white/30 bg-white/10"
            }`}
          >
            <div className={`flex-1 rounded-lg bg-gradient-to-br ${res.color} overflow-hidden flex items-end justify-center`}>
              <img src={res.img} className="h-[90px] object-contain" alt="" />
            </div>
            <div className="flex items-center justify-between mt-1 px-0.5">
              <div className="text-white text-[10px] font-black leading-tight truncate">{res.name}</div>
              <span className="text-[8px] font-black bg-white/25 text-white rounded px-1 border border-white/30 shrink-0">方案{i + 1}</span>
            </div>
          </button>
        ))}
      </div>

      {/* CENTER stage */}
      <div className="absolute left-[165px] right-[200px] top-[60px] bottom-3 z-0">
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-fuchsia-400/30 to-purple-800/60 border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.15),transparent_30%,rgba(255,255,255,0.15)_60%,transparent)]" />
          <div className="absolute inset-x-0 bottom-2 flex items-end justify-center">
            <img src={compare === "new" ? r.img : charOriginal} className="h-[270px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" alt="" />
          </div>
          <div className="absolute top-2 left-2 bg-black/30 rounded-full p-0.5 flex text-[10px] font-bold border border-white/30">
            <button onClick={() => setCompare("orig")} className={`px-2 py-1 rounded-full ${compare === "orig" ? "bg-white text-slate-900" : "text-white"}`}>原皮肤</button>
            <button onClick={() => setCompare("new")} className={`px-2 py-1 rounded-full ${compare === "new" ? "bg-yellow-300 text-slate-900" : "text-white"}`}>定制后</button>
          </div>
          <div className="absolute bottom-1 left-0 right-0 text-center text-white/80 text-[10px]">
            预览：梦幻公主 · {r.name}
          </div>
        </div>
      </div>

      {/* RIGHT actions — 精简 */}
      <div className="absolute right-3 top-[60px] bottom-3 w-[185px] flex flex-col gap-2 z-10">
        <div className="rounded-2xl bg-white/15 border border-white/30 p-3 text-center">
          <div className="text-white/70 text-[10px]">已选择</div>
          <div className="text-white font-black text-[16px] mt-0.5">{r.name}</div>
          <div className="text-yellow-200 text-[10px] font-bold mt-1">方案 {idx + 1} / 3</div>
        </div>

        <div className="flex-1" />

        <GameBtn variant="yellow" onClick={onSave} className="py-3 text-base">
          💖 保存并装扮
        </GameBtn>
        <div className="text-center text-white/80 text-[9px] leading-tight">
          保存后立即穿戴到角色身上
        </div>
      </div>
    </div>
  );
}

/* ---------- SCREEN 7: Backpack — outfits + variants ---------- */
const VARIANTS = [
  { t: "原版", name: "独角精灵·原版", img: charOriginal },
  { t: "冰雪公主", name: "独角精灵·冰雪公主", img: charIce },
  { t: "闪电机甲", name: "独角精灵·闪电机甲", img: charStar },
  { t: "森林守护者", name: "独角精灵·森林守护者", img: charSweet },
];

const OUTFITS = [
  { name: "梦幻公主套", c: "from-pink-300 to-fuchsia-500", img: charOriginal, owned: true },
  { name: "冰雪魔法套", c: "from-cyan-300 to-sky-500", img: charIce, owned: true, custom: true },
  { name: "星梦偶像套", c: "from-indigo-400 to-purple-600", img: charStar, owned: true, custom: true },
  { name: "甜心娃娃套", c: "from-pink-200 to-rose-400", img: charSweet, owned: false },
  { name: "森林精灵套", c: "from-lime-300 to-emerald-500", img: charOriginal, owned: false },
  { name: "中国小侠套", c: "from-rose-300 to-red-500", img: charIce, owned: false },
];

function Screen7({ onCustomize }: { onCustomize: () => void }) {
  const [variant, setVariant] = useState(1);
  const [outfit, setOutfit] = useState(0);
  const [showNewVer, setShowNewVer] = useState(false);
  const cur = VARIANTS[variant];
  return (
    <div className={`relative w-full h-full ${dreamBg}`}>
      <Sparkles />
      <BackBtn />

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
      <div className="absolute left-[70px] top-[60px] bottom-[54px] z-0" style={{ right: 416 }}>
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-indigo-400/25 to-purple-800/40 border border-white/15 overflow-hidden flex items-end justify-center">
          <img src={cur.img} className="h-[260px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]" alt="" />
          <div className="absolute top-6 left-6 text-white/70 text-xl">✦</div>
          <div className="absolute top-12 right-10 text-pink-200 text-lg">✧</div>
          <div className="absolute top-2 left-2 bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
            当前：{cur.name}
          </div>
        </div>
      </div>

      {/* Vertical Variant Switcher — 默认显示 3 个，可滑动 */}
      <div className="absolute top-[60px] bottom-[6px] z-10" style={{ left: 332, width: 86 }}>
        <div className="relative w-full h-full rounded-2xl bg-white/12 backdrop-blur border border-white/30 p-1.5 flex flex-col shadow-lg">
          <div className="text-center text-white text-[9px] font-black leading-tight pb-1 border-b border-white/20 mb-1">
            <span className="bg-fuchsia-400 text-white text-[7px] px-1 rounded mr-0.5">NEW</span>
            定制版本
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-0.5 scrollbar-thin">
            {VARIANTS.map((v, i) => {
              const active = variant === i;
              return (
                <button
                  key={v.t}
                  onClick={() => setVariant(i)}
                  className={`relative shrink-0 h-[78px] rounded-xl border-2 transition flex flex-col items-center justify-end overflow-hidden ${
                    active
                      ? "border-yellow-300 bg-gradient-to-b from-fuchsia-400/40 to-purple-500/40 shadow-[0_0_14px_rgba(253,224,71,0.85)] scale-[1.03]"
                      : "border-white/30 bg-white/10 hover:border-white/60"
                  }`}
                >
                  {i >= 1 && (
                    <span className="absolute top-0.5 left-0.5 text-[7px] font-black bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-1 rounded z-10">✦</span>
                  )}
                  {active && (
                    <span className="absolute top-0.5 right-0.5 text-[9px] text-yellow-300 z-10">★</span>
                  )}
                  <div className="flex-1 w-full flex items-end justify-center overflow-hidden">
                    <img src={v.img} className="h-[54px] object-contain" alt="" />
                  </div>
                  <div className={`w-full text-center text-[8px] font-black leading-none py-0.5 truncate px-0.5 ${
                    active ? "bg-yellow-300 text-slate-900" : "text-white bg-white/10"
                  }`}>
                    {v.t}
                  </div>
                </button>
              );
            })}
            {/* + 定制新版本 入口卡片 */}
            <button
              onClick={() => setShowNewVer(true)}
              className="relative shrink-0 h-[78px] rounded-xl border-2 border-dashed border-yellow-300/80 bg-gradient-to-br from-fuchsia-500/30 via-purple-500/30 to-indigo-500/40 flex flex-col items-center justify-center overflow-hidden hover:shadow-[0_0_14px_rgba(253,224,71,0.7)] transition"
            >
              <span className="absolute top-0.5 left-0.5 text-[6px] font-black bg-yellow-300 text-slate-900 px-1 rounded z-10">VIP</span>
              <span className="absolute top-1 right-1 text-[8px] text-pink-200 animate-pulse">✦</span>
              <span className="absolute bottom-6 right-1 text-[7px] text-cyan-200">✧</span>
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20 border border-white/60 mb-0.5">
                <span className="text-white text-base font-black leading-none">+</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-yellow-200">?</span>
              </div>
              <div className="text-white text-[8px] font-black leading-none">定制新版本</div>
              <div className="text-yellow-200 text-[7px] mt-0.5 leading-none">消耗1次机会</div>
            </button>
          </div>
          <div className="text-center text-white/50 text-[8px] mt-0.5">↕ 滑动</div>
        </div>
      </div>

      {/* bottom-left action buttons */}
      <div className="absolute left-3 bottom-3 flex flex-col items-center gap-1 z-10">
        <div className="flex gap-1">
          <GameBtn variant="pink" className="px-3 py-1 text-[10px]">穿戴</GameBtn>
          <GameBtn variant="ghost" className="px-2 py-1 text-[10px]">取消</GameBtn>
        </div>
        <GameBtn variant="ghost" className="px-2 py-1 text-[10px]">📷 分享造型</GameBtn>
      </div>

      {/* RIGHT: 套装模块 */}
      <div className="absolute right-[44px] top-[60px] bottom-3 w-[330px] flex flex-col gap-1.5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white text-[11px] font-bold">
            <span>👗</span> 套装 · 已拥有 3 / 12
          </div>
          <div className="bg-white/90 text-slate-700 text-[10px] rounded-full px-2 py-0.5 font-bold">全部 ▾</div>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-1.5 overflow-hidden">
          {OUTFITS.map((o, i) => {
            const active = outfit === i;
            return (
              <button
                key={o.name}
                onClick={() => setOutfit(i)}
                className={`relative rounded-xl p-1 border-2 flex flex-col ${
                  active
                    ? "border-yellow-300 bg-white/30 shadow-[0_0_10px_rgba(253,224,71,0.7)]"
                    : "border-white/30 bg-white/15"
                }`}
              >
                <div className={`flex-1 rounded-lg bg-gradient-to-br ${o.c} relative overflow-hidden flex items-end justify-center`}>
                  <img src={o.img} className="h-[64px] object-contain" alt="" />
                  {o.custom && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-[7px] font-black px-1 py-0.5 rounded-br-md z-10">
                      ✦定制
                    </div>
                  )}
                  {!o.owned && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-base">🔒</div>
                  )}
                </div>
                <div className="text-white text-[9px] font-bold mt-0.5 leading-tight truncate text-center">{o.name}</div>
              </button>
            );
          })}
        </div>
        <div className="text-center text-white/70 text-[9px]">— 完成约定学解锁更多套装 —</div>
      </div>

      {/* Far right category icons */}
      <div className="absolute right-1 top-[60px] bottom-3 w-[40px] flex flex-col gap-1.5 items-center z-10">
        {["👗","👤","👒","👕","👖","🎀","✨"].map((e, i) => (
          <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${i===0?"bg-slate-900/40 border border-white":"bg-white/10"}`}>
            {e}
          </div>
        ))}
      </div>

      {/* 定制新版本 引导弹窗 */}
      {showNewVer && (
        <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center" onClick={() => setShowNewVer(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative w-[420px] rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 border-4 border-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.6)] p-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-[11px] font-black px-3 py-1 rounded-full border-2 border-white shadow">✨ AI 魔法定制 ✨</div>
            <div className="flex items-center gap-3 mt-2">
              <div className="relative w-[88px] h-[88px] rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-600 border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
                <img src={cur.img} className="h-[78px] object-contain" alt="" />
                <span className="absolute top-1 right-1 text-yellow-200 text-xs animate-pulse">✦</span>
              </div>
              <div className="flex-1">
                <div className="text-slate-900 text-base font-black leading-tight">为这套皮肤定制新版本</div>
                <div className="text-slate-600 text-[10px] mt-0.5">当前皮肤：<b className="text-fuchsia-600">{cur.name}</b></div>
              </div>
            </div>
            <div className="mt-2.5 bg-white/70 rounded-xl border-2 border-white p-2 text-[11px] text-slate-700 space-y-1 leading-snug">
              <div>✦ 基于当前皮肤生成，<b>不改变模型和动作</b></div>
              <div>✦ 输入你的想法，AI 会生成 <b className="text-fuchsia-600">3 款候选效果</b></div>
              <div>✦ 可选择 1 款<b>保存到背包</b></div>
              <div className="text-[10px] text-slate-500">* 最终效果以生成结果为准</div>
            </div>
            <div className="flex gap-2 mt-3">
              <GameBtn variant="ghost" onClick={() => setShowNewVer(false)} className="flex-1 py-2 text-[12px] !text-slate-700 !bg-white !border-slate-300">再看看</GameBtn>
              <GameBtn variant="yellow" onClick={() => { setShowNewVer(false); onCustomize(); }} className="flex-1 py-2 text-[13px]">🎨 去定制</GameBtn>
            </div>
          </div>
        </div>
      )}
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
