# Solario Local 0.6.32

Solario Local je lokální Home Assistant aplikace pro přehled fotovoltaiky, energetickou bilanci, diagnostiku a bezpečné automatizace. Výchozí přístup běží přes zabezpečený Home Assistant Ingress; přímý LAN port 3000 je volitelný a ve výchozím stavu není publikovaný.

## Instalace

1. V Home Assistantu přidejte repozitář `https://github.com/Gonza11125/solar-portal-addon`.
2. Nainstalujte **Solario Local** a spusťte jej.
3. Otevřete Web UI přímo z Home Assistantu přes Ingress.
4. Při prvním otevření vygenerujte přístupový i obnovovací kód a oba bezpečně uložte.
5. Po prvním přihlášení zvolte typ instalace: **vlastní Home Assistant** nebo **Solario Solar Box**. Volba se po prvním nastavení bezpečnostně uzamkne.

Vestavěný lokální agent se s Home Assistantem propojuje automaticky přes `homeassistant_api`. Pro lokální instalaci se negeneruje žádný párovací kód agenta a není potřeba přidávat další integraci.

## Tarif FREE

FREE je plnohodnotný lokální základ pro vlastní Home Assistant:

- přehled aktuální výroby, baterie a energetické bilance,
- dnešní, měsíční a celkové energetické hodnoty, pokud pro ně Home Assistant poskytuje potřebná data,
- lokální diagnostika zdrojových entit a jejich kvality,
- počasí a aktuální solární podmínky,
- grafy s historií maximálně 24 hodin,
- 1 vlastní Solario automatizace,
- existující `automation.*` z Home Assistantu lze zobrazit a přidat do Solaria bez čerpání limitu vlastní Solario automatizace,
- AI doporučení nejsou ve FREE aktivní,
- ruční editor/import zařízení a obecné ruční ovládání zařízení jsou funkce tarifu PRO.

Tarifní limity jsou kontrolované i na backendu; nejde jen o skrytí tlačítek ve webovém rozhraní.

## Senzory a automatické mapování

Ruční pole entit v konfiguraci add-onu jsou volitelné přepisy. Pokud je necháte prázdná, Solario bezpečně hledá vhodné zdroje podle ID entity, názvu, jednotky, `device_class` a `state_class`.

Pro běžné Alpha ESS entity jsou navíc podporované přesné aliasy pro aktuální výkon FVE, celkovou výrobu FVE, celkový odběr ze sítě, celkové přetoky do sítě, spotřebu domu, stav baterie a napětí baterie.

Kumulativní energetické čítače se pomocí Home Assistant Recorderu převádějí na hodnoty za dnešek a aktuální měsíc. Pokud přesný výpočet není možný, Solario hodnotu raději označí jako nedostupnou nebo nespolehlivou, než aby ji odhadovalo jako přesnou.

## Úspora FVE

Úspora vychází z ceny elektřiny a z energie FVE skutečně spotřebované doma. Pokud jsou k dispozici výroba a přetoky, vlastní spotřeba se počítá přesně jako výroba minus přetoky. Měsíční a celková úspora používá odpovídající měsíční/celkové energetické podklady.

Aktuální ozáření je při záporné nebo nulové výšce Slunce vždy 0 W/m², i pokud Home Assistant senzor po západu krátce drží starou kladnou hodnotu.

## Bezpečnost a restart

Backend běží pouze lokálně uvnitř add-onu, PostgreSQL není publikovaný do sítě a Home Assistant Ingress je výchozí způsob přístupu. Supervisor token dostává pouze sběrný agent a není zapisován do persistentní konfigurace agenta.

Přístupové údaje, nastavení, mapování entit, identita vestavěného agenta a energetické trackery jsou persistentní v `/data`. Běžný restart add-onu proto nevyžaduje novou registraci.

## Podporované platformy

- `amd64`
- `aarch64`

Další informace a placené tarify: `https://solario.cloud`
