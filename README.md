# Solario Local for Home Assistant

Veřejný instalační repozitář pro **Solario Local**.

Aktuální stabilní verze: **0.6.33**  
Podporované architektury: **amd64** a **aarch64**

## Instalace

1. V Home Assistantu otevřete obchod s aplikacemi / add-ony a správu repozitářů.
2. Přidejte tento repozitář:
   `https://github.com/Gonza11125/solar-portal-addon`
3. Obnovte seznam aplikací a otevřete **Solario Local**.
4. Nainstalujte aplikaci, spusťte ji a otevřete Web UI přes Home Assistant Ingress.
5. Při prvním spuštění si bezpečně uložte vygenerovaný přístupový i obnovovací kód.

## Čeština / English

Solario Local 0.6.33 má dotažené české i anglické rozhraní včetně dashboardu, diagnostiky, automatizací, profilu, prvního spuštění a chybových stavů. Produkční build obsahuje automatický překladový gate, který nepustí nový český uživatelský text bez anglického pokrytí.

Názvy zařízení, entit a automatizací převzaté z Home Assistantu zůstávají beze změny, protože jsou pojmenované uživatelem.

## FREE

FREE obsahuje lokální přehled FVE, energetickou bilanci a diagnostiku, počasí a solární podmínky, historii maximálně 24 hodin a 1 vlastní Solario automatizaci. Existující Home Assistant `automation.*` lze zobrazit a používat bez čerpání tohoto jednoho Solario slotu. AI doporučení, obecný ruční editor/import zařízení a obecné ruční ovládání zařízení nejsou součástí FREE.

Energetické entity jsou standardně vyhledávány automaticky. Ruční pole v konfiguraci slouží pouze jako volitelné přepisy automatického výběru.

## Distribuce

Tento repozitář obsahuje pouze Home Assistant release metadata a veřejnou dokumentaci. Aplikace je distribuována jako předem sestavený multi-arch image `ghcr.io/gonza11125/solario-local`.

Další informace: `https://solario.cloud`
