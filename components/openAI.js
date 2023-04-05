const aiUrl = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

export async function openAI(body = null) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
    };
    const res = await fetch(aiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    });
    if (!res.ok) throw new Error("no response");
    const data = await res.json();
    const { content } = data.choices[0].message;
    if (!content) throw new Error("no content");
    return content;
}

export async function openChatGpt() {
    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content:
                    "Выведи пять забавных и милых кличек для животных, без нумерации, через запятую.",
            },
        ],
        temperature: 0.7,
    };
    return openAI(body);
}

export default openAI;
