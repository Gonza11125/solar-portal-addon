# Konfigurace Solario Local 0.6.32

Solario Local je navržen tak, aby nová instalace fungovala bez ručního vypisování energetických entit. Vestavěný agent načte stavy z Home Assistantu a bezpečně vybere použitelné zdroje podle ID, názvu, jednotky, `device_class` a `state_class`. Ruční pole v konfiguraci add-onu jsou volitelné přepisy automatického výběru.

## Základní konfigurace

Výchozí interval čtení je 5000 ms. Povolený rozsah je 1000–60000 ms.

Volitelné ruční přepisy energetických entit:

- `entity_power_now`
- `entity_energy_today`
- `entity_battery_soc`
- `entity_battery_voltage`
- `entity_grid_import`
- `entity_grid_export`
- `entity_home_consumption`
- `entity_solar_production`
- `entity_inverter_power`
- `entity_string_1_power` až `entity_string_4_power`
- `entity_production_max_10min`
- `entity_production_avg_10min`

Volitelné komfortní/řídicí entity:

- `entity_room_temperature`
- `entity_room_humidity`
- `entity_bojler_switch`
- `entity_hdo_switch`
- `entity_kotel_switch`

Prázdné pole znamená „nechat Solario zdroj bezpečně objevit“. Ručně vybraná platná entita má před automatickým objevováním přednost.

## Alpha ESS a energie

Aktuální verze obsahuje přesně kontrolované aliasy pro běžné Alpha ESS entity. Alias se použije pouze tehdy, když konkrétní entita existuje, je dostupná, má číselnou hodnotu a kompatibilní jednotku.

Pokud Home Assistant poskytuje kumulativní čítač energie, agent z něj pomocí Home Assistant Recorderu odvozuje hodnotu za dnešek, aktuální měsíc a celoživotní hodnotu. Trackery jsou persistentní a chrání se proti resetu kumulativního čítače i krátkému falešnému nulovému stavu senzoru.

Pokud pro přesný výpočet chybí historie, Solario neoznačí neověřený odhad za přesnou hodnotu; diagnostika ukáže použitý zdroj a stav výpočtu.

## Tarif FREE

Serverově vynucené limity FREE:

- historie maximálně 24 hodin,
- 1 vlastní Solario automatizace,
- nativní Home Assistant `automation.*` se do tohoto jednoho slotu nepočítají,
- běžný bezpečný přehled Home Assistant entit je dostupný,
- obecné ruční ovládání zařízení a editor/import zařízení vyžadují PRO,
- AI doporučení jsou ve FREE vypnutá.

Automatizace nad aktuální tarifní limit se nemažou; jsou uzamčeny/pozastaveny podle svého původu a aktuálního plánu.

## Počasí a sluneční podmínky

Solario umí použít Home Assistant `weather.*`, `sun.sun` nebo vhodný senzor výšky Slunce. Pokud není dostupný fyzický senzor ozáření, může aktuální ozáření odvodit z počasí a výšky Slunce.

Při `sunElevation <= 0` je aktuální ozáření vždy 0 W/m². Toto pravidlo platí i tehdy, když fyzický Home Assistant senzor po západu Slunce krátce drží starou kladnou hodnotu.

## Síť a persistentní data

- HA API: `http://supervisor/core`
- backend: `127.0.0.1:5000`
- Ingress: port 8099, pouze Home Assistant Ingress proxy
- lokální Web UI: port 3000, ve výchozím stavu bez host mappingu
- maximální JSON body: 1 MiB

Přístupový i obnovovací kód se při první registraci zobrazí jednou. Stav účtu, lokální nastavení, identita agenta, automatizace a energetické trackery jsou uložené v persistentním `/data`, takže běžný restart nevyžaduje novou registraci.
