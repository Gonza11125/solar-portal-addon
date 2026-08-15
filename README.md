# Solario Local for Home Assistant

Veřejný instalační repozitář pro **Solario Local**.

Aktuální stabilní verze: **0.6.35**  
Podporované architektury: **amd64** a **aarch64**

## Instalace

1. V Home Assistantu otevřete obchod s aplikacemi / add-ony a správu repozitářů.
2. Přidejte tento repozitář:
   `https://github.com/Gonza11125/solar-portal-addon`
3. Obnovte seznam aplikací a otevřete **Solario Local**.
4. Nainstalujte aplikaci, spusťte ji a otevřete Web UI přes Home Assistant Ingress.
5. Při prvním spuštění si bezpečně uložte vygenerovaný přístupový i obnovovací kód.

## Čeština / English

Solario Local 0.6.35 má dotažené české i anglické rozhraní včetně dashboardu, diagnostiky, automatizací, profilu, prvního spuštění, chybových stavů, dynamických hlášek a formátování data/času a měny. Přepnutí jazyka probíhá bez reloadu stránky.

Produkční build obsahuje přísnější i18n gate: kontrola už nepovažuje celý řádek za přeložený jen proto, že na něm našla jednu známou frázi. Každý nepokrytý český uživatelský text zastaví release build.

Názvy zařízení, entit a automatizací převzaté z Home Assistantu zůstávají beze změny, protože jsou pojmenované uživatelem.

## FREE

FREE obsahuje lokální přehled FVE, energetickou bilanci a diagnostiku, počasí a solární podmínky, historii maximálně 24 hodin a 1 vlastní Solario automatizaci. Existující Home Assistant `automation.*` lze zobrazit a používat bez čerpání tohoto jednoho Solario slotu. AI doporučení, obecný ruční editor/import zařízení a obecné ruční ovládání zařízení nejsou součástí FREE.

Energetické entity jsou standardně vyhledávány automaticky. Ruční pole v konfiguraci slouží pouze jako volitelné přepisy automatického výběru.

Od verze 0.6.35 se kalendářní denní a měsíční energie při chybějící raw historii obnovuje z Home Assistant Recorder statistik. Upgrade zároveň jednorázově znovu vytvoří pouze odvozené periodické trackery, aby starý chybný měsíční základ z předchozí verze nemohl zůstat zachovaný. Účet, konfigurace, přístupové kódy ani data Home Assistantu se tím nemažou.

## Distribuce

Tento repozitář obsahuje pouze Home Assistant release metadata a veřejnou dokumentaci. Aplikace je distribuována jako předem sestavený multi-arch image `ghcr.io/gonza11125/solario-local`.

Další informace: `https://solario.cloud`
