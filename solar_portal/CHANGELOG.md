# Changelog

## [0.6.32] - 2026-08-15

- opraven korektní downgrade cloudového entitlementu z SMART/PRO na FREE, aby lokální instalace nemohla držet stará placená oprávnění
- aktuální ozáření je po západu Slunce vždy 0 W/m² i při stale kladné hodnotě fyzického senzoru
- doplněny regresní testy pro oba případy
- aktualizována veřejná instalační a konfigurační dokumentace pro FREE release

## [0.6.31] - 2026-08-15

- opraven první restart nové instalace, který mohl zneplatnit právě vytvořený přístupový kód
- doplněny přesné, jednotkami kontrolované Alpha ESS aliasy pro aktuální výrobu, kumulativní výrobu, import/export sítě, spotřebu domu, SOC a napětí baterie
- ukládání konfigurace agenta zachovává jeho identitu a další provisionované hodnoty
- Supervisor token se nezapisuje do persistentní konfigurace agenta

## [0.6.30] - 2026-08-15

- posílena izolace webového backendu a Home Assistant sběrného agenta
- doplněna kontrola čerstvosti telemetrie a offline stavu
- tarifní omezení historie, automatizací a příkazů jsou kontrolována serverově
- automatizace nad tarifní limit se nemažou, ale bezpečně uzamknou/pozastaví
- zpřísněna oprávnění persistentních souborů a automatických záloh
