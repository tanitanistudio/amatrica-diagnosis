// share/*.html を生成するスクリプト（OGP/Twitter Card 用の静的ページ）
// クローラーはJSを実行しないため、タイプ別の og:image を確実に読ませるには
// 静的HTMLとして配置する必要がある。result.html へは meta refresh + JS で誘導する。
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tanitanistudio.github.io/amatrica-diagnosis';

const CHARACTERS = {
  EFAS: ['恋愛脳探偵', '好きになると、恋の謎まで解きたくなる。'],
  EFSA: ['トキメキ通訳', 'このドキドキ、ちゃんと言葉にしたい。'],
  EAFS: ['一途ナイト', '好きになった瞬間から、もう守る側。'],
  EASF: ['赤い糸ジャンキー', 'ただの恋じゃ足りない、運命であってほしい。'],
  ESFA: ['恋するこたつ', '恋もしたいけど、最後はほっとしたい。'],
  ESAF: ['日常ロマンサー', '何でもない毎日を、恋で特別にしてしまう。'],
  FEAS: ['沼トーカー', '話してるだけで、気づけば心に住みついてる。'],
  FESA: ['恋愛参謀', '恋も人間関係も、感情だけでは動かない。'],
  FAES: ['心読み探偵', 'その一言の裏にある本音まで見逃さない。'],
  FASE: ['感情レスキュー', '傷ついた心を見ると、助けずにいられない。'],
  FSEA: ['親友ラバー', '恋より先に、"いちばん話せる人"になりたい。'],
  FSAE: ['安心ブレーン', '好きな人の人生まで、つい一緒に考えてしまう。'],
  AEFS: ['つくし天使', '愛した瞬間、自分のことは後回し。'],
  AESF: ['愛しすぎ聖者', '我慢してるのに、それすら愛だと思ってしまう。'],
  AFES: ['共感ナース', '好きな人の痛みを、自分のことみたいに感じる。'],
  AFSE: ['メンタル番犬', '大事な人の心は、私がずっと守っていたい。'],
  ASEF: ['おかえり守護神', 'どんな日も、"帰れる場所"でありたい。'],
  ASFE: ['世話焼きエンジェル', '愛情は、やさしさと面倒見のよさで伝わる。'],
  SEFA: ['実家ラバー', '一緒にいるだけで、なぜか心がほどけていく。'],
  SEAF: ['平和番長', 'ドキドキより、穏やかに続く恋がいちばん強い。'],
  SFEA: ['ぬくもり通訳', '言葉にしなくても、やさしさはちゃんと伝わる。'],
  SFAE: ['相談ホイホイ', '気づけばみんなの本音が、ここに集まってくる。'],
  SAEF: ['身内モンスター', '好きになるほど、もう他人ではいられない。'],
  SAFE: ['最後の味方', 'どんなときでも、最後まであなたの側にいる。'],
};

const outDir = path.join(__dirname, '..', 'share');
fs.mkdirSync(outDir, { recursive: true });

for (const [id, [name, catchphrase]] of Object.entries(CHARACTERS)) {
  const title = `アマトリカ診断｜私は「${name}」でした`;
  const imageUrl = `${BASE_URL}/img/${id}.png`;
  const shareUrl = `${BASE_URL}/share/${id}.html`;
  const resultUrl = `../result.html?type=${id}`;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>

<meta property="og:title" content="${title}">
<meta property="og:description" content="${catchphrase}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:url" content="${shareUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="アマトリカ診断">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${catchphrase}">
<meta name="twitter:image" content="${imageUrl}">

<meta http-equiv="refresh" content="0;url=${resultUrl}">
<script>window.location.replace('${resultUrl}');</script>
</head>
<body>
<p><a href="${resultUrl}">診断結果「${name}」を見る</a></p>
</body>
</html>
`;

  fs.writeFileSync(path.join(outDir, `${id}.html`), html, 'utf8');
  console.log(`generated: share/${id}.html`);
}
