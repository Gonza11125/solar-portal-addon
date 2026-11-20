# Solario Home

Solario Home je lokální Home Assistant aplikace pro přehled fotovoltaiky, energetickou bilanci, diagnostiku a bezpečné automatizace. Výchozí přístup běží přes zabezpečený Home Assistant Ingress; přímý LAN port 3000 je volitelný a ve výchozím stavu není publikovaný.

## Instalace

1. V Home Assistantu přidejte repozitář `https://github.com/Gonza11125/solar-portal-addon`.
2. Nainstalujte **Solario Home** a spusťte jej.
3. Otevřete Web UI přímo z Home Assistantu přes Ingress.
4. Při prvním otevření vygenerujte přístupový i obnovovací kód a oba bezpečně uložte.
5. Po prvním přihlášení zvolte typ instalace: **vlastní Home Assistant** nebo **Solario Solar Box**. Volba se po prvním nastavení bezpečnostně uzamkne.

Vestavěný lokální agent se s Home Assistantem propojuje automaticky přes `homeassistant_api`. Pro lokální instalaci se negeneruje žádný párovací kód agenta a není potřeba přidávat další integraci.

## Čeština a angličtina

Rozhraní Solario Home je dostupné v češtině i angličtině. Verze 0.6.33 rozšiřuje jazykové pokrytí i na diagnostiku, automatizace, profil, první spuštění, QR/passkey stavy, chybové odpovědi backendu a předvyplněné e-mailové odkazy. Produkční build obsahuje automatický i18n audit, který vydání zastaví, pokud se do uživatelského rozhraní dostane nový český text bez anglického pokrytí.

Názvy entit a zařízení převzaté přímo z Home Assistantu zůstávají uživatelskými názvy a Solario je svévolně nepřekládá.

## Tarify Local, Smart a Pro

Tarify jsou vynucené na backendu a všechny obrazovky čtou stejnou capability matici. Předplatné jsou **Local 99 Kč/měsíc, Smart 249 Kč/měsíc a Pro 499 Kč/měsíc** (od 0.7.62). Bez předplatného se nic nezablokuje: add-on běží dál s funkcemi Localu, jen bez podpory a aktualizací.

- **Local (99 Kč/měsíc)**: živý přehled a tok energie, graf dnešního dne, úspora v korunách za posledních 7 dní, aktuální Stav systému, pevná vestavěná upozornění, Kontrola domu (co Home Assistant má a které automatizace půjdou nastavit), osobní podpora a aktualizace. Automatizace z Home Assistantu jsou vidět bez ovládání; automatizace na míru jsou ve Smart a Pro.
- **Smart**: vše z Local, týden a měsíc historie, detailní ekonomika, osobní podpora, 30denní historie Stavu systému, nastavitelné vestavěné prahy, vzdálený přístup a push přes propojený Solario Cloud, **1 automatizace v ceně**.
- **Pro**: vše ze Smart, rok a vlastní období, dlouhodobá ekonomika a návratnost pouze z doloženého 365denního podkladu, vlastní pravidla upozornění, servisní report, **3 automatizace v ceně**, editor zařízení pro vlastní Home Assistant, roční kalendář energie se srovnáním měsíců proti loňsku, CSV/PDF a webhooky.

Historie se ukládá stejně na všech tarifech; tarif určuje jen, jak daleko zpět je vidět. Local proto od prvního dne ukazuje, kolik dní už add-on uložil a že je Smart nebo Pro zpřístupní hned po přechodu. Čtrnáctidenní zkušební doba Smart nebo Pro se nabízí jen tehdy, když jsou placené tarify zapnuté (`paid_upgrades_enabled`). Local zkušební dobu nemá, rovnou se předplatí; přechod ze Smart nebo Pro na Local platí od konce zaplaceného období.

Downgrade placená nastavení nemaže. Funkce, na které nový tarif nemá nárok, se přestanou vykonávat nebo upravovat; při opětovném upgradu se uložené nastavení znovu zpřístupní.

Podrobná historie se fyzicky drží po pětiminutových bodech maximálně 30 dní a ukládá se po jednom souboru za den. Delší období používají hodinové a denní agregace, aby add-on nepřepisoval velký soubor na SD kartě při každém měření.

Automatické zálohy se ukládají do `/data/backups` a kopie do `/share/solario/backups`, odkud je lze vytáhnout přes File editor, Sambu nebo Terminal.

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

Úspora vychází z ceny elektřiny a z energie FVE skutečně spotřebované doma. Pokud jsou k dispozici výroba a přetoky, vlastní spotřeba se počítá přesně jako výroba minus přetoky. Měsíční a celková úspora se zobrazují pouze z odpovídajících měsíčních/celkových energetických podkladů; diagnostika pomůže odhalit chybějící zdroj.

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

Přístupový a obnovovací kód se při první registraci zobrazí pouze jednou a lze je stáhnout do lokálního textového souboru. Obnovovací kód při použití vytvoří novou dvojici a zneplatní starý přístup. Přístupové údaje i nastavení zůstávají v persistentním `/data` a běžný restart add-onu nevyžaduje novou registraci.

Add-on vytváří automatické lokální zálohy persistentních dat. Při aktualizaci nebo restartu se zachovávají mapování entit, identita vestavěného agenta, nastavení i energetické trackery.

## Podporované platformy

Předpřipravený image je publikovaný pro:

- `amd64`
- `aarch64`

Další informace a placené tarify jsou dostupné na `https://solario.cloud`.

