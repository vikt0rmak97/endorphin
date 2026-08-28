export type ContentKind = 'cat' | 'compliment' | 'visual' | 'music' | 'fact' | 'meme' | 'interactive'
export type MoodId = 'sad' | 'anxious' | 'angry' | 'tired' | 'bored' | 'overloaded' | 'lonely' | 'pleasant'
export interface Mood { id: MoodId; emoji: string; label: string; tone: string }
export interface Cat { id: string; name: string; title: string; emoji: string; description: string; color: string }
export interface Content { id: string; kind: ContentKind; title: string; text: string; emoji: string; accent: string }
