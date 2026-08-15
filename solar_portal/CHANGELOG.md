# Changelog

## [0.6.33] - 2026-08-15

- dokončen audit českého a anglického rozhraní v dashboardu, diagnostice, automatizacích, profilu, prvním spuštění a bezpečnostních stavech
- doplněny anglické fallbacky pro uživatelské chybové odpovědi backendu a předvyplněné e-mailové odkazy
- produkční build nyní obsahuje automatický i18n gate; nový český UI text bez anglického pokrytí zastaví sestavení image
- finální audit sleduje 761 českých překladových frází a hlásí 0 nepokrytých frontend/backend-response textů
- z veřejného JavaScript bundle odstraněny staré instalačně specifické Shelly aliasy/ID; používají se názvy z Home Assistantu nebo uživatelské aliasy
- image validace a publikování amd64, aarch64 i multi-arch manifestu proběhly úspěšně

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
