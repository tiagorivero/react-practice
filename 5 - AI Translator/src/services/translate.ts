import { SUPPORTED_LANGUAGES } from "../constants"
import type { FromLanguage, Language } from "../types"
import OpenAI from "openai"

const apiKey = import.meta.env.VITE_GROQ_API_KEY //VITE_OPENAI_API_KEY

const openai = new OpenAI({ 
    apiKey, 
    baseURL: 'https://api.groq.com/openai/v1',
    dangerouslyAllowBrowser: true 
})
//const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
// dangerouslyAllowBrowser es necesario porque se ejecuta en el browser (Vite) 

export async function translate({ 
    fromLanguage, 
    toLanguage, 
    fromText
} : {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    fromText: string
}) {
    if( fromLanguage === toLanguage) return fromText
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: 'You are an AI that translates text. You receive text from the user. Do not answer, just translate the text. The original language is surrounded by "{{" and "}}". You can also receive {{auto}}, which means you have to detect the language. The target language is surrounded by "[[" and "]]".'
        },
        {
            role: 'user',
            content: `Hola mundo {{Español}} [[English]]`
        },
        {
            role: 'assistant',
            content: `Hello world`
        },
        {
            role: 'user',
            content: `How are you? {{auto}} [[Deutsch]]`
        },
        {
            role: 'assistant',
            content: `Wie geht es dir?`
        },
        {
            role: 'user',
            content: `Bon dia, com estas? {{auto}} [[Español]]`
        },
        {
            role: 'assistant',
            content: `Buenos dias, ¿cómo estás?`
        }
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [...messages, {
            role: 'user',
            content: `${fromText} {{${fromCode}}} [[${toCode}]]`
        }]
    })
    return completion.choices[0]?.message?.content
}