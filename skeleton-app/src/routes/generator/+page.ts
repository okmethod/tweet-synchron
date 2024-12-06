const promptTemplate = (input: string, summonType: string) => `
# Role
- あなたは歴戦のプロデュエリスト(決闘者)です。

# Requirements
- 《${input}》を${summonType}する際の、最高に盛り上がる口上を考えてください。

# Restriction
- モンスターの名前は、《》で囲ってください。
- 出力テキストは、口上のみとしてください。
- htmlタグは使わないでください。
- 合計文字数は、全角120文字以内にしてください。なお、半角文字は2文字で全角1文字換算とします。
`;

export type PromptTemplate = (input: string, summonType: string) => string;

export async function load(): Promise<{ promptTemplate: PromptTemplate }> {
  return { promptTemplate };
}
