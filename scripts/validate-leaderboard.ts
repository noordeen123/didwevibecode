import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { HALL_DIR, findCaseDuplicates, validateEntry } from '../src/features/tokenmaxxer/leaderboardSchema';

const dir = join(process.cwd(), HALL_DIR);
const files = readdirSync(dir);
let failed = 0;

for (const duplicate of findCaseDuplicates(files)) {
  console.error(`${duplicate}: another entry already uses this handle (names are case-insensitive)`);
  failed++;
}

for (const file of files) {
  if (!file.endsWith('.json')) {
    console.error(`${file}: only .json files belong in ${HALL_DIR}`);
    failed++;
    continue;
  }
  let data: unknown;
  try {
    data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
  } catch {
    console.error(`${file}: not valid JSON`);
    failed++;
    continue;
  }
  const errors = validateEntry(data, basename(file, '.json'));
  for (const error of errors) console.error(`${file}: ${error}`);
  if (errors.length > 0) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} Hall of Tokenmaxxers file(s) failed the vibe check.`);
  process.exit(1);
}
console.log('Hall of Tokenmaxxers: vibe check passed.');
