# Changelog

## [0.6.35] - 2026-08-15

- opraven zdroj měsíční úspory: kalendářní denní a měsíční energie se při chybějící raw historii umí obnovit z Home Assistant Recorder statistik
- upgrade jednorázově znovu vytvoří pouze odvozené periodické trackery, takže chybný měsíční základ z 0.6.34 nemůže zůstat zachovaný; účet, konfigurace, přístupové kódy ani Home Assistant data se nemažou
- doplněny regresní testy pro obnovu měsíčního základu z Recorderu, prioritu skutečné historie a bezpečné odmítnutí neplatné změny
- dotažené obousměrné přepínání čeština ↔ angličtina na dashboardu, v diagnostice, automatizacích, profilu, dynamických hláškách, e-mailových odkazech a backendových chybách
- anglická verze používá CZK a anglické formátování data/času; česká verze se při přepnutí vrací zpět na Kč a české formátování
- opraveny zbývající legacy popisky jako `Solar self-use` a `Local import`, aby se korektně překládaly i zpět do češtiny
- zpřísněn i18n release gate: jedna přeložená fráze už nemůže skrýt jiný nepřeložený text na stejném řádku
- finální audit hlásí `I18N_UNCOVERED_TOTAL=0`; prošlo 19/19 agent testů, 113/113 backend testů, produkční frontend build i kompletní Home Assistant image smoke
- amd64, aarch64 i multi-arch image 0.6.35 byly úspěšně publikovány

## [0.6.34] - 2026-08-15

- opravena měsíční úspora: hodnota za měsíc se už nikdy nenahrazuje dnešní úsporou
- přehled úspor respektuje příznak spolehlivosti měsíčního výpočtu; pokud přesný měsíční základ chybí, zobrazí se `—` místo zavádějící částky
- stejná kontrola byla doplněna do energetické diagnostiky
- opraveny zbývající drobné české názvy a překlepy (`Síť`, `silnější`, `znamenají`, `čerstvá`)
- finální Home Assistant image validace i publikování amd64, aarch64 a multi-arch image proběhly úspěšně

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
