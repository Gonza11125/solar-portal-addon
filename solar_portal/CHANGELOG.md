# Changelog

## [0.7.18] - 2026-09-19

- **historie podle tarifu, jak má být**: Local den a týden, Smart navíc měsíc, Pro navíc rok a vlastní výběr. Local měl dosud jen dnešek, přestože v úložišti data byla
- **Pro si může otevřít libovolný den až rok zpětně.** Podrobná měření po několika minutách se rok držet nedají - byly by to desítky megabajtů přepisovaných každou minutu - a tak vznikl hodinový souhrn: řádek na hodinu, rok jich je 8 760, tedy zhruba megabajt. Den z loňska tak pořád má svůj průběh. Ve výběru „Vlastní" stačí zadat stejné datum dvakrát a otevře se ten den po hodinách; jiný rozsah se vykreslí po dnech
- záložky v Grafech už nejsou natvrdo: backend hlásí, která období tarif obslouží, takže rozhraní nemůže nabídnout něco, co server odmítne
- u součtů z hodinových a denních souhrnů zmizelo porovnání polovin okna a procentuální odchylka - vztahovaly se k podrobné historii, ne k vybranému období
- tarifní karty a promo bloky říkají historii slovy („Historie: den, týden, měsíc a rok"), ne počtem dní, a berou ji z limitů, které backend skutečně vynucuje

## [0.7.17] - 2026-09-19

- **HDO se konečně počítá.** Úspora byla dnešní vlastní spotřeba krát jedna cena, přestože volba `entity_hdo_switch` v konfiguraci existovala a nikdo ji nečetl. V Nastavení přibyl nízký tarif a výkupní cena, obojí nepovinné - prázdné znamená počítat jednou cenou úplně stejně jako dosud. S vyplněným nízkým tarifem se denní úspora nespočítá až na konci dne jednou sazbou, ale přirůstá průběžně sazbou, která zrovna platí (podle stavu HDO spínače). Měsíční a celková úspora zůstává na hlavní ceně, protože pro zpětné rozdělení podle tarifu nejsou podklady
- **výkupní cena** se používá jen na energii dodanou do sítě a zobrazuje se odděleně - je to výnos, ne ušetřená energie
- **`entity_bojler_switch` a `entity_kotel_switch` odstraněny.** Posílaly se agentovi, agent je sbíral a nikdo je nikdy nečetl; kdo je vyplnil, neměl z toho nic. `entity_hdo_switch` zůstává a nově něco dělá
- **dlouhodobá historie pro tarif Pro.** Smart i Pro držely stejných 30 dní detailu. Nově vzniká denní souhrn - jeden řádek na den a lokalitu, pár set bajtů, takže pět let jich zabere míň než jeden den detailních dat. Local má 31 dní, Smart rok, Pro pět let. Grafy je používají: **Měsíc** už není jen čtyři čísla a poslední uložené okno pod nimi, ale třicet sloupců skutečných denních součtů, a Pro má navíc záložku **Rok**
- **„Projít senzory znovu"** v Nastavení. Špatně přiřazený zdroj se dosud dal opravit jen po jedné metrice ručně. Ruční volby zůstávají zachované
- **verze add-onu je vidět** v Nastavení. Backend ji četl jen kvůli anonymní telemetrii, takže zevnitř add-onu nešlo zjistit, co vlastně běží
- **soukromý e-mail majitele zmizel z produktu.** Byl na přihlašovací stránce, v Profilu, v odkazu na žádost o automatizaci a hlavně v pokynech pro ztrátu obou kódů, česky i anglicky. Výchozí adresa je nyní produktová a add-on má volbu `support_email`
- **placené tarify jsou volbou add-onu** (`paid_upgrades_enabled`), ne úpravou kódu
- smazáno 1075 řádků stránek, na které nevedl jediný import a které do každého buildu nosily staré ceny a staré texty

## [0.7.16] - 2026-09-19

- **„Systém v pořádku" znamenalo jen to, že agent poslal data.** Vybitá baterie, mrtvý senzor ani FVE, která přestala vyrábět, stav nezměnily. Nově je potřeba aktuální spojení, všechny zdroje, které instalace má, a žádné otevřené upozornění vážnější než informační
- **„Dostupnost dat" na Přehledu se ptala jen na to, jestli hodnota v payloadu existuje** - to platí dál i poté, co senzor za ní umře. Nyní čte stejnou diagnostiku po metrikách jako Zařízení a Zdraví FVE a rozlišuje, jestli zdroj není namapovaný, nebo přestal hlásit
- **baterie je konečně v energetické matematice.** „Kam šla výroba" počítala nabíjení baterie jako spotřebu domu a „Odkud šla spotřeba" vynechávala, co baterie vrátila. Obojí se počítá z uloženého výkonu baterie; kde ho add-on nezná, řekne to („Doma nebo do baterie") místo aby hádal. Pokrytí spotřeby na Přehledu bylo výroba/spotřeba, což při velkém přetoku ukazovalo 100 %, i když dům velkou část odebral ze sítě - nově je to podíl, který jste nemuseli koupit
- **období se jmenuje podle okna, které se opravdu vrátilo.** Na tarifu Local vrátí „Týden" 24 hodin, ale hodnoty pod ním se pořád jmenovaly „za týden"
- **Zdraví FVE**: baterie se nevyhodnocuje na instalaci bez baterie, „nevyrábí" ve dvě ráno už není varování (rozhoduje výška slunce) a jeden nepovinný senzor stringu nebo celkový čítač už neshodí celé zařízení na „Částečně" - diagnostika nese příznak `required`, který rozhraní dosud ignorovalo
- **vlastní období od–do v Grafech pro tarif Pro.** Politika tarifů to slibovala, ale nabízeno nebylo: `/data/history` uměl jen počet hodin. Endpoint nově přijímá `from` a `to`, ořízne je na to, co tarif uchovává, a mimo Pro je odmítne
- **wallbox má konečně co zobrazovat.** Karta čekala na `evPower` a `evEnergyToday`, které nikdo nevytvářel. Přibyly jako metriky `ev_power` a `ev_energy_today` včetně automatického rozpoznání a ručních přepisů `entity_ev_power` a `entity_ev_energy_today`. Nepovinné - bez nabíječky se karta dál nezobrazí. Třetí údaj býval počet nabíjení, který žádný senzor nehlásí; nahrazen stavem nabíjení
- **tvrzení, která kód nepokrývá, jsou pryč**: tarif Pro sliboval neomezené lokality, i když add-on žádnou vytvořit neumí; promo karty slibovaly chytrou nabíječku pro EV, predikce výroby a cloudové predikce; Upozornění slibovala, že vás okamžitě informují, ačkoli e-mail ani push add-on neodesílá. Slovo FREE zmizelo ze všeho, co vidí zákazník (interní identifikátor plánu zůstává `free`)
- **anglický režim je konečně anglický**: devět míst formátovalo čísla, data a časy natvrdo v `cs-CZ`
- **záloha nastavení obsahuje i předvolby zobrazení** (lokalita, časové pásmo, jednotky, přesnost hodnot, výchozí stránka, tipy, animace); dosud je obnova potichu nechala na výchozích hodnotách

## [0.7.15] - 2026-09-19

- **"Nabití baterie 5 388,8 kWh" a graf se stupnicí do 8000 kW opraveny.** Okamžitý výkon se ukládá v kW od verze 0.7.5, jenže vaše instalace se kvůli rozbitému buildu nemohla dostat výš než na 0.7.4, takže řádky v `/data` byly ve wattech. Přečtené jako kW jsou tisíckrát vyšší a integrál nabíjení baterie přes ně zase tisíckrát. Uložená historie se při načtení převede
- **jednotky výkonu sjednoceny na kW i v automatizacích.** Editor psal „W", ale porovnávalo se v kW - pravidlo „výroba > 3000" se tak nikdy nespustilo. Přetok do sítě se v témže enginu převáděl na watty, takže dvě výkonové veličiny byly navzájem tisíckrát vedle. Už uložené prahy se jednou převedou, takže pravidlo znamená to, co jeho autor zamýšlel. Opraveny také hlavičky CSV exportu (hlásily W u hodnot v kW) a zdvojená routa `/data/export`
- **Úspory jsou konečně vidět**: na Přehledu dnes, tento měsíc a celkem, u každé i energie, ze které se počítá; v Grafech za vybrané období. Období, jehož podklad backend nepovažuje za spolehlivý, ukazuje „—", ne sebejistou nulu
- **Dnešní bilance říká, jestli jste v plusu nebo v mínusu** a kolik procent spotřeby pokryla výroba
- **záložky Měsíc a Celkem už nejsou tentýž den pod jiným názvem.** Tarif Local ukládá 24 hodin historie, takže měsíc se z ní nedal nakreslit. Nově čtou kumulativní čítače, které agent odvozuje z Recorderu a které měsíc i celou instalaci skutečně pokrývají. Spotřeba domu takový čítač nemá, a tak ukazuje „—"
- **Zařízení a Zdraví FVE říkají, co add-on opravdu ví.** Obě stránky dřív odvozovaly všechno z jednoho příznaku, takže čtyři karty hlásily Online najednou a „Žádné kritické chyby" se tisklo bez jakékoli podmínky. Nově čtou diagnostiku po metrikách: „Zobrazit detail" u zařízení otevře seznam zdrojů dané karty (název entity, ID, aktuální hodnota, nalezený problém), přibyla karta Měnič, a kontrola, kterou add-on nedokáže zodpovědět, hlásí „Nelze určit" místo aby prošla
- **upozornění mají konečně kam se ukládat.** Měsíc historie v `/data`, počty podle závažnosti jsou skutečné a podmínka se zapíše jednou, ne při každém měření. Kromě čtyř podmínek, na kterých už stojí webhooky, se každou minutu vyhodnocují dvě nové: zdroj, který přestal hlásit hodnotu, a slunce vysoko nad obzorem, zatímco FVE půl hodiny nevyrábí
- **v Nastavení zmizely karty Zálohy a Export dat.** Přepínač „Automatické zálohování" nebyl přepínač - ukazoval, že nějaká záloha existuje, a kliknutím vytvořil další. Záloha se dělá automaticky jednou denně a nově se kopíruje i do `/share/solario/backups`, odkud ji vytáhnete přes File editor, Sambu nebo Terminal. Z pěti přepínačů upozornění zbyly tři, které opravdu řídí, co se zaznamenává; e-mail a push add-on nikdy neodesílal
- v Grafech přibyla energie po hodinách a dvě rozdělení: kam šla výroba a odkud šla spotřeba
- procenta srovnání už nevycházejí z nesrovnatelně malého základu („+12 200 %" bylo 12,4 kWh proti 0,1 kWh)
- legenda grafu se kreslila mimo kartu; řádky se nyní přizpůsobí obsahu

## [0.7.14] - 2026-09-18

- ceny tarifů opraveny i na kartě "Pokročilá správa" v Profilu - jediném zbylém místě, kde se ještě zobrazovaly natvrdo napsané částky 9,99 a 19,99 EUR. Nyní se berou z `/billing/me` jako na hlavní stránce Profilu; u tarifu Smart se navíc slibovalo 7 dní historie, ačkoli add-on jich dává 30

## [0.7.13] - 2026-09-18

- ceny tarifů nastaveny na skutečné: Local 99 Kč, Smart 249 Kč, Pro 499 Kč měsíčně. Dosud backend hlásil 0 / 9,99 / 19,99 EUR a Profil je tak i zobrazoval
- všechny obrázky přegenerovány ve dvojnásobném rozlišení s doostřením. Zdrojem jsou dodané návrhy, takže nejde o nově nasnímaný detail - jde o to, aby obrázek na velké obrazovce nezvětšoval prohlížeč (to je ta rozmazanost), ale aby se naopak zmenšoval z většího originálu
- rozložení nyní roste s obrazovkou: okraje stránky a mezery se odvozují od šířky okna, maximální šířka zvednuta z 1600 na 2400 px a nad 1700 a 2200 px se zvětšují karty, ikony i písmo. Grafy se místo pevné výšky drží poměru stran, takže na širokém monitoru vyrostou s kartou (na 2560 px je graf 304 px vysoký místo 161 px)
- štítek "Živá data" na Přehledu se nyní odvozuje od velikosti hero obrázku; při větší šířce nepřekrýval ten vytištěný v grafice a vykukoval zpod něj

## [0.7.12] - 2026-09-18

- **Aktualizace add-onu konečně projde.** Home Assistant si image nestaví, stahuje ho hotový z GHCR, a jeho build na větvi `main` selhával od verze 0.7.7 na kontrole `audit:i18n` (naposledy se úspěšně publikovala 0.7.6). Proto nešlo aktualizovat na nic novějšího. Doplněny všechny chybějící překlady na obou liniích vývoje, kontrola je čistá a build projde celý
- sloučeny dvě paralelně vyvíjené linie: přestavba všech osmi karet podle dodaných návrhů, oprava dnešní výroby a funkční ovládací prvky na jedné straně, a SVG ilustrace, převod výkonu v agentovi a oprava falešného "offline" na straně druhé
- **převod výkonu z wattů na kilowatty sjednocen na jedno místo.** Obě linie ho dělaly jinde - agent při sběru, rozhraní při zobrazení - a dohromady by daly hodnoty 1000x menší. Ponechán převod v agentovi, protože data uložená od verze 0.7.5 už jsou v kW a přepnutí zpět by rozbilo existující historii. Dopočítáno na všechna navazující místa: deklarované jednotky v katalogu metrik a v MQTT discovery (hlásily `W`, ačkoli hodnota už byla v kW), práh pro webhook přetoku (0,5 kW místo 500 W, jinak by se nikdy nespustil) a výpočet nabití baterie z historie

## [0.7.11] - 2026-09-18

- **Oprava selhání aktualizace add-onu** ("An unknown error occurred with app ad5e4ef7_solar_portal"). Image se staví přes několik kontrol a jedna z nich, `audit:i18n`, hlídá, že každý český text v rozhraní a každá česká hláška z backendu má anglický protějšek ve slovníku. Tato kontrola padala a build se tím zastavil - ve verzi 0.7.6 na 14 textech, po přestavbě stránek na 121. Doplněny všechny chybějící překlady, kontrola je nyní čistá
- při té příležitosti se ukázalo, že `ResidenceLightTranslationPairs` a `ResidenceLightAuditTranslationPairs` četl jen audit, ale běhové prostředí je vůbec nenačítalo - stránky Home Local proto zůstávaly v češtině i po přepnutí do angličtiny. Nyní jsou zapojené a anglické rozhraní skutečně funguje (ověřeno na všech osmi stránkách)

## [0.7.10] - 2026-09-18

- **"Výroba 500 kWh" a podobné nesmysly opraveny.** Automatické rozpoznávání senzorů dávalo u metriky "Výroba FVE dnes" vyšší skóre senzoru s "total"/"lifetime" v názvu (+5) než senzoru s "today"/"daily" (+3) - celkový čítač od instalace se tak dostal do kolonky dnešní výroby. Nyní se u denních metrik celkové čítače penalizují a celkové čítače mají vlastní kolonku (`solar_production_total`, `grid_import_total`, `grid_export_total`), o kterou si denní metriky nekonkurují
- add-on se navíc už nespoléhá jen na název a `state_class`: u každého energetického senzoru se ptá Recorderu, kolik ukazoval hned po půlnoci. Pokud už tehdy držel většinu své hodnoty, jde o kumulativní čítač a dnešní výroba se počítá jako rozdíl. Senzor, který přes půlnoc nespadne na nulu, se navíc trvale označí jako kumulativní - obojí pokryto testy
- každé tlačítko, řádek a dlaždice se šipkou "›" nyní skutečně někam vede: karty s počty upozornění odrolují na příslušný panel, řádky zdrojů a komponent otevřou Zařízení, řádek automatizace otevře editor, karta "Systém v pořádku" otevře Zdraví FVE. Šipka se vykresluje jen tam, kde opravdu něco dělá
- doplněna chybějící tlačítka z předlohy: "Spustit test" v Rychlé diagnostice (skutečně se zeptá backendu a vypíše, co odpověděl), "Zobrazit vše" u Doporučení údržby a zvětšení grafu na Grafech
- Nastavení spadla na bílou stránku, pokud odpověď na uložení webhooku nepřišla v očekávaném tvaru (`Cannot read properties of undefined`); stav se teď přepíše jen platným objektem a neúspěšné přepnutí se vrátí zpět
- vzhled všech osmi karet sladěn s předlohou: hustota, velikosti karet, ikon a písma, rozložení sloupců a řádků v Nastavení (popisek vlevo, ovládací prvek vyplní zbytek řádku) a graf na Přehledu kreslí dvě řady jako v návrhu

## [0.7.9] - 2026-09-17

- doděláno posledních pět karet podle návrhů: Přehled, Nastavení a Profil mají nový vzhled, domeček v "Aktuálním toku energie" byl vyříznut ve vyšším rozlišení a bez oříznutých šipek, a šipky kolem něj nyní kreslí aplikace, takže ukazují skutečný směr toku (nabíjení baterie míří k baterii, přetok do sítě dolů) - v návrhu mířila šipka vždy stejně bez ohledu na hodnotu
- seznam automatizací, "Namapování a dostupnost dat" a "Aktivní upozornění" nově vycházejí ze skutečných dat: dostupnost zdroje se pozná podle toho, zda add-on danou metriku opravdu dostává, a upozornění používají tytéž prahy (baterie ≤ 15 %, ≥ 98 %, přetok ≥ 500 W), na kterých se spouštějí webhooky - dřív si je stránka určovala sama
- "Nabití baterie" v Dnešní bilanci se dopočítává integrací skutečného výkonu baterie z uložené historie; dosud se odkazovalo na pole `batteryChargedToday`, které nikde neexistuje, takže vždy hlásilo 0,0 kWh
- Lokalita, Časové pásmo, Jednotky, Zobrazení hodnot, Výchozí stránka, Zobrazovat tipy a Zobrazovat animace se nyní skutečně ukládají a mají viditelný efekt (časové pásmo ovlivňuje všechna data a časy, jednotky teplotu, zobrazení hodnot počet desetinných míst, výchozí stránka to, kam add-on po otevření skočí)
- změna předvolby se okamžitě projeví na celé stránce; formátovací funkce čtou předvolby z modulu, o kterém React neví, takže se stránka po jejich načtení nebo změně znovu vykreslí
- tarify v Profilu ukazují skutečné ceny a limity z `/billing/me` pro všechny tři tarify a tlačítka opravdu otevřou platební bránu nebo Solario Cloud; dosud tam byly natvrdo napsané částky 99/249/499 Kč a tlačítka Smart a Pro nedělala nic
- "Napsat podporu" odkazovalo na soukromý e-mail majitele add-onu; nahrazeno odkazem na Solario Cloud
- v levém panelu se u tarifu zobrazovala pevná cena "499 Kč / měsíc"; nyní se bere z `/billing/me`
- `/billing/me` hlásilo u tarifu Smart historii 7 dní, zatímco `localPlanPolicy` (která ji skutečně vynucuje) dává 30 dní; limity se teď počítají z jednoho místa a hlídá je test
- "Členem od" a e-mail v Profilu nešlo naplnit - účet v Solario Local je přístupový kód, ne registrace e-mailem; nahrazeno domácností a datem propojení s cloudem, které add-on skutečně zná
- odstraněny nepoužívané komponenty původního rozhraní (`Card`, `PageHeader`, `KpiCard`, `PlanPromo`, `EnergyFlow` a další)

## [0.7.8] - 2026-09-17

- stránky Grafy, Zařízení, Automatizace, Upozornění a Zdraví FVE byly přestavěny přesně podle dodaných návrhů: nový vzhled karet s barevným podbarvením a barevnou hodnotou, větší písmo a ikony, fotografie na plnou plochu karty místo výřezu a širší odsazení od levého panelu
- fotografie byly znovu vyextrahovány z návrhů v plném rozlišení - dosavadní obrázky byly zmenšeniny, které se v rozhraní zvětšovaly zpět a byly proto rozmazané; `device-grid.webp` měl navíc poškozenou hlavičku a nešel vůbec vykreslit
- obrázek na Zdraví FVE měl v sobě napevno vykreslenou maketu karty "Celkový stav systému"; dosavadní pokus o její začernění domaloval do obrázku druhý dům. Nyní se používá čistý výřez z návrhu a skutečná karta se stavem je umístěna přesně přes tu vytištěnou
- seznam automatizací se načítal z `/automations`, což je adresa, kterou backend nikdy neposkytoval - stránka proto vždy ukazovala hlášku "žádné automatizace", i když jich systém měl plno. Nyní čte skutečné `/user-automations` a zobrazuje název, podmínky, poslední spuštění, režim a zdroj každé automatizace, s vyhledáváním a filtrem stavu
- "Porovnání období" v Grafech dřív dopočítávalo předchozí období jako násobek toho aktuálního (výroba × 0,84) - tedy vymyšlené číslo. Nyní se obě období počítají ze skutečné uložené historie a odznaky "↑/↓ %" u výroby a spotřeby z nich vycházejí
- nové styly kolidovaly s existujícími pravidly `product-redesign.css`, která používají stejnou předponu `sl-`; kvůli tomu se například karta "Aktuální tok energie" vykreslovala jako tmavé kruhy. Nové rozhraní má teď vlastní předponu `sol-`

## [0.7.7] - 2026-09-17

- Nastavení bylo z velké části jen maketa: název domácnosti/lokalita/časové pásmo byly natvrdo napsaný text, přepínače upozornění a "Automatické zálohování" nešly rozkliknout ani se nikam neukládaly, "Cena elektřiny" byla jen ke čtení, "Zálohovat nyní"/"Obnovit ze zálohy"/"Exportovat data"/"Diagnostické logy" nic nedělaly a "Jazyk"/"Motiv vzhledu" ukazovaly pevnou hodnotu. Teď je vše skutečně funkční: název domácnosti a cena elektřiny jdou upravit přímo v řádku, upozornění se ukládají, "Motiv vzhledu" opravdu přepíná do reálného tmavého režimu, "Zálohovat nyní"/"Obnovit ze zálohy" stahují a nahrávají skutečnou zálohu nastavení a mapování entit, "Exportovat data" stáhne CSV s historií a "Diagnostické logy" zobrazí, který senzor byl pro kterou metriku automaticky vybrán (a umožní ho ručně opravit)
- přibylo devět tlačítek napříč Přehledem/Zařízeními/Upozorněními/Profilem, která dřív nic nedělala ("Spravovat", "Zobrazit vše", "Zjistit více"...) - teď vedou na odpovídající stránku; "Upravit profil" a "Historie upozornění" byly odstraněny, protože pro ně neexistuje (a v případě profilu ani nemůže existovat) žádná funkce
- MQTT (lokálně) nyní skutečně publikuje živé metriky a Home Assistant MQTT discovery konfiguraci na lokální broker (add-on si o připojovací údaje řekne automaticky přes `services: mqtt:want`), místo aby jen natvrdo hlásilo "Připraveno"
- Webhooky měly hotové API na pozadí, ale nikde se nedaly nastavit a nikdy se samy nespustily - teď mají v Nastavení skutečný formulář a spouští se automaticky při nízkém/plném stavu baterie, přetoku do sítě, výpadku zařízení nebo jakékoli z těchto událostí

## [0.7.6] - 2026-09-17

- okamžitý výkon FVE, sítě a baterie (Přehled, Grafy, Zdraví FVE, Zařízení) se zobrazoval tisíckrát vyšší, než ve skutečnosti je - agent sbírá a ukládá tyto hodnoty ve wattech (viz `expectedUnit: 'W'` v metric-resolver.ts), ale rozhraní k nim jen připisovalo jednotku "kW" bez dělení 1000; běžná ranní hodnota 47 W výroby se tak zobrazovala jako 47,0 kW. Přidán převod na kW na všech místech, kde se okamžitý výkon zobrazuje; energetické (kWh/MWh) hodnoty tímto dotčeny nejsou

## [0.7.5] - 2026-09-17

- odznak "Systém v pořádku" v hlavičce, pilulka "Živá data" na Přehledu, seznam "Namapování a dostupnost dat", stav "Všechny komponenty v pořádku" a "Rychlá diagnostika" na Zdraví FVE a panely "Stav zdrojů"/"Poslední kontrola" na Upozorněních byly natvrdo zelené/OK bez ohledu na skutečné připojení - nyní všechny vycházejí ze skutečného stavu spojení stejně jako stránka Nastavení, která je již zobrazovala správně
- odstraněno pravidlo přepisující pozadí stránky Zdraví FVE na health-hero.webp - tento obrázek měl v sobě napevno vykreslenou maketu karty "Celkový stav systému / V pořádku", která se překrývala se skutečnou dynamickou kartou a zobrazovala dvě protichůdná hlášení najednou
- automatické rozpoznávání senzorů (průvodce nastavením v agentovi) řadilo jakýkoli senzor s jednotkou obsahující písmeno "w" mezi výkonové senzory - jelikož "Wh", "kWh" i "MWh" toto písmeno také obsahují, mohl se jako zdroj okamžitého výkonu (power_now/grid_power/battery_power) omylem navrhnout kumulativní energetický čítač, což vysvětluje nesmyslně vysoké a strnulé hodnoty výkonu na Přehledu a v Grafech

> Následující záznamy 0.7.5-0.7.8 pocházejí z druhé, souběžně vyvíjené linie
> (větev `main`). Čísla verzí se proto výše opakují; publikovaná z nich byla
> pouze 0.7.5 a 0.7.6.

## [0.7.8] - 2026-09-18

- nahrazeny všechny výřezy fotek (home-hero, alert-hero, health-hero, fotovoltaika, wallbox) vlastními vektorovými (SVG) ilustracemi vykreslenými přesně na míru rozměrům každého místa - žádné cropování ani nechtěné přiblížení
- pro vizuální konzistenci dostaly stejný ilustrační styl i baterie a distribuční síť (dřív reálné fotky, teď v jednotném stylu se zbytkem)
- zvětšeno písmo napříč téměř celým rozhraním - spousta textu byla 8-11 px, nyní minimálně 12 px a úměrně větší nadpisy

## [0.7.7] - 2026-09-18

- desítky tlačítek v Home Local rozhraní byly čistě dekorativní (bez jakékoli akce) - "Spravovat", "Zobrazit vše", "Spravovat zařízení", "Zobrazit detail", "Upravit profil", "Nastavit", "Zobrazit", "Exportovat data", "Zálohovat nyní", "Obnovit ze zálohy" a další nyní skutečně něco dělají (navigace na existující plnohodnotné stránky, reálné API volání, stažení souboru)
- všech 5 přepínačů upozornění a přepínač automatického zálohování v Nastavení nyní reálně ukládají svůj stav místo aby byly čistě vizuální
- cenu elektřiny lze v Nastavení skutečně upravit a uloží se na server
- nové tlačítko "Zálohovat nyní" doopravdy vyžádá okamžitou zálohu (nový endpoint `POST /system/backup/trigger` + root scheduler v `entrypoint.sh` teď kontroluje požadavek každých 10 s místo čekání celou hodinu)
- nové tlačítko "Exportovat data" stáhne reálná data (nový endpoint `GET /data/export`); "Vytvořit report" a "Diagnostické logy" mají také funkční stažení
- přepínač Měsíčně/Ročně u tarifů nyní skutečně přepočítává ceny (roční sleva 17 %)
- "Napsat podporu"/"Centrum nápovědy" otevřou e-mail na podporu

## [0.7.6] - 2026-09-18

- opraveno natahování/deformace hero fotek (Přehled, Upozornění, Zdraví FVE) na desktopu - CSS je natahovalo na pevný poměr stran (`52%/70%/58% x 100%`), správná "cover" varianta byla omylem jen v mobilní verzi stylů
- kartičky s metrikami na Přehledu (FVE, Spotřeba domu, Baterie, Síť) jsou nyní plně neprůhledné, aby pod nimi neprosvítal obsah fotky na pozadí
- nahrazena fotka domu na Přehledu za čistší výřez bez textu a tlačítek, lépe sedící na širokou plochu banneru

## [0.7.5] - 2026-09-18

- opravena chybějící konverze jednotek u výkonových hodnot (FVE, spotřeba, síť, baterie): pokud entita v Home Assistantu hlásí výkon ve W, hodnota se nyní správně převede na kW - dříve se zobrazovalo např. "Spotřeba domu 11 064,0 kW" místo "11,1 kW"
- opravena chyba, kdy systém hlásil "Dům offline" i s čerstvě přijatými daty - kontrola stáří dat byla citlivá na malý časový posun hodin mezi kontejnerem add-onu a prohlížečem a při posunu v opačném směru vždy vyhodnotila data jako neplatná

## [0.7.4] - 2026-09-16

- nové rozpoznatelné entity `entity_grid_power` a `entity_battery_power` (okamžitý výkon sítě a baterie ve W) - dosud tato data agent vůbec nesbíral, přestože je dashboard i graf toku energie zobrazovaly (vždy jako 0)
- historie (24h graf) nyní ukládá okamžitý výkon sítě a baterie u každého bodu, takže se "Spotřeba" a "Síť" v grafu Výroba a spotřeba počítají ze skutečných dat místo z energetického (kWh) čítače
- graf stavu baterie (%) má nyní vlastní pravou osu, aby nedeformoval měřítko výkonové (kW) osy
- home-hero.webp, alert-hero.webp, health-hero.webp, device-pv.webp a device-wallbox.webp nahrazeny skutečnými obrázky (předchozí soubory byly buď neplatná binární data, nebo poškozený obsah)

## [0.7.3] - 2026-09-16

- opravena duplicita "LOCAL LOCAL" v logu Home Local rozhraní (CSS omylem připojovalo text "LOCAL" k popisku, který už "LOCAL" obsahoval)
- stavové odznaky "Online" / "Připojeno" na stránkách Zařízení a Nastavení nyní odrážejí skutečný stav spojení s Home Assistant/agentem, dříve byly natvrdo zobrazeny jako připojené i při výpadku
- okamžitá hodnota "Spotřeba domu" (dashboard a graf toku energie) se už nepočítá z energetického (kWh) čítače spotřeby domu, ale odvozuje se z aktuálního výkonu FVE, sítě a baterie ve stejné jednotce (kW) - odstraňuje nesmyslně vysoké hodnoty a "zaseklé" grafy s osou naškálovanou na tisíce
- doplněny chybějící obrázky na pozadí stránek Upozornění a Zdraví FVE (`alert-hero.webp`, `health-hero.webp`), které byly v CSS odkazované, ale nikdy nebyly do repozitáře nahrány - zatím jako dočasná kopie hlavní úvodní fotky, doporučeno nahradit vlastními obrázky

## [0.6.32] - 2026-08-15

- cloudový entitlement nyní korektně aplikuje i normální downgrade `SMART/PRO -> FREE`, takže lokální add-on nemůže po změně tarifu ponechat stará placená oprávnění
- doplněny regresní testy pro aktivní downgrade na FREE i fail-closed přechod na FREE při `payment_failed`
- aktuální ozáření se po západu Slunce vždy vynuluje podle výšky Slunce, a to i když fyzický Home Assistant senzor krátce drží starou kladnou hodnotu
- doplněny regresní testy pro noční odhad, stale fyzický senzor ozáření a normální denní měření
- aktualizována instalační a konfigurační dokumentace pro veřejný Home Assistant repozitář a aktuální FREE limity
- ruční konfigurace energetických entit je správně popsána jako volitelný přepis automatického mapování

## [0.6.31] - 2026-08-15

- opraven první restart nové instalace, který mohl zneplatnit právě vytvořený přístupový kód kvůli chybné detekci staré bezpečnostní migrace
- doplněny přesné, jednotkami kontrolované Alpha ESS aliasy pro aktuální výrobu, kumulativní výrobu, import/export sítě, spotřebu domu, SOC a napětí baterie
- automatické uložení konfigurace agenta zachovává `deviceId`, automatizace a další provisionované hodnoty
- Supervisor token předaný pouze procesovým prostředím se nikdy nezapisuje do persistentního `agent-config.json`
- doplněny regresní testy pro první restart, Alpha ESS mapování a bezpečné ukládání konfigurace agenta

## [0.6.30] - 2026-08-15

- zásadní release hardening lokálního add-onu: oddělené neprivilegované procesy webu a agenta, omezený lokální backend a bezpečnější Ingress/LAN hranice
- agent kontroluje čas telemetrie a backend rozlišuje čerstvé a zastaralé spojení, aby web nezobrazoval stará data jako online
- lokální historie, automatizace a příkazy jsou kontrolované také na backendu podle tarifu a typu instalace
- automatizace nad tarifní limit se nemažou; stav vykonávání a lock se zachovávají serverově
- cloudové příkazy a telemetrie jsou izolované při odpojení a opětovném propojení
- zálohy a persistentní soubory mají zpřísněná oprávnění a add-on při pádu kritického procesu ukončí celý runtime místo ponechání částečně funkčního stavu

## [0.6.27] - 2026-08-08

- vlastní Home Assistant nyní bezpečně předává do propojeného Solario Cloud aktuální `automation.*`, takže web může skutečné HA automatizace načíst a zobrazit ve volbě „Vybrat z local system“
- HA automatizace lze z webu bezpečně povolit nebo zakázat; cloud nemůže přes tento kanál volat libovolné služby Home Assistantu
- Solar Box raw Home Assistant entity do cloudu neposílá; ručně ovladatelná zařízení se předávají pouze tarifu PRO
- cloudový device token zůstává šifrovaný v add-onu a do prohlížeče se neposílá; do cloudu se předává pouze allowlist potřebných atributů
- cloudové příkazy se přijímají pouze při čerstvém spojení lokálního HA agenta a znovu procházejí lokálním allowlistem entit a akcí

## [0.6.26] - 2026-08-05

- požadavky Solario Local na `/api/ha/*` nyní vždy používají právě vybranou lokalitu, takže seznam existujících automatizací Home Assistantu nezůstane prázdný kvůli neshodě `siteId`
- výchozí lokalita vyřešená z účtu nebo seznamu lokalit se uloží ještě před prvním načtením Home Assistant entit
- zachována přísná izolace dat mezi lokalitami; explicitně zadané `siteId` se nikdy nepřepisuje

## [0.6.25] - 2026-08-03

- opraveno chybějící připojení `/api/passkeys` v backendu Solario Local, které způsobovalo hlášku „Zařízení se nepodařilo načíst“, nouzové zobrazení FREE 0/0 a nefunkční vytvoření párování
- CI nově přímo ověřuje, že passkey API je v hotovém add-on image skutečně namontované a bez relace vrací 401 místo 404
- správa přihlášených zařízení po aktualizaci načte skutečný tarif a limity Free 2, Smart 5 nebo Pro 8

## [0.6.24] - 2026-08-03

- nové přihlášení přes passkey chráněný Face ID, otiskem prstu nebo PINem zařízení v Solario Local i cloudovém webu
- nové zařízení se přidává přes jednorázové dvouminutové QR párování, které se generuje pouze lokálně v prohlížeči bez odeslání tokenu externí službě
- každé zařízení má vlastní credential, název, poslední aktivitu a samostatnou možnost přejmenování nebo okamžitého odebrání
- odebrané nebo při downgrade pozastavené zařízení ztrácí přístup okamžitě, bez čekání na vypršení relace
- tarifní limity důvěryhodných zařízení jsou Free 2, Smart 5 a Pro 8; zařízení nad limit se při downgrade nemažou, ale bezpečně pozastaví
- doplněna ochrana proti opakovanému použití challenge a párovacího tokenu, kontrola sign counteru, HTTPS originu a RP ID
- cloudové credentialy, párování a challenge jsou uloženy odděleně v PostgreSQL s transakčními zámky a integračními testy
- přístupový kód zůstává dostupný jako záložní a obnovovací způsob přihlášení

## [0.6.23] - 2026-08-03

- add-on automaticky vyhledá bezpečné zdrojové entity podle ID, názvu, jednotky, device_class a state_class; ručně nastavená platná entita má vždy přednost
- chybějící denní a měsíční energetické hodnoty se přesně počítají z kumulativních čítačů a Home Assistant Recorderu bez vytváření pomocníků
- používají se pouze matematicky jednoznačné vztahy; spotřeba domu, teplota, stav baterie a jiné hodnoty se při chybějících nutných vstupech neodhadují
- systémový monitoring rozlišuje ruční zdroj, automaticky nalezenou entitu, přesný výpočet a stav Nenalezeno včetně vzorce a použitých vstupů
- nové instalace již neobsahují pevná ID Alpha ESS ani Shelly; všechna pole entit jsou volitelné ruční přepisy automatické detekce

## [0.6.22] - 2026-08-03

- kompletní správce zařízení je nyní přímo v dashboardové záložce Zařízení; samostatná položka mezi Přehledem a Profilem byla odstraněna
- stará adresa `/devices` bezpečně přesměruje na dashboard, takže nevznikají dvě odlišná místa pro stejnou funkci
- cookie lišta nabízí přijmout vše, odmítnout volitelné kategorie i vlastní výběr analytických a marketingových cookies
- souhlas je verzovaný, validovaný, okamžitě se promítá do profilu a při odvolání maže známá volitelná data z cookies i webového úložiště

## [0.6.21] - 2026-08-03

- automatické denní zálohy PostgreSQL, persistentních dat a konfigurace s uchováním dvou nejnovějších archivů
- tři bezpečné režimy přidání zařízení: Home Assistant, editor a YAML/JSON import
- předpověď výroby pro dnešní den zůstává stabilní po celý pražský kalendářní den

## [0.6.12] - 2026-07-29

- cloudový dashboard načítá propojení zařízení z PostgreSQL, takže po restartu backendu nezůstane chybně na obrazovce „Čeká se na spárování“
- partnerské SMART/PRO zařízení při ověření obnovuje trvalý stav online a jeho živá měření se ukládají do cloudové historie
- stav propojení se na dashboardu automaticky kontroluje každých pět sekund bez ručního obnovení stránky
- cloudový web i add-on mají responzivní hlavičky, navigaci, karty, modální okna, formuláře a párovací obrazovku pro mobil, tablet i notebook
- stránky jsou načítané po částech, takže úvodní JavaScript klesl přibližně ze 760–790 kB na 233 kB
- doplněna přísnější Content Security Policy a ověřeno 0 známých zranitelností ve všech produkčních balíčcích

## [0.6.11] - 2026-07-29

- nový jednorázový SMART/PRO kód může bezpečně znovu aktivovat již známý Solar Box nebo změnit jeho tarif bez vytvoření duplicitního účtu či lokality
- předchozí partnerský token stejné instalace se při úspěšné reaktivaci atomicky zneplatní; každý jednotlivý kód zůstává použitelný právě jednou
- opraveno odmítnutí `409`, které blokovalo nový kód u instalace aktivované starším partnerským kódem

## [0.6.10] - 2026-07-29

- vydávání jednorázových SMART/PRO kódů je dostupné pouze z produkčního Linux backend kontejneru přes šifrované SSH, nikoli přes webové API
- kód se po prvním úspěšném uplatnění definitivně spotřebuje a nelze jej znovu použít ani ve stejné instalaci
- plaintext kódu se nezapisuje do databáze, URL ani aplikačních logů; PostgreSQL uchovává jen HMAC otisk a auditní stav spotřebování

## [0.6.9] - 2026-07-29

- Solar Box po výběru placeného tarifu zobrazí přímo v informačním dialogu pole pro dlouhý jednorázový aktivační kód
- partnerské kódy nově aktivují tarif SMART i PRO podle tarifu zvoleného při jejich vydání
- vydání dalšího partnerského kódu je možné po 30 minutách místo po sedmi dnech
- stávající jednorázové PRO kódy zůstávají platné a bezpečně uložené pouze jako HMAC otisk

## [0.6.8] - 2026-07-28

- partnerská PRO aktivace nyní bezpečně přenese otisk lokálního přístupového kódu a vytvoří odpovídající cloudový účet
- po propojení se lze na `solario.cloud` přihlásit stejným přístupovým kódem jako do Solario Local
- již spotřebovaný PRO kód lze pro stejnou instalaci idempotentně dokončit bez vydání dalšího kódu
- profil propojené instalace nabízí opravu webového přihlášení původním PRO kódem bez nutnosti odpojovat cloud
- cloud při aktivaci vytvoří lokalitu, zařízení, celoživotní PRO předplatné a převezme lokální nastavení, mapování i historii

## [0.6.7] - 2026-07-28

- lokální účet se nově zobrazuje jako „Uživatel“ / „User“ místo technického označení „Administrator“
- existující instalace se starým označením se při načtení bezpečně normalizují bez změny interních oprávnění
- jednorázový partnerský PRO kód používá existující chráněnou aktivaci s uložením pouze kryptografického otisku

## [0.6.6] - 2026-07-28

- uživatelé se Solar Boxem mají spravované tarify; samoobslužná změna nebo zrušení předplatného je blokované v rozhraní i backendu
- editor, import a vlastní změny automatizací jsou pro Solar Box vypnuté, zatímco správcem připravené automatizace zůstávají aktivní pouze ke čtení
- požadavek na novou automatizaci lze odeslat správci fotovoltaiky e-mailem přímo z portálu
- cloud přebírá typ instalace z add-onu a používá stejné omezení tarifů a automatizací
- cloudový web má přepínání češtiny a angličtiny, sjednocené tarify, opravené texty cookies a postup při zapomenutém kódu
- doplněny serverové kontroly konzistence, testy zásad Solar Boxu a bezpečnostní audity produkčních závislostí

## [0.6.5] - 2026-07-26

- po prvním přihlášení je povinný jednorázový výběr mezi Solario Solar Boxem a vlastním Home Assistantem
- typ instalace se trvale ukládá pro danou lokalitu v add-onu a je viditelný v profilu; vzhled i funkce obou variant zůstávají stejné
- opraven závod při obnově relace, který mohl při přímém otevření přes Home Assistant předčasně zobrazit přihlášení
- doplněny anglické překlady průvodce, profilu, cookies, dashboardu a stránky Home Assistant automatizací včetně dynamických časů
