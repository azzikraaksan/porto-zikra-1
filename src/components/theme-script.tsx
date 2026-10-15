/**
 * Script blocking super kecil (< 400 byte) yang dijalankan sebelum paint pertama:
 * - menandai <html> dengan .js (dipakai untuk progressive enhancement scroll reveal)
 * - menerapkan tema dari localStorage / preferensi sistem
 * Hasilnya: tidak ada "flash" tema salah dan tidak perlu library tambahan.
 */
const script = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light'}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
