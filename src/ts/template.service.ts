export default async function loadTemplate(templatePath: string, baseUrl: string): Promise<String> {
    const url = new URL(templatePath, baseUrl).href;
    const response = await fetch(url);
    return await response.text();
}