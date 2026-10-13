# Solario Home pro Home Assistant

Aktuální stabilní verze: **0.7.61** · podporované architektury: **amd64** a **aarch64**

[![Přidat repozitář Solario Home do Home Assistantu](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGonza11125%2Fsolar-portal-addon)

Solario Home je lokální Home Assistant aplikace pro přehled fotovoltaiky, energetickou bilanci, diagnostiku a bezpečné automatizace. Výchozí přístup běží přes zabezpečený Home Assistant Ingress; přímý LAN port 3000 je volitelný a ve výchozím stavu není publikovaný.

## Co přináší 0.7.43 až 0.7.61

- **graf „Dnešní den“ už neztrácí spotřebu domu**: modrá čára spotřeby už nemá díry, když denní počítadlo po zaokrouhlení poskočí zpět, a u senzoru spotřeby, který se během dne nuluje, se spotřeba spočítá z okamžitých výkonů (výroba + síť − nabíjení baterie) stejně jako v Solario Cloud; Kontrola domu je ve Smart a Pro i na webu Solario Cloud,
- **Kontrola domu v záložce Automatizace, i v Local zdarma**: co Home Assistant v domě má (garáž, brány, zámky a alarm vynechá), kolik za posledních 30 dní odteklo do sítě a kolik by to doma ušetřilo, a u bojleru, tepelného čerpadla, auta, pračky a myčky, baterie, bazénu a rolet, jestli jde automatizace nastavit hned, co chybí, co pořídit a co Solario zvládne do té doby; výsledek jde s vaším souhlasem přiložit k žádosti o automatizaci; kontrola nic nezapíná,
- **tarif Local je zdarma napořád**: živý přehled, graf dnešního dne, úspora za posledních 7 dní, stav systému, vestavěná upozornění a aktualizace bez platby a bez karty; týden a měsíc historie, ovládání, Solario Cloud a osobní podpora jsou ve Smart (249 Kč) a Pro (499 Kč), které jde 14 dní zkoušet zdarma; doplněk už nikdy nevypíná aktualizace,
- **data se po výpadku nebo aktualizaci zase dostanou do Solario Cloud**: data, která doplněk nemohl odeslat déle než 5 minut, už neblokují odesílání nových,
- **bezpečnější ovládání a čitelnější vzhled**: vlastní automatizace z Home Assistantu jde z aplikace a z webu ovládat jen tehdy, když řídí rolety, světla, spotřebiče, topení nebo upozornění; vrata, zámky, alarmy, skripty a scény zůstávají jen v Home Assistantu; „Spustit teď“ zachová podmínky automatizace; záloha v /share neobsahuje tajné klíče; lépe čitelné texty, opravený tmavý režim, rozložení pro notebook v Home Assistantu i telefon, jednotné barvy toků energie a dnešní úspora v Kč přímo v obrázku domu,
- **užitečnější graf „Dnešní den“**: souhrn dne (vyrobeno, spotřeba domu, odteklo do sítě, využito automatizacemi), spotřeba a přetok do sítě v grafu, kdy se spustily ostatní automatizace a detail každé půlhodiny po najetí myší; v řádcích jen spotřebiče, ne rolety,
- **všechny automatizace domu a panel Ovládání**: záložka Automatizace ukazuje i vaše vlastní automatizace z Home Assistantu (rolety, světla, topení, upozornění) s tím, kdy se spouští a co ovládají, jdou zapnout, vypnout, spustit nebo na dnes vynechat; nový panel Ovládání se všemi roletami (vytáhnout, zastavit, zatáhnout, poloha) a zařízeními, která automatizace řídí (bojler, wallbox, světla, cílová teplota topení); barevnější vzhled; ovládání ve Smart a Pro, v Local vše vidět bez ovládání,
- **nová záložka Automatizace**: co bojler, auto a spotřebiče právě dělají ze slunce, kolik automatizace tento měsíc ušetřily (z naměřené energie, odhady podle štítku jsou označené), dnešní běhy nad výrobou a deník; tlačítka Spustit hned, Dnes vynechat, Pozastavit na dnes a Dovolená a nastavení, která zpřístupní tým Solario; ve Smart a Pro stejná záložka i v Solario Cloud,
- **výroba a odběr ze sítě už nemohou ukazovat stejné číslo**: jeden senzor z Home Assistantu se použije jen pro jednu veličinu, takže počítadlo elektroměru se už nezapočítá zároveň jako výroba FVE; bezpečnostní aktualizace knihoven webového serveru,
- **přihlášení přes adresu v síti funguje vždy**, i přes název počítače (např. `http://homeassistant.local:3000`), nejen přes číselnou adresu,
- **předplatné podle běžných pravidel**: vyšší tarif platí hned, nižší tarif a zrušení až od konce zaplaceného období; po skončení předplatného běží doplněk jako Local zdarma a po zaplacení se vše hned obnoví (platí až po spuštění plateb v Solario Cloud),
- **žádost o automatizaci dojde vždy**, i z tarifu Local bez propojení se Solario Cloud; dosud čekající žádosti se po aktualizaci odešlou samy,
- **jedno logo Solario** (S se sluncem) v aplikaci, v obchodě doplňků i v záložce prohlížeče; doplněk se v Home Assistantu jmenuje **Solario Home**,
- **tarif si volí každý sám**, i se Solar Boxem; tam, kde aplikace odkazovala na správce fotovoltaiky, uvádí teď tým Solario,
- **kód na tarif** od Solaria se zadává v Profilu v kartě „Máte kód na tarif?“,
- **tlačítko Podpora** v horní liště s e-mailem a telefonem na Solario; všude jedna adresa info@solario.cloud,
- žádost o automatizaci na míru chce e-mail a telefon, aby se vám tým Solario mohl ozvat,
- živé hodnoty v Solario Cloud, baterie s obráceným znaménkem rozpoznaná z měření a spotřeba dopočítaná z denní energie měniče,
- v Profilu se údaje o tarifu nepřekrývají s fotografií.

Podrobnosti jsou v [changelogu](solar_portal/CHANGELOG.md).

## Instalace

1. V Home Assistantu přidejte repozitář `https://github.com/Gonza11125/solar-portal-addon`.
2. Nainstalujte **Solario Home** a spusťte jej.
3. Otevřete Web UI přímo z Home Assistantu přes Ingress.
4. Při prvním otevření vygenerujte přístupový i obnovovací kód a oba bezpečně uložte.
5. Po prvním přihlášení zvolte typ instalace: **vlastní Home Assistant** nebo **Solario Solar Box**. Volba se po prvním nastavení bezpečnostně uzamkne.

Vestavěný lokální agent se s Home Assistantem propojuje automaticky přes `homeassistant_api`. Pro lokální instalaci se negeneruje žádný párovací kód agenta a není potřeba přidávat další integraci.

## Čeština a angličtina

Rozhraní Solario Local je dostupné v češtině i angličtině. Verze 0.6.33 rozšiřuje jazykové pokrytí i na diagnostiku, automatizace, profil, první spuštění, QR/passkey stavy, chybové odpovědi backendu a předvyplněné e-mailové odkazy. Produkční build obsahuje automatický i18n audit, který vydání zastaví, pokud se do uživatelského rozhraní dostane nový český text bez anglického pokrytí.

Názvy entit a zařízení převzaté přímo z Home Assistantu zůstávají uživatelskými názvy a Solario je svévolně nepřekládá.

## Tarif Local

Local je zdarma napořád: bez platby, bez karty a bez zkušební doby. Interně se plán
jmenuje `free`.

- živý přehled výroby, spotřeby, baterie a sítě a tok energie,
- graf dnešního dne,
- úspora v korunách za posledních 7 dní,
- aktuální stav systému, diagnostika zdrojových entit a vestavěná upozornění v aplikaci,
- počasí a aktuální solární podmínky,
- automatizace z Home Assistantu jsou vidět, ovládají se ve Smart a Pro,
- aktualizace; běží celé u vás doma a měření neodcházejí do cloudu.

Týden a měsíc historie, detailní ekonomika, ovládání, Solario Cloud, upozornění na telefon, automatizace na míru
a osobní podpora jsou v tarifech **Smart (249 Kč měsíčně)** a **Pro (499 Kč měsíčně)**. Ty jde 14 dní zkoušet
zdarma. Historie se ukládá na všech tarifech stejně, takže po přechodu jsou starší dny hned vidět.

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

