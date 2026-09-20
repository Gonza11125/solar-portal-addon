# Solario Local pro Home Assistant

Aktuální stabilní verze: **0.7.20** · podporované architektury: **amd64** a **aarch64**

[![Přidat repozitář Solario Local do Home Assistantu](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGonza11125%2Fsolar-portal-addon)

Solario Local je lokální Home Assistant aplikace pro přehled fotovoltaiky, energetickou bilanci, diagnostiku a bezpečné automatizace. Výchozí přístup běží přes zabezpečený Home Assistant Ingress; přímý LAN port 3000 je volitelný a ve výchozím stavu není publikovaný.

## Co přináší 0.7.20

- opravené rozložení Přehledu, Grafů a Zdraví FVE na počítači i mobilu,
- odstraněné duplicitní nabídky a tlačítko vložené v obrázku,
- správné jednotky diagnostických metrik a méně falešných chyb volitelných senzorů,
- opravený rychlý test, vykreslení baterie a sítě a obnovování historie,
- základní ekonomika s odděleným odhadem úspory a výkupu a s vysvětlením omezení výpočtu.

## Instalace

1. V Home Assistantu přidejte repozitář `https://github.com/Gonza11125/solar-portal-addon`.
2. Nainstalujte **Solario Local** a spusťte jej.
3. Otevřete Web UI přímo z Home Assistantu přes Ingress.
4. Při prvním otevření vygenerujte přístupový i obnovovací kód a oba bezpečně uložte.
5. Po prvním přihlášení zvolte typ instalace: **vlastní Home Assistant** nebo **Solario Solar Box**. Volba se po prvním nastavení bezpečnostně uzamkne.

Vestavěný lokální agent se s Home Assistantem propojuje automaticky přes `homeassistant_api`. Pro lokální instalaci se negeneruje žádný párovací kód agenta a není potřeba přidávat další integraci.

## Čeština a angličtina

Rozhraní Solario Local je dostupné v češtině i angličtině. Verze 0.6.33 rozšiřuje jazykové pokrytí i na diagnostiku, automatizace, profil, první spuštění, QR/passkey stavy, chybové odpovědi backendu a předvyplněné e-mailové odkazy. Produkční build obsahuje automatický i18n audit, který vydání zastaví, pokud se do uživatelského rozhraní dostane nový český text bez anglického pokrytí.

Názvy entit a zařízení převzaté přímo z Home Assistantu zůstávají uživatelskými názvy a Solario je svévolně nepřekládá.

## Tarif Local

Local je plnohodnotný lokální základ pro vlastní Home Assistant. Interně se plán
stále jmenuje `free`; obchodně je to **Local za 99 Kč měsíčně**.

- přehled aktuální výroby, baterie a energetické bilance,
- dnešní, měsíční a celkové energetické hodnoty, pokud pro ně Home Assistant poskytuje potřebná data,
- úspora z fotovoltaiky dnes, tento měsíc a celkem, včetně energie, ze které se počítá,
- lokální diagnostika zdrojových entit a jejich kvality, na které staví Zařízení i Zdraví FVE,
- upozornění s měsíční historií (baterie, přetok, výpadek zdroje dat, FVE bez výroby za světla),
- počasí a aktuální solární podmínky,
- grafy s historií maximálně 24 hodin; měsíční a celkové součty se berou z čítačů Home Assistantu,
- 1 vlastní Solario automatizace,
- existující `automation.*` z Home Assistantu lze zobrazit a přidat do Solaria bez čerpání limitu vlastní Solario automatizace,
- AI doporučení nejsou v Localu aktivní,
- ruční editor/import zařízení, obecné ruční ovládání zařízení a vlastní období od–do v grafech jsou funkce tarifu PRO.

Automatické zálohy se ukládají do `/data/backups` a kopie do `/share/solario/backups`,
odkud je lze vytáhnout přes File editor, Sambu nebo Terminal.

Tarifní limity jsou kontrolované i na backendu; nejde jen o skrytí tlačítek ve webovém rozhraní.

## Senzory a automatické mapování

Ruční pole entit v konfiguraci add-onu jsou volitelné přepisy. Pokud je necháte prázdná, Solario bezpečně hledá vhodné zdroje podle ID entity, názvu, jednotky, `device_class` a `state_class`.

Pro běžné Alpha ESS entity jsou navíc podporované přesné aliasy pro:

- aktuální výkon FVE,
- celkovou výrobu FVE,
- celkový odběr ze sítě,
- celkové přetoky do sítě,
- spotřebu domu,
- stav baterie,
- napětí baterie.

Kumulativní energetické čítače se pomocí Home Assistant Recorderu převádějí na hodnoty za dnešek a aktuální měsíc. Pokud přesný výpočet není možný, Solario hodnotu raději označí jako nedostupnou nebo nespolehlivou, než aby ji odhadovalo jako přesnou.

## Úspora FVE

Úspora vychází z ceny elektřiny a z energie FVE skutečně spotřebované doma. Pokud jsou k dispozici výroba a přetoky, podklad odhadu se počítá jako výroba minus přetoky. U instalace s baterií může zahrnovat energii dosud uloženou v baterii a ztráty, proto se výsledek označuje jako orientační odhad. Dnešní odhad respektuje průběžné přepínání HDO, pokud je nastavené. Měsíční a celková hodnota používají aktuální základní cenu, protože pro ně Local nemá historickou cenovou knihu. Výkup se počítá odděleně pouze při nastavené ceně výkupu a dostupném měření přetoků.

Aktuální ozáření je při záporné nebo nulové výšce Slunce vždy 0 W/m², i pokud Home Assistant senzor po západu krátce drží starou kladnou hodnotu.

## Bezpečnost a síť

- backend běží pouze na `127.0.0.1:5000`,
- PostgreSQL není publikovaný do sítě,
- Home Assistant Ingress je výchozí způsob přístupu,
- volitelný LAN port 3000 přijímá pouze privátní/lokální adresy,
- Supervisor token dostává pouze sběrný agent a nezapisuje se do `/data/agent-config.json`,
- webový backend a agent běží pod oddělenými neprivilegovanými účty,
- aplikační tajné klíče se generují lokálně a ukládají s omezenými právy,
- kritický výpadek interní služby ukončí add-on, aby jej Home Assistant mohl znovu spustit místo ponechání částečně funkčního stavu.

## Přístup, restart a zálohy

Přístupový a obnovovací kód se při první registraci zobrazí pouze jednou. Obnovovací kód při použití vytvoří novou dvojici a zneplatní starý přístup. Přístupové údaje i nastavení zůstávají v persistentním `/data` a běžný restart add-onu nevyžaduje novou registraci.

Add-on vytváří automatické lokální zálohy persistentních dat. Při aktualizaci nebo restartu se zachovávají mapování entit, identita vestavěného agenta, nastavení i energetické trackery.

## Podporované platformy

Předpřipravený image je publikovaný pro:

- `amd64`
- `aarch64`

Další informace a placené tarify jsou dostupné na `https://solario.cloud`.

