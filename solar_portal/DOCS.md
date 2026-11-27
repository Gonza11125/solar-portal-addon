# Konfigurace Solario Home

Solario Home je navržen tak, aby nová instalace fungovala bez ručního vypisování energetických entit. Vestavěný agent načte stavy z Home Assistantu a bezpečně vybere použitelné zdroje podle ID, názvu, jednotky, `device_class` a `state_class`. Ruční pole v konfiguraci add-onu jsou volitelné přepisy automatického výběru.

## Jazyk rozhraní

Solario Home podporuje češtinu i angličtinu. Přepnutí jazyka se vztahuje na hlavní obrazovky, diagnostiku, automatizace, profil, první spuštění, bezpečnostní/QR stavy, uživatelské chybové odpovědi i text předvyplněný do e-mailových odkazů. Produkční image se od verze 0.6.33 nesestaví, pokud automatický i18n audit najde uživatelský český text bez anglického pokrytí.

Uživatelské názvy entit, automatizací a zařízení převzaté z Home Assistantu se nepřekládají, protože jde o data pojmenovaná uživatelem.

## Základní konfigurace

Výchozí interval čtení je 5000 ms. Povolený rozsah je 1000–60000 ms.

Volitelné ruční přepisy energetických entit:

- `entity_power_now`
- `entity_energy_today`
- `entity_battery_soc`
- `entity_battery_voltage`
- `entity_grid_import`
- `entity_grid_export`
- `entity_grid_power`
- `entity_battery_power`
- `entity_home_consumption`
- `entity_home_power` (okamžitý výkon domu v kW; používá se pouze tehdy, když existuje přesný výkonový senzor)
- `entity_solar_production`
- `entity_inverter_power`
- `entity_string_1_power` až `entity_string_4_power`
- `entity_production_max_10min`
- `entity_production_avg_10min`
- `entity_ev_power` (nabíjecí výkon wallboxu)
- `entity_ev_energy_today` (kolik se dnes nabilo)

Volitelné komfortní/řídicí entity:

- `entity_room_temperature`
- `entity_room_humidity`
- `entity_hdo_switch` (spínač nízkého tarifu; když je sepnutý, počítá se ušetřená energie nízkou sazbou)

Prázdné pole znamená „nechat Solario zdroj bezpečně objevit“. Ručně vybraná platná entita má před automatickým objevováním přednost.

## Alpha ESS

Aktuální verze obsahuje přesně kontrolované aliasy pro běžné Alpha ESS entity, které obecné vyhledávání nemusí vždy správně rozpoznat. Alias se použije pouze tehdy, když konkrétní entita opravdu existuje, je dostupná, má číselnou hodnotu a kompatibilní jednotku.

Podporované zdroje zahrnují aktuální výrobu, kumulativní výrobu FVE, kumulativní import/export sítě, spotřebu domu, SOC baterie a napětí baterie.

## Denní a měsíční energie

Pokud Home Assistant poskytuje kumulativní čítač energie, agent z něj odvozuje:

- hodnotu za dnešek,
- hodnotu za aktuální měsíc,
- celoživotní hodnotu čítače.

Začátek dne a měsíce se získává z Home Assistant Recorderu. Pokud je dostupná statistická změna, lze ji použít pro bezpečné prvotní nasazení trackeru. Trackery jsou persistentní a chrání se proti resetu kumulativního čítače i krátkému falešnému nulovému stavu senzoru.

Pokud pro přesný výpočet chybí historie, Solario nezačne vydávat neověřený odhad za přesnou hodnotu; diagnostika ukáže použitý zdroj a stav výpočtu.

## Historie podle tarifu

Historie se ukládá ve třech rozlišeních, protože každé stojí jinak:

- **podrobná** (měření po několika minutách) - Local dnešní den, Smart a Pro měsíc,
- **hodinová** (řádek na hodinu) - Local 1 den, Smart 31 dní, Pro 366 dní,
- **denní** (řádek na den) - Local 7 dní, Smart rok, Pro 5 let.

Rok podrobných měření by znamenal desítky megabajtů přepisovaných každou minutu,
proto Pro nedosahuje dál zvýšením podrobnosti, ale hrubšími řádky: libovolný den
za poslední rok se otevře z hodinových řádků a má tak pořád svůj průběh, celá
období se sčítají z denních.

Ukládá se stejně na všech tarifech - tarif rozhoduje jen o tom, jak daleko
zpět se domácnost smí podívat. Kdo přejde z Localu na Smart nebo Pro, uvidí
hned i dny, které add-on uložil ještě v Localu. Rozhraní to říká s vlastními
čísly domácnosti (`GET /api/data/retention` vrací jen počet uložených dní a
první den, nikdy samotná měření).

Záložky v Grafech odpovídají tomu, co tarif skutečně obslouží: Local den a
týden, Smart navíc měsíc, Pro navíc rok, „Celkem" a vlastní výběr. „Celkem"
nečte uloženou historii, ale celkové čítače z Home Assistantu.

## Tarifní capability matrix

Serverově vynucené funkce mají jeden zdroj pravdy v `localPlanPolicy.ts`:

- **Local (`free`, 99 Kč měsíčně)**: detailní historie dnešního dne, záložka Den, úspora za posledních 7 dní, včerejšek na přehledu večer a ráno, aktuální Stav systému s ruční opravou senzoru a tlačítkem „Poslat stav technikovi“, pevné vestavěné alerty, katalog automatizací, 0 automatizací v ceně, osobní podpora a aktualizace. Stejné funkce má instalace bez předplatného, jen bez podpory a aktualizací.
- **Smart**: detail 30 dní, záložky Týden a Měsíc, osobní podpora, detailní ekonomika a návratnost z doložených 365 dní, karta „Zítra“ s předpovědí výroby, měsíční souhrn e-mailem, 30denní historie Stavu systému, editace vestavěných alertových hranic, Cloud/remote push, 1 automatizace v ceně.
- **Pro**: detail 30 dní + hodinová historie 366 dní + denní historie 5 let, Rok a Vlastní období, dlouhodobá ekonomika, vlastní alerty, celý servisní report na stránce, 3 automatizace v ceně, editor zařízení, roční kalendář energie se srovnáním měsíců proti loňsku, export, PDF a webhooky.

Počet spravovaných pravidel, která už tým Solario vytvořil, není technický runtime limit. Hodnota „automatizace v ceně“ je obchodní rozsah nové dodávky. Existující spravované automatizace se při downgrade nemažou ani nevypínají.

Placené nastavení se při downgrade zachová na disku. Backend však vždy vyhodnocuje aktuální ověřený entitlement: Local používá pevné prahy, Smart nepouští Pro custom rules a zařízení lze ručně ovládat/editovat pouze v Pro na instalaci typu vlastní Home Assistant.

## Přechod na placený tarif

Od 0.7.62 jsou předplatným všechny tři tarify: Local (99 Kč), Smart (249 Kč) a Pro (499 Kč) měsíčně. Placené
tarify se zapínají volbou `paid_upgrades_enabled`, nebo je zapne Solario Cloud pro všechny instalace najednou
(`paidPlansLive`). Dokud nejsou zapnuté, má každá instalace Local i se službami Solario a aktualizacemi, Smart a Pro
ukazují „Brzy k dispozici“ a nic se neplatí.

Po zapnutí, stejně pro Solar Box i vlastní Home Assistant:

1. Po vytvoření přístupového kódu si zákazník vybere: předplatit Local, vyzkoušet Smart či Pro **14 dní zdarma**
   bez karty (zkušební doba je jedna na instalaci), nebo pokračovat zatím bez tarifu.
2. Zaplatit může kdykoli v Profilu. Potvrzení ukáže cenu a podmínky, platba se otevře v novém okně na
   stránce `solario.cloud` a tarif se po zaplacení zapne sám. Údaje o kartě add-on nikdy nevidí.
3. Tarif mění nahoru i dolů v Profilu nebo ve svém účtu na `solario.cloud`. Přechod ze Smart nebo Pro na Local je
   nižší tarif od konce zaplaceného období; zrušené předplatné doběhne do konce zaplaceného měsíce.
4. Bez předplatného (po zkušební době bez platby nebo po doběhnutí zrušeného) se **nic nezablokuje**: add-on běží
   dál s funkcemi Localu, měření, grafy a už nastavené automatizace fungují a nic se nemaže. Chybí jen osobní
   podpora, automatizace na míru, Solario Cloud a automatické aktualizace. Po zaplacení se vše vrátí.

Automatické aktualizace přepíná pomocný proces s tokenem Supervisoru (`/data/update-policy.json` s `once: true`), a to
jen při změně: když předplatné začne, jednou je zapne, když skončí, jednou je vypne. Mezi tím nastavení v Home
Assistantu nechává na domácnosti; ruční aktualizaci nezakazuje. Bez zapnutých placených tarifů je nevypíná nikdy.

Tarif Local neposílá žádná měření do Solario Cloud; ten je součástí tarifů Smart a Pro.

Pojistky:

- Druhé kliknutí, obnovení stránky ani druhá záložka nezaloží druhou platbu. Vrátí se rozdělaná relace.
- Relaci, která už může být zaplacená, add-on nikdy nepřepíše. Nahrazené a nedokončené relace ještě
  7 dní hlídá, takže pozdě potvrzená platba se neztratí. Dvojí platbu nepoužije a řekne zákazníkovi,
  ať požádá o vrácení.
- Kdo už platí, mění nebo ruší tarif ve svém účtu na `solario.cloud`. Add-on druhé předplatné nezaloží.
- Platit se posílá jen na stránku `solario.cloud`. Adresy jiných hostitelů add-on odmítne.
- Rozdělané platby jsou v `/data/cloud-activation.json`, přístupový token relace je šifrovaný (AES-256-GCM).
- Automatické aktualizace přepíná jen pomocný proces add-onu přes Supervisor (`hassio_api`), a to jen
  při jednorázovém obnovení popsaném výše. Webová část add-onu token Supervisoru nemá; jen zapíše
  požadavek do `/data/update-policy.json`.

Návrh pro web je v repozitáři v `docs/solario-cloud-platby-navrh.md`.

## Automatizace: přehled a ovládání domácností

Záložka Automatizace ukazuje zařízení domu, každé na jedné kartě se všemi pravidly, která ho řídí (od 0.7.64). Bojler se třemi pravidly je jedna karta; po rozkliknutí jsou vidět všechna pravidla, jejich spouštěče a podmínky s aktuální hodnotou („splněno“ nebo „brání“), nastavení a ruční ovládání. Pravidla se do jedné karty spojí, když spínají stejné zařízení; automatizace, která ovládá víc než čtyři zařízení nebo zařízení různého druhu, má kartu vlastní. Dál stránka ukazuje, kolik automatizace tento měsíc ušetřily, dnešní běhy nad dnešní výrobou a deník všech běhů. Všechno je z toho, co add-on naměřil:

- Každou půlminutu add-on sleduje spotřebič každé automatizace a ukládá běhy, které spustila automatizace nebo domácnost tlačítkem (`/data/automation-activity.json`, 400 dní). Ruční zapnutí mimo automatizaci se nepočítá.
- Energie je z měřáku výkonu spotřebiče („měřeno“), jinak z výkonu na štítku („odhad“). Bez obojího je běh jen časově zaznamenaný a stránka úsporu neukazuje.
- Ze slunce se počítá jen to, co v tu chvíli nedodala síť ani baterie.
- Graf „Dnešní den“ ukazuje po půlhodinách výrobu (průměr okamžitého výkonu), spotřebu domu a přetok do sítě (z denních počítadel; malý poskok počítadla zpět po zaokrouhlení se přečte jako nula; spotřeba dopočítaná z výroby a sítě se u domu s baterií nepoužije). Když počítadlo dnes nebo včera kleslo (třeba senzor, který se nuluje každou hodinu), spočítá se spotřeba z okamžitých výkonů: výroba + odběr ze sítě − přetok − nabíjení baterie, a přetok z výkonu elektroměru. Stejně to dělá Solario Cloud. Ze stejných výkonů se doplní i půlhodina, kterou počítadlo nepokrylo. Bez měřeného výkonu sítě (a u domu s baterií i jejího výkonu) se spotřeba nevykreslí, běhy spotřebičů a kdy se dnes spustily ostatní automatizace. Spotřeba a přetok se ukazují jen tam, kde je dům měří. Úspora = energie ze slunce × (cena elektřiny − výkupní cena). Je-li nastavený nízký tarif, počítá se s ním, protože spotřebič by jinak běžel v něm.

Domácnost může bez žádosti na tým Solario:

- **Spustit hned**: zapne spotřebič a na dobu běhu pozastaví jeho pravidlo, aby ho Home Assistant hned nevypnul. Výchozí délka: bojler 2 h, auto 3 h, bazén a tepelné čerpadlo 2 h, ostatní 1 h. Myčka a pračka se jen zapnou.
- **Dnes vynechat** (u běžícího spotřebiče „Zastavit na dnes“): pravidlo platí znovu od půlnoci. Na kartě zařízení s víc pravidly se vynechají všechna jeho pravidla, a tlačítko se ukáže, jen když to jde u každého z nich.
- **Pozastavit na dnes** a **Dovolená** (až 60 dní): pozastaví automatizace, které spotřebovávají energii (všechny od Solaria a ty vlastní, které spínají spotřebič). Automatizace Home Assistantu se vypnou a po skončení znovu zapnou, ale jen ty, které byly zapnuté. Rolety a světla běží dál.
- **Skrýt** (od 0.7.67, i v tarifu Local): automatizace zmizí z přehledu, ale dál běží. Skryté jsou pod kartami zařízení v sekci „Skryté automatizace (N)“ a tlačítkem **Zobrazit** se vrátí. Volba platí pro celý dům, doplněk i Solario Cloud ukazují totéž; ukládá se v `/data/automation-hidden.json`.
- **Nastavení**, která tým Solario u automatizace zpřístupnil, a to jen v povoleném rozsahu.

Tým Solario to u automatizace v `/data/user-automations.json` určí takto (nic z toho není povinné):

```json
{
  "id": "automation.ohrev_vody",
  "name": "Ohřev vody z přebytků",
  "category": "hot_water",
  "description": "Když posílám do sítě víc než 1,5 kW, ohřeju bojler. Jen 10–15 h.",
  "device": {
    "kind": "water",
    "label": "Bojler",
    "entityId": "switch.bojler",
    "powerEntityId": "sensor.bojler_power",
    "ratedKw": 2.0,
    "temperatureEntityId": "sensor.bojler_teplota",
    "targetTemperature": 60
  },
  "controls": {
    "boost": { "minutes": 90 },
    "skip": true,
    "settings": [
      { "entityId": "input_number.bojler_prebytek", "label": "Zapnout od přetoku", "unit": "kW", "min": 0.5, "max": 3, "step": 0.1 },
      { "entityId": "input_select.wallbox_rezim", "label": "Režim nabíjení", "options": ["Jen slunce", "Slunce + minimum", "Co nejrychleji"] }
    ]
  }
}
```

- Bez `device.entityId` je spotřebičem první vypínatelná entita z akcí pravidla. Bez `powerEntityId` se hledá senzor výkonu pojmenovaný po spotřebiči (`switch.bojler` → `sensor.bojler_power`).
- `kind` je jedno z `water`, `car`, `dish`, `pool`, `heat`, `battery`, `blinds`, `light`, `other`. Jinak se odvodí z kategorie, názvu nebo entity.
- Nastavení mohou být `input_number`, `number`, `input_select`, `select`, `input_boolean`, `climate` a `water_heater`. Pravidlo v Home Assistantu má číst hodnotu z tohoto pomocníka. Rozsah je průnikem toho, co povolí Solario, a toho, co přijme entita.
- `"boost": false` nebo `"skip": false` tlačítko u automatizace skryje.

### Vlastní automatizace z Home Assistantu

Záložka ukazuje i všechny automatizace, které Solario nenastavilo (nejvýše 100). Agent jednou za 15 minut přečte jejich konfiguraci přes WebSocket Home Assistantu (`automation/config`) a k entitě automatizace přidá, čím se spouští a které entity ovládá (atributy `solario_triggers`, `solario_targets`, `solario_description`). Konfiguraci Home Assistant vrací jen u automatizací, které mají `id` (všechny vytvořené v editoru); ostatní se ukážou jen s názvem a stavem.

- Domácnost je může zapnout a vypnout, spustit teď (`automation.trigger`) nebo na dnešek vynechat.
- Automatizace, která spíná spotřebič (`switch`, `input_boolean`, `light`, `fan`) poznaný jako bojler, auto, myčka, bazén nebo tepelné čerpadlo, se měří a počítá do úspory jako automatizace od Solaria. Místo „Spustit teď“ má „Spustit hned“ pro spotřebič.
- Výpadek jejich spotřebiče se v Upozorněních nehlásí; hlásí se jen u automatizací od Solaria.

### Panel Ovládání

Panel obsahuje všechny `cover.*` v domě kromě garážových vrat, bran a dveří (`device_class` `garage`, `gate`, `door` nebo takový název), spotřebiče automatizací od Solaria a cíle vlastních automatizací v doménách `light`, `fan`, `climate`, `water_heater`. Obecný `switch` z vlastní automatizace se ukáže jen tehdy, když vypadá jako spotřebič nebo světlo, aby se v panelu neobjevilo třeba nastavení střídače. Nejvýše 40 zařízení.

- Rolety: `open_cover`, `close_cover`, `stop_cover` a `set_cover_position` (když je roleta podporuje, podle `supported_features`).
- Spotřebiče a světla: `turn_on`, `turn_off`.
- Topení a ohřev vody: `set_temperature` v rozsahu `min_temp`–`max_temp` entity.

Ovládání automatizací i panelu je ve Smart a Pro. V tarifu Local je vše vidět bez ovládání; obnovit pozastavené automatizace jde vždy.

Když Home Assistant přestane spotřebič hlásit na víc než 15 minut, objeví se v Upozorněních „Automatizace nemohla běžet“. Ve Smart a Pro posílá add-on stejný přehled do Solario Cloud (každých 10 minut, při otevřené stránce každých 20 s) a ovládání z webu provede add-on se stejnými kontrolami.

### Kontrola domu

Karta „Co u vás půjde“ (`GET /api/user-automations/check`, na všech tarifech) projde entity Home Assistantu v doménách `switch`, `input_boolean`, `light`, `fan`, `climate`, `water_heater`, `cover`, `number` a `select` a vyhodnotí balíčky automatizací:

- **Bojler z přebytků**: `switch`/`input_boolean` poznaný jako bojler nebo `water_heater`.
- **Tepelné čerpadlo ze slunce**: `climate`, `water_heater`, `switch`, `select` nebo `number`, jehož název ukazuje na tepelné čerpadlo nebo SG Ready (termostat radiátoru se nepočítá).
- **Auto ze slunce**: wallbox nebo nabíjení (`switch`, `input_boolean`, `number`, `select`).
- **Pračka a myčka ze slunce**: funguje i bez chytrého spotřebiče, upozorněním.
- **Baterie podle cen a tarifu** (jen když dům baterii má), **Bazén** a **Rolety** (jen když je dům má).

Balíček je **Připraveno**, když je zařízení dostupné a dům měří přetok do sítě (u balíčků z přebytků), **Chybí měření**, když zařízení je, ale přetok se neměří, a **Chybí zařízení**, když ho Home Assistant nemá nebo je nedostupné. Karta pak napíše, co pořídit a co Solario dělá do té doby. Balíček, jehož zařízení už řídí automatizace od Solaria, je „Už běží“; řídí-li ho vlastní automatizace domácnosti, karta to napíše a balíček nabízí dál. Entity, které otvírají nebo hlídají dům (garáž, brány, dveře, zámky, alarm), se nepočítají ani nenabízejí. Částka „až … Kč měsíčně“ je přetok za posledních 30 dní × (cena elektřiny − výkupní cena).

Ve Smart a Pro posílá doplněk kontrolu do Solario Cloud spolu s přehledem automatizací (od 0.7.60), takže ji ukazuje i web a žádost z webu může nést její souhrn.

Žádost o automatizaci (`POST /api/user-automations/requests`) s `"attachCheck": true` přidá ke zprávě pro Solario krátké shrnutí kontroly (nejvýše 1000 znaků, celkem do 2000 znaků; text domácnosti se nezkracuje). V add-onu se shrnutí ukládá zvlášť (`context`) a domácnost v seznamu žádostí vidí jen svůj text.

## Solario Solar Box vs vlastní Home Assistant

Typ instalace se volí jednou po prvním přihlášení a potom je bezpečnostně uzamčen.

- **vlastní Home Assistant**: uživatel může v rámci svého tarifu spravovat Solario automatizace a pracovat s podporovanými lokálními funkcemi,
- **Solario Solar Box**: spravované automatizace jsou z uživatelského pohledu pouze ke čtení; změny provádí správce instalace.

## Počasí a sluneční podmínky

Solario umí použít Home Assistant `weather.*`, fyzický senzor ozáření, `sun.sun` nebo vhodný senzor výšky Slunce. Za skutečnou meteostanici se považuje pouze `weather.*` nebo měřený senzor ozáření; samotné `sun.sun` se v UI označí jako „Jen poloha Slunce“. Pokud není dostupný fyzický senzor ozáření, může Solario ozáření odvodit z počasí a výšky Slunce.

Při `sunElevation <= 0` je aktuální ozáření vždy 0 W/m². Toto pravidlo platí i pro případ, kdy fyzický Home Assistant senzor po západu Slunce krátce drží starou kladnou hodnotu.

## Síť

- HA API: `http://supervisor/core`
- backend: `127.0.0.1:5000`
- Ingress: port 8099, pouze Home Assistant Ingress proxy
- lokální Web UI: port 3000, ve výchozím stavu bez host mappingu; po explicitním zapnutí pouze privátní/LAN síť
- maximální JSON body: 1 MiB

Vestavěný agent dostává Supervisor token pouze přes procesové prostředí. Token se nezapisuje do `/data/agent-config.json` a webový backend jej nedostává.

## MQTT (lokálně)

Add-on deklaruje `services: - mqtt:want`, takže pokud máte v Home Assistantu nastavenou MQTT integraci (např. add-on Mosquitto broker), Supervisor automaticky vloží přihlašovací údaje (`MQTT_HOST`, `MQTT_PORT`, `MQTT_USERNAME`, `MQTT_PASSWORD`) do prostředí agenta - žádné ruční nastavení není potřeba. Pokud MQTT broker není dostupný, tato integrace se jen neaktivuje a zbytek add-onu funguje beze změny.

Po připojení agent:

- publikuje aktuální metriky (stejné klíče jako v diagnostice, např. `power_now`, `battery_soc`, `grid_power`) jako zachovanou (retained) JSON zprávu na `solario/local/state`,
- publikuje stav dostupnosti na `solario/local/availability` (`online`/`offline` přes Last Will),
- jednorázově zveřejní Home Assistant MQTT discovery konfiguraci pro hlavní senzory (výkon FVE, výroba dnes, stav baterie, výkon sítě, výkon baterie, spotřeba domu) pod `homeassistant/sensor/solario_local/…/config`, takže se automaticky objeví jako nativní entity Home Assistanta.

Stav připojení je vidět v Nastavení → Integrace → „MQTT (lokálně)".

## Webhooky

V Nastavení → Integrace → „Webhooky" lze nastavit cílovou URL, volitelný token a jednu ze sledovaných událostí. Tlačítko „Otestovat" vždy odešle testovací POST požadavek bez ohledu na to, jestli právě nastala sledovaná událost.

Backend vyhodnocuje události při každém zpracování dat z agenta a webhook zavolá jen při **přechodu** stavu (ne opakovaně, dokud podmínka trvá):

- `battery_low` - stav baterie klesne na 15 % nebo méně,
- `battery_full` - stav baterie stoupne na 98 % nebo více,
- `grid_export` - okamžitý výkon sítě přejde ze záporného/nulového na záporný (jakýkoli přetok),
- `solar_surplus` - přetok do sítě přesáhne 500 W,
- `device_offline` - periodická kontrola (každých 30 s) zjistí, že lokalita přestala posílat data,
- `alert_created` - souhrnná volba, která se spustí při jakékoli z výše uvedených událostí.

Tělo POST požadavku obsahuje `{ event, configuredEvent, siteId, timestamp, source, data }`, kde `data.triggeredBy` u volby `alert_created` říká, která konkrétní podmínka nastala.

## Persistentní data a přístup

Přístupový i obnovovací kód se při první registraci zobrazí jednou; registrační i obnovovací obrazovka umožní novou dvojici stáhnout do lokálního textového souboru. Pokud se ztratí oba kódy, není možné je vzdáleně „dohledat“ - obnova vyžaduje přímý servisní zásah v daném add-onu.

Podrobná historie se ukládá atomicky do denních souborů `<live-data-store>.history/YYYY-MM-DD.json`. Hlavní `live-data-store.json` zůstává malý a nese živý stav a kompatibilní metadata. Starý monolitický formát se při upgradu migruje transakčně: nejdřív se vytvoří denní shardy a teprve potom se hlavní soubor zlehčí. Hodinové agregace se zapisují nejvýše po 10 minutách nebo na hranici hodiny, denní nejvýše po 30 minutách nebo na hranici dne; při plánovaném ukončení se persistentní telemetrie flushne.

Stav účtu, lokální nastavení, investiční vstupy, alertová pravidla, fronta žádostí o automatizace, agent identity a energetické trackery jsou v persistentním `/data`. Placená data se při downgrade nemažou.
