import puppeteer from 'puppeteer-core'

const URL = process.env.URL || 'http://localhost:4321/'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })

const errors = []
page.on('pageerror', (err) => errors.push(String(err)))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})

await page.goto(URL, { waitUntil: 'load', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

const results = []

results.push(['título', await page.title()])
results.push(['banner hero visible', await page.$eval('#inicio h1', (el) => Boolean(el.textContent))])
results.push(['contador animado en hero', await page.$eval('[data-count]', (el) => el.textContent)])

const cotizarButtons = await page.$$('#hero [data-open-quote], header [data-open-quote]')
if (cotizarButtons[0]) {
  await cotizarButtons[0].click()
  await new Promise((r) => setTimeout(r, 800))
  results.push(['dialogo del cotizador abierto', Boolean(await page.$('[role="dialog"][aria-label="Cotizador de eventos"]'))])
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 300))
  results.push(['dialogo cerrado con Escape', !(await page.$('[role="dialog"][aria-label="Cotizador de eventos"]'))])
}

const detallesBtn = await page.$('#servicios button:has(svg)')
if (detallesBtn) {
  await detallesBtn.click()
  await new Promise((r) => setTimeout(r, 600))
  results.push(['modal de servicio abre', Boolean(await page.$('[role="dialog"][aria-label^="Detalles de"]'))])
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 300))
}

await page.evaluate(() => document.querySelector('#paquetes [data-open-quote]')?.click())
await new Promise((r) => setTimeout(r, 800))
results.push(['dialogo abre desde paquete', Boolean(await page.$('[role="dialog"][aria-label="Cotizador de eventos"]'))])
await page.evaluate(() => document.querySelector('[role="dialog"] [aria-label="Cerrar cotizador"]')?.click())
await new Promise((r) => setTimeout(r, 300))
results.push(['badge muestra 1', await page.evaluate(() => {
  const badge = document.querySelector('#quote-badge')
  return badge && !badge.hidden ? badge.textContent : 'oculto'
})])

await page.evaluate(() => {
  const btn = [...document.querySelectorAll('.testimonial')].find(() => false)
  void btn
  document.querySelector('#testimonial-next')?.click()
})
await new Promise((r) => setTimeout(r, 400))
results.push(['carrusel cambia de slide', await page.evaluate(() => {
  const slides = [...document.querySelectorAll('[data-slide]')]
  const visible = slides.findIndex((s) => s.classList.contains('block'))
  return visible
})])

await browser.close()

let failed = 0
for (const [name, value] of results) {
  console.log(`${String(value) === 'false' || value === 'oculto' || value === -1 || value === 0 ? 'FAIL' : 'ok  '} ${name}: ${value}`)
  if (String(value) === 'false' || value === 'oculto' || value === -1 || value === 0) failed++
}
if (errors.length) {
  failed++
  console.log('ERRORES DE CONSOLA:', errors.slice(0, 5).join('\n'))
}
console.log(failed === 0 ? '\nLISTO: sin fallos funcionando' : `\n${failed} fallo(s)`)
process.exit(failed === 0 ? 0 : 1)