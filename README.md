# Deek-Prototyp – Tumac

Öppna `index.html` direkt, eller kör `npm start` och besök http://127.0.0.1:4173. Inga paket behöver installeras. Node används bara för den lokala förhandsvisningen och behövs inte på webbhotellet.

## Visa på GitHub Pages

Webbplatsen använder relativa filsökvägar och kan visas under projektadressen på GitHub Pages. `.nojekyll` gör att filerna publiceras som en vanlig statisk webbplats.

1. Öppna repots **Settings → Pages**.
2. Välj **Deploy from a branch** under **Build and deployment → Source**.
3. Välj grenen **main**, mappen **/ (root)** och klicka på **Save**.
4. När publiceringen är klar visas länken i samma vy. För det här repot är standardadressen https://happyhamster135.github.io/Deek-Prototyp/.

GitHub Pages från ett privat repo kräver en GitHub-plan som stöder det. För ett personligt gratiskonto behöver repot vara publikt. Repots synlighet ändras inte av denna konfiguration.

GitHubs dokumentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Prototypen har `noindex` för sökmotorer; det är inte ett åtkomstskydd. Kontaktflödet skapar bara ett e-postutkast.

## Vad fungerar?

- Responsiv startsida och mobilmeny.
- Katalog med nio produkt-/sortimentsposter, kategorifilter, fritextsökning och tomt resultat.
- Detaljdialoger med tillgängliga tekniska data och lokala PDF-dokument.
- Produktförfrågan som förifyller modell, validerar formuläret och skapar ett granskningsbart e-postutkast.
- Telefon- och e-postlänkar, tangentbordsstyrning, Escape och återställt fokus efter dialog.

Inget meddelande skickas automatiskt. Besökaren väljer att öppna sitt e-postprogram och skickar därifrån. Ingen databas, analysmätning eller extern teckensnittstjänst används. Formuläruppgifter stannar i den öppna sidans minne tills besökaren själv öppnar e-postlänken.

## Publicering på Loopia

Det här är statiska HTML/CSS/JavaScript-filer. De kan publiceras på ett vanligt webbhotell hos Loopia. `tumac-loopia-prototyp.zip` innehåller enbart webbplatsen och lokala resurser, inte utvecklingsservern eller designmaterialet.

1. Ta backup av den befintliga WordPress-webbplatsens filer och databas. Kontrollera vem som har åtkomst till domän, DNS och nuvarande webbhotell.
2. Skapa först en testadress i Loopia Kundzon, konfigurerad som **Hemsida hos Loopia**. Packa upp ZIP-filen lokalt.
3. Ladda upp `index.html`, `styles.css`, `products.js`, `app.js` och hela `assets`-mappen till testdomänens `public_html` via FTPS. Ladda upp innehållet, inte ZIP-filen.
4. Kontrollera HTTPS, mobilvy, PDF-länkar och e-postutkast på testadressen.
5. Låt Tumac godkänna sortiment, produktdata, texter, bilder och kontaktuppgifter. Uppgifterna på den gamla webbplatsen är delvis äldre och innehåller motstridiga specifikationer. Till exempel skiljer sig MP85-kapaciteten mellan startsidan och produktbladet; prototypen utelämnar därför kapacitetsvärdet.
6. För ett formulär som skickar direkt från webbplatsen behövs en serverdel med validering, skräppostskydd och konfigurerad e-postleverans. Det ingår inte i den här prototypen. Om företaget behöver redigera innehållet självt bör ett CMS väljas innan slutlig implementation.
7. Planera motsvarigheter till gamla produktadresser och 301-omdirigeringar så gamla länkar fortsätter fungera. Prototypens produktvyer är dialoger och har ännu inga egna indexerbara adresser.
8. Vid godkänd lansering: ta bort `noindex, nofollow` i HTML, lägg in korrekt kanonisk adress och webbplatskarta, publicera på rätt domän och kontrollera DNS/SSL. E-postens MX/TXT-poster måste bevaras eller migreras separat så företagets e-post fortsätter fungera. Ändra inte namnservrar utan att först kartlägga dessa poster.

Ingen anslutning till Loopia har gjorts. Ingen DNS, domän eller befintlig webbplats har ändrats. Telias tidigare roll har inte kunnat fastställas enbart från webbplatsen.

## Källor och filer

- Ursprunglig webbplats: https://www.tumac.se/
- Loopia, publiceringskatalog: https://support.loopia.se/wiki/hemsida-ej-synlig-efter-publicering/
- Loopia, FTPS och konto: https://support.loopia.se/wiki/ftp-klienter/
- Loopia, flytt av hemsida/e-post: https://support.loopia.se/wiki/flytta-hemsida-och-e-post-till-loopia/
- Produktkällor finns per post i `products.js` och länkas även i dialogerna.
- Originalbilder och PDF-dokument kopierade från tumac.se för kundprototypen. Rättigheter och aktuell användning behöver bekräftas av kunden före publicering.
- `assets/hero.png` är en AI-bearbetad presentationsbild med originalbilden av MP85 som referens. Verkstadsmiljön är illustrativ och dokumenterar inte Tumacs lokaler. Använd en godkänd originalfotografering på den skarpa webbplatsen om bilden ska utgöra produktdokumentation.
- Teckensnitt Barlow och Barlow Condensed lagras lokalt med respektive OFL-licens.
- Designkoncept, skärmbilder och visuell granskningsrapport finns i `design/`.

Prototyp skapad 2026-09-24.
