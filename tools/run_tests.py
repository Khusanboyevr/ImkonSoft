import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()   # default settings, no autoplay flags
        pg = await b.new_page(viewport={'width':1280,'height':900})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://localhost:8000/test.html')
        await pg.wait_for_function('window.__RESULTS && window.__RESULTS.done', timeout=240000)
        r = await pg.evaluate('window.__RESULTS.items')
        for it in r: print('PASS' if it['ok'] else 'FAIL', it['name'], '|', it['note'])
        print(sum(i['ok'] for i in r), '/', len(r), 'errors:', errs)
        await pg.screenshot(path='tests.png', full_page=True)
        await b.close()
asyncio.run(main())
