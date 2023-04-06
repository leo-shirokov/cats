const netlifyUrl = "https://cat-backend.netlify.app/.netlify/functions/api";

async function getApiKey() {
    const res = await fetch(netlifyUrl);
    if (!res.ok) throw new Error("cannot get API key");
    const { api_key } = await res.json();
    return api_key;
}

const aiUrl = "https://api.openai.com/v1/chat/completions";

export async function openAI(body = null) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getApiKey()}`,
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
