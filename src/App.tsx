import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Moon, Sparkles, Volume2, X } from 'lucide-react'
import { cats, content, moods, sequences, wishes } from './data/content'
import type { Content, ContentKind, MoodId } from './types'

type Page = 'home' | 'session' | 'wish' | 'surprise' | 'stress' | 'love' | 'favorites'
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const contentIcon: Record<ContentKind, string> = { cat:'🐾', compliment:'💌', visual:'✦', music:'♫', fact:'◌', meme:'😹', interactive:'✋' }

function useStore<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => { try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : initial } catch { return initial } })
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])
  return [value, setValue] as const
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [session, setSession] = useState<Content[]>([])
  const [step, setStep] = useState(0)
  const [favorites, setFavorites] = useStore<Content[]>('endorphin-favorites', [])
  const [sound, setSound] = useStore('endorphin-sound', true)
  const [wishData, setWishData] = useStore<{date:string; text:string} | null>('endorphin-wish', null)
  const [surprise, setSurprise] = useState<Content | null>(null)
  const [love, setLove] = useState<Content>(content.compliment[0])
  const [feedback, setFeedback] = useState(false)

  const startSession = (mood: MoodId) => {
    setSession(sequences[mood].map(kind => pick(content[kind])))
    setStep(0); setFeedback(false); setPage('session')
  }
  const randomMood = () => startSession(pick(moods).id)
  const toggleFavorite = (item: Content) => setFavorites(old => old.some(x => x.id === item.id) ? old.filter(x => x.id !== item.id) : [...old, item])
  const isFavorite = (item: Content) => favorites.some(x => x.id === item.id)
  const newSurprise = () => { const kinds = Object.keys(content) as ContentKind[]; setSurprise(pick(content[pick(kinds)])) }
  const showSurprise = () => { newSurprise(); setPage('surprise') }
  const openWish = () => setPage('wish')
  const today = new Date().toISOString().slice(0,10)
  const revealWish = () => { if (!wishData || wishData.date !== today) setWishData({ date: today, text: pick(wishes) }) }

  return <main>
    <div className="aurora a1"/><div className="aurora a2"/><div className="stars">✦　·　✧　·　⋆　·　✦</div>
    <nav><button className="brand" onClick={() => setPage('home')}><span>✦</span> ЭНДОРФИН</button><div className="nav-links"><button onClick={openWish}>Пожелание</button><button onClick={() => setPage('stress')}>Антистресс</button><button onClick={() => { setLove(pick(content.compliment)); setPage('love') }}>Мне нужно любви</button><button className="fav-nav" onClick={() => setPage('favorites')}><Heart size={17} fill={favorites.length ? 'currentColor' : 'none'}/><span>Моё</span></button><button className="sound" onClick={() => setSound(!sound)} aria-label="Звук"><Volume2 size={18}/>{sound ? 'on' : 'off'}</button></div></nav>
    <AnimatePresence mode="wait">
      {page === 'home' && <Home key="home" onMood={startSession} onRandom={randomMood} onSurprise={showSurprise} onWish={openWish}/>} 
      {page === 'session' && <Session key="session" item={session[step]} number={step + 1} complete={step === 5} feedback={feedback} setFeedback={setFeedback} onNext={() => step < 4 ? setStep(step + 1) : setStep(5)} onHome={() => setPage('home')} onAgain={showSurprise} onFavorite={toggleFavorite} favorite={session[step] ? isFavorite(session[step]) : false} onStress={() => setPage('stress')} onWish={openWish}/>} 
      {page === 'wish' && <Wish key="wish" data={wishData?.date === today ? wishData.text : null} onReveal={revealWish} onFavorite={() => wishData && toggleFavorite({ id: `wish-${today}`, kind:'compliment', title:'Пожелание дня', text:wishData.text, emoji:'🔮', accent:'#bdacee' })}/>} 
      {page === 'surprise' && surprise && <ContentCard key="surprise" item={surprise} heading="Кот выбрал для тебя" caption="Он считает, что сейчас тебе нужен именно этот маленький сюрприз." onFavorite={() => toggleFavorite(surprise)} favorite={isFavorite(surprise)} action="Ещё сюрприз" onAction={newSurprise}/>} 
      {page === 'stress' && <Stress key="stress"/>}
      {page === 'love' && <ContentCard key="love" item={love} heading="Немного любви для тебя" caption="От Кота-Уюта, без повода." onFavorite={() => toggleFavorite(love)} favorite={isFavorite(love)} action="Ещё одно" onAction={() => setLove(pick(content.compliment))}/>} 
      {page === 'favorites' && <Favorites key="favorites" items={favorites} onRemove={toggleFavorite}/>} 
    </AnimatePresence>
    <footer>Сделано с мурчанием · Это пространство для лёгкой эмоциональной паузы, не медицинский сервис.</footer>
  </main>
}

const PageWrap = ({children}:{children:React.ReactNode}) => <motion.section className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}>{children}</motion.section>

function Home({onMood,onRandom,onSurprise,onWish}:{onMood:(id:MoodId)=>void;onRandom:()=>void;onSurprise:()=>void;onWish:()=>void}) { return <PageWrap><div className="home-grid"><div className="intro"><p className="eyebrow">ТВОЯ МАЛЕНЬКАЯ ПАУЗА</p><h1>Как ты себя<br/><em>чувствуешь?</em></h1><p className="lead">Выбери состояние, а кот сам соберёт для тебя пять приятных вещей. Тебе не нужно ничего решать.</p><div className="moods">{moods.map(m => <button className={'mood '+m.tone} key={m.id} onClick={() => onMood(m.id)}><span>{m.emoji}</span>{m.label}</button>)}</div><button className="primary" onClick={onRandom}><Sparkles size={18}/> Не знаю — пусть кот решит</button></div><aside className="hero-cat"><div className="moon">☾</div><div className="cat-face">🐈</div><div className="cat-bubble"><b>Привет, я Кот-Уют</b><br/>Я уже рядом. Давай чуть-чуть выдохнем.</div><div className="quick"><button onClick={onWish}>🔮 Пожелание дня</button><button onClick={onSurprise}>🎲 Удиви меня</button></div></aside></div><div className="cat-line">{cats.map(c=><div key={c.id} className="mini-cat" style={{'--cat':c.color} as React.CSSProperties}><span>{c.emoji}</span><small>{c.name.replace('Кот-','')}</small></div>)}</div></PageWrap> }

function Session({item,number,complete,feedback,setFeedback,onNext,onHome,onAgain,onFavorite,favorite,onStress,onWish}:any) { if (complete) return <PageWrap><div className="completion"><div className="finish-cat">😺</div><p className="eyebrow">СЕССИЯ ЗАВЕРШЕНА</p><h2>Ну что, стало<br/><em>немного лучше?</em></h2>{!feedback ? <div className="feedback"><button onClick={()=>setFeedback(true)}>🙂 Да</button><button onClick={()=>setFeedback(true)}>😐 Немного</button><button onClick={()=>setFeedback(true)}>😔 Нет</button></div> : <div className="after"><p>Кот гордится тем, что ты сделал(а) паузу. Это уже важно.</p><button className="primary" onClick={onAgain}>Ещё приятность</button><button className="text-btn" onClick={onHome}>Вернуться на главную</button><div><button onClick={onStress}>🧸 Антистресс</button><button onClick={onWish}>🔮 Пожелание дня</button></div></div>}</div></PageWrap>
 return <ContentCard item={item} heading={`Эндорфиновая сессия`} caption={`Шаг ${number} из 5 · Кот всё продумал за тебя`} action={number === 5 ? 'Завершить сессию' : 'Следующая приятность'} onAction={onNext} onFavorite={onFavorite} favorite={favorite}/> }

function ContentCard({item,heading,caption,action,onAction,onFavorite,favorite}:{item:Content;heading:string;caption:string;action:string;onAction:()=>void;onFavorite:()=>void;favorite:boolean}) { return <PageWrap><div className="session-head"><p className="eyebrow">{heading}</p><span>{caption}</span></div><div className="content-card" style={{'--accent':item.accent} as React.CSSProperties}><div className="orb">{item.emoji}</div><div className="content-copy"><span className="type">{contentIcon[item.kind]} {item.kind === 'cat' ? 'встреча с котом' : item.kind}</span><h2>{item.title}</h2><p>{item.text}</p><button className={'heart '+(favorite?'active':'')} onClick={onFavorite}><Heart size={19} fill={favorite ? 'currentColor' : 'none'}/>{favorite?'В моём':'Сохранить'}</button></div></div><button className="primary center" onClick={onAction}>{action} <span>→</span></button></PageWrap> }

function Wish({data,onReveal,onFavorite}:{data:string|null;onReveal:()=>void;onFavorite:()=>void}) { return <PageWrap><div className="wish"><div className={'wizard '+(data?'revealed':'')}>🧙‍♂️<i>✦</i><i>✧</i></div><p className="eyebrow">КОТ-ВОЛШЕБНИК ШЕПЧЕТ</p><h2>Пожелание дня</h2>{data ? <div className="wish-result"><p>«{data}»</p><button className="heart active" onClick={onFavorite}><Heart size={18} fill="currentColor"/> Сохранить</button><small>Новое пожелание появится завтра. А это — твоё на сегодня.</small></div> : <><p>Одно доброе слово от звёзд — только для тебя.</p><button className="primary" onClick={onReveal}><Sparkles size={18}/> Узнать пожелание</button></>}</div></PageWrap> }

function Stress() { const [pets,setPets]=useState(0); const [bubbles,setBubbles]=useState(()=>Array.from({length:14},(_,i)=>i)); return <PageWrap><div className="stress"><p className="eyebrow">БЕЗ ЦЕЛИ, БЕЗ СПЕШКИ</p><h2>🧸 Антистресс</h2><div className="stress-grid"><article><h3>Погладь кота</h3><p>Он мурчит, когда ему приятно.</p><button className="pet-cat" onClick={()=>setPets(x=>x+1)}>{pets > 8 ? '😻' : '🐈'}<span>{pets ? `мурр × ${pets}` : 'погладить'}</span></button></article><article><h3>Лопай пузырьки</h3><p>Ничего не нужно делать правильно.</p><div className="bubbles">{bubbles.map(id=><motion.button key={id} className="bubble" layout onClick={()=>setBubbles(x=>x.filter(v=>v!==id))} whileTap={{scale:1.5,opacity:0}} style={{'--s':`${30+(id%4)*12}px`} as React.CSSProperties}/>)}</div><button className="text-btn" onClick={()=>setBubbles(Array.from({length:14},(_,i)=>i))}>Ещё пузырьки</button></article></div></div></PageWrap> }

function Favorites({items,onRemove}:{items:Content[];onRemove:(x:Content)=>void}) { return <PageWrap><div className="favorites"><p className="eyebrow">ТВОЯ КОЛЛЕКЦИЯ ТЁПЛОГО</p><h2>❤️ Моё</h2>{items.length ? <div className="fav-grid">{items.map(item=><article key={item.id} style={{'--accent':item.accent} as React.CSSProperties}><span>{item.emoji}</span><h3>{item.title}</h3><p>{item.text}</p><button onClick={()=>onRemove(item)}><X size={14}/> убрать</button></article>)}</div> : <div className="empty"><Heart size={32}/><p>Здесь будут вещи, к которым захочется вернуться.</p><small>Нажимай «Сохранить» в сессии, пожеланиях и сюрпризах.</small></div>}</div></PageWrap> }
