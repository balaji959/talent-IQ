const JUDGE0_API = "https://judge0-ce.p.rapidapi.com"

const LANGUAGE_IDS = {
    javascript: 63,
    python: 71,
    java: 62,
}

export async function executeCode(language, code) {
    try {
        const languageId = LANGUAGE_IDS[language]

        if (!languageId) {
            return {
                success: false,
                error: `Unsupported language: ${language}`
            }
        }

        const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "8ae6f83c75mshf869ded26d5c99fp183e1fjsn9e6c7443afc3",
                "X-RapidAPI-Host": "judge029.p.rapidapi.com"
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: code,
            })
        })

        if (!response.ok) {
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`
            }
        }

        const data = await response.json()
        const output = (data.stdout || "").trim()
        const stderr = (data.stderr || data.compile_output || "").trim()

        if (stderr) {
            return {
                success: false,
                output: output,
                error: stderr
            }
        }

        return {
            success: true,
            output: output || "No output"
        }

    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`
        }
    }
}

function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        python: "py",
        java: "java",
    }
    return extensions[language] || "txt"
}