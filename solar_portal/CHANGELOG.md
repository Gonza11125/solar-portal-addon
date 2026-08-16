# Changelog

## [0.6.37] - 2026-08-16

- doplněna explicitní kompatibilita pro standardní entity Deye / Sunsynk / Sol-Ark vytvořené Home Assistant integrací Solarman
- automaticky se mapuje aktuální výkon, výroba FVE, odběr ze sítě, přetoky, spotřeba domu, SOC a napětí baterie a výkon PV1–PV4
- pokud jsou dostupné kumulativní čítače, mají přednost před denními senzory, aby Solario mohlo přes Home Assistant Recorder přesně odvodit dnešní i měsíční hodnoty
- Solarman mapping se aktivuje až po rozpoznání více typických entit se stejným prefixem; náhodný senzor typu `*_total_power` se proto automaticky nepovažuje za FVE
- pokud je v Home Assistantu více Solarman/Deye zařízení se stejnými suffixy, automatika raději mapping přeskočí než aby vybrala špatný měnič
- doplněny regresní testy pro běžný Deye naming, vlastní prefix `solarman_`, fallback na denní čítače, ochranu proti falešné shodě a více zařízení
- dokumentace nově výslovně vysvětluje, že Solario se nepřipojuje přímo k měniči/loggeru, ale čte entity, které už existují v Home Assistantu
- finální backend validace, Home Assistant image/restart/persistence smoke test i publikace amd64, aarch64 a multi-arch image proběhly úspěšně

## [0.6.36] - 2026-08-15

- opravena chyba 0.6.35, kdy při prvním nedostupném výpočtu z Home Assistant Recorderu mohl agent uložit aktuální kumulativní čítač jako začátek období a následně držet falešnou měsíční nulu
- nedostupný denní nebo měsíční baseline se nyní neukládá; příslušná perioda zůstane dočasně nedostupná a další sběr ji automaticky zkusí znovu
- denní a měsíční výpočet jsou nezávislé, takže chybějící měsíční podklad neblokuje platnou dnešní energii
- backend označí měsíční úsporu jako spolehlivou pouze tehdy, když aktuální data skutečně obsahují měsíční výrobu
- upgrade z 0.6.35 jednorázově obnoví pouze odvozené periodické trackery; účet, konfigurace, kódy, automatizace ani Home Assistant data se nemažou
- opraven runtime mix CZ/EN v diagnostice panelů způsobený příliš obecným fragmentem `je` → `is`; diagnostické věty se překládají jako celé významové celky
- i18n release gate nově kontroluje i runtime ochranu proti nebezpečným globálním gramatickým fragmentům
- regresní test reprodukuje přesný stav: první měsíční Recorder lookup není dostupný → nevznikne month tracker ani falešná nula → další lookup uspěje → měsíční hodnota se vytvoří
- finální validace: 20/20 agent testů, 115/115 backend testů, 832 sledovaných českých frází, 0 nepokrytých textů, produkční frontend build a kompletní Home Assistant restart/persistence smoke úspěšné
- amd64, aarch64 i multi-arch image 0.6.36 byly úspěšně publikovány

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