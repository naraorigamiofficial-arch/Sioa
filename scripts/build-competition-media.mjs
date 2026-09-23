import { mkdir, rm, writeFile, access } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectUrl = 'https://zbgvgzzaejaxrgcjjovc.supabase.co';
const publicKey = 'sb_publishable_gCLTB6WM95Iw6Txcf2fjCA_5fnXPw77';
const outputRoot = join(process.cwd(), 'assets', 'competition-media');
const tempRoot = join(process.cwd(), '.competition-media-cache');

function variantPath(path, variant) {
  return path.slice(0, -extname(path).length) + `.${variant}.webp`;
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function fetchSubmissions() {
  const response = await fetch(`${projectUrl}/rest/v1/submissions?select=submission_id,image_paths&order=created_at.desc`, {
    headers: { apikey: publicKey, Authorization: `Bearer ${publicKey}` }
  });
  if (!response.ok) throw new Error(`Submissions request failed: ${response.status}`);
  return response.json();
}

async function download(path, destination) {
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  const response = await fetch(`${projectUrl}/storage/v1/object/public/competition_media/${encoded}`);
  if (!response.ok) throw new Error(`Image request failed (${response.status}): ${path}`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

function convert(input, output, width, quality) {
  const result = spawnSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', input,
    '-vf', `scale='min(${width},iw)':-2`, '-c:v', 'libwebp',
    '-quality', String(quality), '-compression_level', '6', output
  ], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${input}`);
}

const submissions = await fetchSubmissions();
const paths = [...new Set(submissions.flatMap(item => item.image_paths || []))];
await mkdir(tempRoot, { recursive: true });

for (let index = 0; index < paths.length; index += 1) {
  const sourcePath = paths[index];
  const displayPath = join(outputRoot, variantPath(sourcePath, 'display'));
  const thumbPath = join(outputRoot, variantPath(sourcePath, 'thumb'));
  const needsDisplay = !(await exists(displayPath));
  const needsThumb = !(await exists(thumbPath));
  if (!needsDisplay && !needsThumb) continue;

  const tempPath = join(tempRoot, `${index}${extname(sourcePath) || '.jpg'}`);
  process.stdout.write(`[${index + 1}/${paths.length}] ${sourcePath}\n`);
  if (needsDisplay) await download(sourcePath, tempPath);
  await mkdir(dirname(displayPath), { recursive: true });
  if (needsDisplay) convert(tempPath, displayPath, 1600, 78);
  if (needsThumb) convert(needsDisplay ? tempPath : displayPath, thumbPath, 640, 70);
  await rm(tempPath, { force: true });
}

await rm(tempRoot, { recursive: true, force: true });
process.stdout.write(`Built display images and thumbnails for ${paths.length} files.\n`);
