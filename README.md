# Solario Local for Home Assistant

Veřejný instalační repozitář pro **Solario Local**.

Aktuální stabilní verze: **0.6.36**  
Podporované architektury: **amd64** a **aarch64**

## Instalace

1. V Home Assistantu otevřete obchod s aplikacemi / add-ony a správu repozitářů.
2. Přidejte tento repozitář:
   `https://github.com/Gonza11125/solar-portal-addon`
3. Obnovte seznam aplikací a otevřete **Solario Local**.
4. Nainstalujte aplikaci, spusťte ji a otevřete Web UI přes Home Assistant Ingress.
5. Při prvním spuštění si bezpečně uložte vygenerovaný přístupový i obnovovací kód.

## Čeština / English

Solario Local podporuje české i anglické rozhraní včetně dashboardu, diagnostiky, automatizací, profilu, prvního spuštění, chybových stavů, dynamických hlášek a formátování data, času a měny. Přepnutí jazyka probíhá bez reloadu stránky.

Verze 0.6.36 opravuje runtime mix češtiny a angličtiny v diagnostice panelů. Příčinou byl příliš obecný fragmentový překlad `je` → `is`, který mohl zasáhnout celou českou větu dříve, než se použil její přesný překlad. Produkční i18n gate nyní kromě nepokrytých českých textů kontroluje i tuto třídu nebezpečných globálních gramatických fragmentů.

Názvy zařízení, entit a automatizací převzaté z Home Assistantu zůstávají beze změny, protože jsou pojmenované uživatelem.

## FREE

FREE obsahuje lokální přehled FVE, energetickou bilanci a diagnostiku, počasí a solární podmínky, historii maximálně 24 hodin a 1 vlastní Solario automatizaci. Existující Home Assistant `automation.*` lze zobrazit a používat bez čerpání tohoto jednoho Solario slotu. AI doporučení, obecný ruční editor/import zařízení a obecné ruční ovládání zařízení nejsou součástí FREE.

Energetické entity jsou standardně vyhledávány automaticky. Ruční pole v konfiguraci slouží pouze jako volitelné přepisy automatického výběru.

### Denní a měsíční energie

Kumulativní čítače se převádějí na kalendářní denní a měsíční hodnoty pomocí Home Assistant Recorderu. Verze 0.6.36 opravuje stav, kdy mohl první neúspěšný pokus o načtení měsíčního základu uložit aktuální kumulativní hodnotu jako začátek měsíce a následně držet falešnou měsíční nulu.

Pokud při některém sběru Home Assistant Recorder neposkytne důvěryhodný začátek období, Solario už žádný falešný baseline neuloží. Příslušná perioda zůstane dočasně nedostupná a při dalším sběru se automaticky zkusí znovu. Denní a měsíční výpočet jsou nezávislé, takže chybějící měsíční podklad neblokuje platnou dnešní hodnotu.

Při upgradu z 0.6.35 se jednorázově znovu vytvoří pouze odvozené periodické trackery. Účet, konfigurace, přístupové a obnovovací kódy, automatizace ani data Home Assistantu se tím nemažou.

## Distribuce

Tento repozitář obsahuje pouze Home Assistant release metadata a veřejnou dokumentaci. Aplikace je distribuována jako předem sestavený multi-arch image `ghcr.io/gonza11125/solario-local`.

Další informace: `https://solario.cloud`