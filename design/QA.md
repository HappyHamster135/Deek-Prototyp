# Visuell och funktionell granskning

Genomförd 2026-09-24 i Codex inbyggda Chromium-webbläsare. Inget externt Playwright behövdes. För skarpa skärmbilder användes webbläsarens CDP-funktion med explicit klippområde, eftersom den vanliga IAB-skärmbilden skalades fel.

## Designjämförelse

Koncept: `01-startsida.png`, `02-katalog.png`. Implementation: `desktop.png`, `catalog.png`, `mobile.png`. Koncept och webbläsarskärmbilder öppnades med `view_image` för direkt jämförelse. Desktop granskades vid konceptets ursprungliga 1536 × 1024, mobil vid 390 × 844.

Granskade punkter:

1. Hero: två kolumner, tydlig rubrik till vänster och stor produktbild till höger. Rubrikstorleken ökades efter första jämförelsen.
2. Färger: varmvit bakgrund, mörk text, gula primärknappar och mörkgrönt kontaktband följer konceptet.
3. Typografi: Barlow/Barlow Condensed ger motsvarande tät industriell rubrikstil. Katalogrubriker och filter förstorades vid granskningen.
4. Navigation: varumärke, tre menyposter och kontaktknapp; anpassad mobilmeny utan horisontellt sidöverflöde.
5. Katalog: tre öppna produktkolumner, vita bildytor, filter, sökfält och cirkulära pilar. Sökningen har både träff- och tomt läge.
6. Service/sidfot: mörkgrönt kontaktband, gula kontaktknappen, telefonlänk och kompakt sidfot. En CSS-regel som först gjorde sidfotens logotyp för stor rättades.
7. Text ovanför vikningen: rubrik, ingress, navigationsposter, knappar och bildtext överensstämmer med designriktningen. Inga extra påståenden eller statistik har lagts till.

Designriktningens struktur, färger, typografi och interaktionsmönster har verifierats troget mot koncepten. Det är inte en pixelidentisk kopia av de genererade bilderna: originalfoton används i katalogen för korrekt produktidentitet, huvudbilden har bearbetats från den riktiga MP85-bilden, produkttexter har faktabaserats, och resultatantal/visa-fler-raden har lagts till för en fungerande katalog. Katalogen blir därför längre än konceptbilden. Dessa avsiktliga avvikelser är dokumenterade; inga kända klippningar eller andra blockerande layoutfel kvarstår i de granskade storlekarna.

## Genomförda interaktioner

- Startsida → utforska produkter → katalog.
- Alla → hissar: 3 träffar. Sökning P18: 1 träff. Tillbehör: 1 träff.
- Visa alla: 9 poster. Sökning utan träff visar tomt läge; återställning visar starturvalet.
- P18 → detaljdialog med tekniska data och PDF-länk → produktförfrågan med P18 förifyllt.
- Formuläret skapar granskningsbart mailto-utkast med korrekt URL-kodning och rätt mottagare. Inget skickades och e-postprogrammet öppnades inte.
- Tomt formulär stoppas av validering (3 obligatoriska fält). Giltigt formulär visar utkast; Ändra uppgifter återställer formulärvyn med text kvar.
- Mobilmenyn öppnar/stänger och stängs efter navigering. Mobilens reservdelsdialog ryms inom skärmen (366 px på 390 px viewport).
- Escape stänger dialogen. Sidans scrollås släpps när dialogen stängs.
- Inga upptäckta trasiga bilder eller relevanta konsolfel. Alla sex lokala dokument har giltigt PDF-filhuvud. Lokala JS-filer klarar `npm run check`.

## Begränsningar

Testat i inbyggd Chromium; inte i Safari/Firefox eller på fysisk mobil. Ingen verklig e-postleverans eller Loopia-publicering har testats. Katalogen är ett urval och produktdata är inte kundgodkända. Ingen redigeringspanel, fullständig migrering eller serverbaserad formulärhantering ingår.
