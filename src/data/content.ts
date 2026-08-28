import type { Cat, Content, ContentKind, Mood, MoodId } from '../types'

export const moods: Mood[] = [
  { id: 'sad', emoji: '😔', label: 'Грустно', tone: 'lavender' }, { id: 'anxious', emoji: '😰', label: 'Тревожно', tone: 'blue' },
  { id: 'angry', emoji: '😡', label: 'Злюсь', tone: 'peach' }, { id: 'tired', emoji: '🥱', label: 'Устал(а)', tone: 'cream' },
  { id: 'bored', emoji: '😶', label: 'Скучно', tone: 'mint' }, { id: 'overloaded', emoji: '🫠', label: 'Перегружен(а)', tone: 'purple' },
  { id: 'lonely', emoji: '💔', label: 'Одиноко', tone: 'pink' }, { id: 'pleasant', emoji: '✨', label: 'Хочу приятного', tone: 'yellow' },
]

export const cats: Cat[] = [
  { id: 'cozy', name: 'Кот-Уют', title: 'ваш тёплый компаньон', emoji: '🐈', description: 'Видит плед в каждой сложной ситуации.', color: '#ffca8a' },
  { id: 'optimist', name: 'Кот-Оптимист', title: 'поставщик хороших новостей', emoji: '🐱', description: 'Уверен: впереди есть что-то вкусное.', color: '#f9df73' },
  { id: 'rascal', name: 'Кот-Хулиган', title: 'эксперт по смешинкам', emoji: '😸', description: 'Немного дерзкий. Очень смешной.', color: '#f39a9a' },
  { id: 'sage', name: 'Кот-Мудрец', title: 'хранитель спокойствия', emoji: '😺', description: 'Знает, когда стоит просто посидеть.', color: '#b5a4ed' },
  { id: 'wizard', name: 'Кот-Волшебник', title: 'предсказатель маленьких радостей', emoji: '🧙‍♂️', description: 'Носит звёзды в карманах.', color: '#8fd8ca' },
]

export const content: Record<ContentKind, Content[]> = {
  cat: cats.map(c => ({ id: c.id, kind: 'cat', title: c.name, text: `${c.description} Сегодня он рядом с тобой.`, emoji: c.emoji, accent: c.color })),
  compliment: [
    { id: 'comp-1', kind: 'compliment', title: 'Небольшое напоминание', text: 'Тебе не нужно быть продуктивным каждую минуту.', emoji: '💌', accent: '#eeb2d0' },
    { id: 'comp-2', kind: 'compliment', title: 'Ты справляешься', text: 'Давай просто переживём этот день маленькими шагами.', emoji: '🌷', accent: '#d8b7ee' },
    { id: 'comp-3', kind: 'compliment', title: 'Разрешение на паузу', text: 'Сегодня тебе можно немного отдохнуть. Правда можно.', emoji: '🫶', accent: '#facb92' },
  ],
  visual: [
    { id: 'vis-1', kind: 'visual', title: 'Тихий вечер', text: 'Представь: город замедлился, а небо бережно зажгло для тебя звёзды.', emoji: '🌙', accent: '#9eb8e8' },
    { id: 'vis-2', kind: 'visual', title: 'Тёплое море', text: 'Волна приходит и уходит. Тебе тоже не нужно держать всё в себе.', emoji: '🌊', accent: '#94d8d1' },
    { id: 'vis-3', kind: 'visual', title: 'Золотой час', text: 'Свет ложится на всё мягко. Пусть и к себе ты сегодня будешь помягче.', emoji: '🌅', accent: '#f6bd85' },
  ],
  music: [
    { id: 'mus-1', kind: 'music', title: 'Саундтрек паузы', text: 'Сделай вдох на четыре счёта. Выдох — чуть длиннее. Кот слушает вместе с тобой.', emoji: '🎧', accent: '#a9a9ef' },
    { id: 'mus-2', kind: 'music', title: 'Медленный ритм', text: 'Несколько спокойных минут — это уже маленькая забота о себе.', emoji: '🎶', accent: '#b0dca2' },
  ],
  fact: [
    { id: 'fact-1', kind: 'fact', title: 'Факт от Мудреца', text: 'Кошки мурлычут не только от радости — это ещё и их способ успокоить себя.', emoji: '🧠', accent: '#c4a9e8' },
    { id: 'fact-2', kind: 'fact', title: 'Маленькое чудо', text: 'Запах после дождя называется петрикор. Теперь у этого ощущения есть имя.', emoji: '☔', accent: '#8fc8de' },
    { id: 'fact-3', kind: 'fact', title: 'Чуть-чуть космоса', text: 'Свет от Луны добирается до нас примерно за 1,3 секунды.', emoji: '🌕', accent: '#e2d283' },
  ],
  meme: [
    { id: 'meme-1', kind: 'meme', title: 'Настроение дня', text: 'Я: сейчас соберусь. Кот: а давай лучше полежим профессионально.', emoji: '😹', accent: '#f3ae9b' },
    { id: 'meme-2', kind: 'meme', title: 'Важное совещание', text: 'Повестка: вкусняшка, сон и почему ты всё ещё не гладишь кота.', emoji: '🐾', accent: '#f7c889' },
  ],
  interactive: [{ id: 'int-1', kind: 'interactive', title: 'Микро-приключение', text: 'Найди вокруг себя три вещи приятного цвета. Мир умеет подмигивать.', emoji: '🔎', accent: '#9cd9bd' }],
}

export const sequences: Record<MoodId, ContentKind[]> = {
  sad: ['cat','compliment','visual','music','fact'], anxious: ['visual','music','cat','compliment','visual'], angry: ['meme','cat','fact','music','compliment'], tired: ['visual','cat','music','compliment','cat'], bored: ['fact','meme','interactive','cat','visual'], overloaded: ['visual','cat','music','compliment','fact'], lonely: ['cat','compliment','music','visual','cat'], pleasant: ['cat','visual','compliment','fact','music'],
}

export const wishes = ['Сегодня тебя ждёт маленькая неожиданная радость.', 'Кто-то сегодня обязательно поднимет тебе настроение.', 'Сегодня хороший день для маленькой награды себе.', 'Ты заметишь что-то красивое именно в нужный момент.', 'Пусть сегодня будет хотя бы один момент: «вот это приятно».']
