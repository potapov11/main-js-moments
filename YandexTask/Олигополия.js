const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];

rl.on('line', (input) => {
  lines.push(input.trim());

  // как только прочитали 2 строки — решаем задачу
  if (lines.length === 2) {
    const n = Number(lines[0]);
    const a = lines[1].split(' ').map(Number); // уже отсортированы

    const pref = new Array(n);
    pref[0] = a[0];
    for (let i = 1; i < n; i++) {
      pref[i] = pref[i - 1] + a[i];
    }

    const good = new Array(n).fill(0);
    good[n - 1] = 1;

    for (let i = n - 2; i >= 0; i--) {
      if (pref[i] >= a[i + 1] && good[i + 1] === 1) {
        good[i] = 1;
      } else {
        good[i] = 0;
      }
    }

    console.log(good.join('\n'));
    rl.close();
  }
});
