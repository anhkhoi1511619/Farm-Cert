import fs from 'node:fs';

const input = process.argv[2] ?? '.tmp-ccar-f.html';
const output = process.argv[3] ?? 'app/src/main/assets/quiz/ccar-f.js';
const html = fs.readFileSync(input, 'utf8');
const marker = 'const DATA = ';
const start = html.indexOf(marker);
if (start < 0) throw new Error('CCAR-F DATA payload not found');
const jsonStart = start + marker.length;
const jsonEnd = html.indexOf('\nconst $', jsonStart);
if (jsonEnd < 0) throw new Error('CCAR-F DATA terminator not found');
const data = JSON.parse(html.slice(jsonStart, jsonEnd).trim().replace(/;$/, ''));

const decode = value => String(value ?? '')
  .replaceAll('&quot;', '"')
  .replaceAll('&#x27;', "'")
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&amp;', '&')
  .replaceAll('&nbsp;', ' ');

const questions = data.topics.flatMap(topic => topic.questions.map(question => ({
  number: question.n,
  topic: question.topic ?? topic.n,
  type: question.type === 'mcq' && question.multi ? 'multiple' : (question.type ?? 'single'),
  question: decode(question.stem?.en),
  options: question.options?.map(option => decode(option.t?.en)) ?? [],
  answers: (question.answer ?? []).map(key => question.options?.find(option => option.k === key)?.t?.en).filter(Boolean).map(decode),
  ...(question.explain ? { explanation: {
    key: decode(question.explain.key),
    elimination: question.explain.elim?.map(decode) ?? []
  } } : {})
})));

const result = {
  title: data.meta?.title?.en ?? 'Claude Certified Architect - Foundations',
  description: 'Claude Certified Architect - Foundations (CCAR-F)',
  defaultCount: questions.length,
  passPercent: data.meta?.pass ?? 70,
  questions
};

fs.mkdirSync(new URL('.', `file://${process.cwd()}/${output}`), { recursive: true });
fs.writeFileSync(output, `const ccar_f = ${JSON.stringify(result, null, 2)};\n`, 'utf8');
console.log(`Generated ${questions.length} questions at ${output}`);
