# Solario Local 0.7.17

Solario Local is a local Home Assistant application for solar PV overview, energy balance, diagnostics and safe automations. The default access path uses secured Home Assistant Ingress; direct LAN port 3000 is optional and is not published by default.

## Installation

1. Add `https://github.com/Gonza11125/solar-portal-addon` to Home Assistant repositories.
2. Install **Solario Local** and start it.
3. Open the Web UI directly from Home Assistant through Ingress.
4. On first launch, generate both an access code and a recovery code and store them safely.
5. After the first sign-in, choose the installation type: **your own Home Assistant** or **Solario Solar Box**. The selection is security-locked after initial setup.

The built-in local agent connects to Home Assistant automatically through `homeassistant_api`. A local installation does not generate a separate agent pairing code and does not require an additional inverter connection.

## What changed in 0.7.17

- **HDO is a real tariff at last.** Savings were the day's self-consumed energy times one price, while an `entity_hdo_switch` option sat in the configuration that nothing read. Settings gain a low tariff and a feed-in price, both optional - left empty, everything is computed with the single price exactly as before. With a low tariff set, the day's saving is a running total: each increment of self-consumed energy is priced at the rate in force when it flowed. Monthly and lifetime savings stay on the main price, because there is no basis for splitting them by tariff after the fact.
- **The feed-in price** applies only to exported energy and is shown separately: that is income, not energy the household did not have to buy.
- **entity_bojler_switch and entity_kotel_switch are removed.** They were collected and never read by anything; filling them in did nothing.
- **Long-term history for Pro.** Smart and Pro both kept the same thirty days of detail. There is now a daily aggregate - one row per site per day, a few hundred bytes, so five years of them is smaller than a single day of detail. Local keeps 31 days, Smart a year, Pro five years. Měsíc is thirty bars of real daily totals instead of four figures over the last stored window, and Pro gains a Rok tab.
- **"Search for sensors again"** in Settings. A wrongly mapped source could only be corrected one metric at a time by hand; manual choices are kept.
- **The add-on version is visible** in Settings. The backend read it only for anonymous telemetry.
- **The owner's private email is out of the product.** It was on the sign-in page, in the Profile, in an automation-request link and, worst, in the recovery instructions shown once at registration in both languages. The default is the product's own address and the add-on exposes `support_email`.
- **Paid upgrades are an add-on option** (`paid_upgrades_enabled`) rather than a code change.
- 1075 lines of page modules with no import anywhere are deleted; they were carrying stale prices and copy into every build.

## What changed in 0.7.16

- **"Systém v pořádku" meant only that the agent had reported recently.** A flat battery, a dead sensor or an array that had stopped producing all left it green. It now needs current data, every source the installation has reporting, and no open alert worse than informational.
- **The availability panel on the Dashboard asked whether a value was present in the payload**, which stays true after the sensor behind it dies. It reads the same per-metric diagnostics as Devices and FVE Health, and says whether a source is unmapped or has stopped reporting.
- **The battery is in the energy arithmetic.** "Where the production went" counted charging the battery as consumption at home, and "where the consumption came from" left out what the battery gave back. Both are computed from the stored battery power; where it is unknown the slices say so instead of guessing. Coverage was production over consumption, which reads 100 % on a day with a large export - it is now the share the house did not have to buy.
- **A period is named by the window actually returned.** On Local, Týden gets 24 hours back, and the figures under it were still labelled "za týden".
- **FVE Health**: no battery component on an installation without a battery, no warning for "not producing" at two in the morning (the sun's elevation decides), and one optional string sensor or lifetime counter no longer drags a whole device to "Partly" - the diagnostics carry a `required` flag the interface was ignoring.
- **A custom from-to period on Graphs for Pro.** The plan policy promised it; nothing offered it, because /data/history took only a number of hours. The endpoint accepts `from` and `to`, clamped to what the plan retains and refused outside Pro.
- **The wallbox card has something behind it.** It waited for evPower and evEnergyToday, which nothing produced. They are metrics now - `ev_power` and `ev_energy_today`, discovered from the usual wallbox names, with manual overrides `entity_ev_power` and `entity_ev_energy_today`. Neither is required, so the card stays hidden without a charger.
- **Claims the code does not cover are gone**: Pro promised unlimited locations the add-on cannot create, the promo cards promised EV charging control and production forecasts, and the Alerts page promised to inform you although the add-on sends neither email nor push. Nothing a customer sees says FREE any more (the internal plan id stays `free`).
- **English mode formats in English**: nine call sites used a hardcoded cs-CZ for numbers, dates and times.
- **The settings backup carries the display preferences** (locality, time zone, units, value precision, default page, tips, animations); a restore used to leave every one of them at its default.

## What changed in 0.7.15

- **A day's battery charge read 5 388,8 kWh and the chart axis ran to 8000 "kW".** Instantaneous power has been stored in kW since 0.7.5, but no installation could update past 0.7.4 while the image build was broken, so the rows already in /data were watts. Read as kW they are a thousand times too large, and the battery integral over them a thousand times too large again. The stored history is converted when it loads.
- **Power units are kW in automations too.** The editor asked for watts while the rule engine compared kilowatts, so a rule written as "production > 3000" could never fire; grid export was converted to watts in the same engine, leaving the two power metrics a thousand apart from each other. Thresholds already stored are converted once. The CSV export headers said W for values in kW, and GET /data/export was declared twice.
- **Savings are visible at last**: today, this month and lifetime on the Dashboard, each with the energy it was computed from, and per period on Graphs. A period whose basis the backend does not trust reads "—".
- **Today's balance says whether the house produced more than it used**, and what share of the day's consumption the roof covered.
- **Měsíc and Celkem are no longer the same day relabelled.** The Local plan keeps 24 hours of history, so a month could not be drawn from it. Those tabs now read the cumulative counters the agent derives from Recorder, which really do cover the month and the installation.
- **Devices and FVE Health say what the add-on actually knows.** Both pages derived everything from one flag, so four cards read Online together and "no critical errors" was printed with no condition behind it. They now read the per-metric diagnostics: "Show detail" lists the sources behind a card - entity name, id, current reading, diagnosed issue - an inverter card appears when Home Assistant reports one, and a check the add-on cannot answer says so instead of passing.
- **Alerts have somewhere to live**: a month of history in /data, real counts by severity, and one entry per condition rather than one per reading. Two conditions are evaluated every minute beyond the four the webhooks already fire on: a source that stopped reporting, and the sun well up with the array producing nothing for half an hour.
- **The backup and export cards are gone from Settings.** A backup is written automatically once a day and is now also copied to /share/solario/backups, which the File editor, Samba and the Terminal add-on can reach. Three notification switches remain, and they decide what is actually recorded; the add-on has never sent email or push.
- Graphs gains energy by hour and two splits: where the production went and where the consumption came from.
- Comparison badges no longer report percentages against a baseline too small to compare against, and the chart legend no longer paints outside its card.

## What changed in 0.7.14

- The tariff cards under "Advanced management" on the Profile page were still hardcoded at 9.99 and 19.99 EUR - the last place that had not been converted. They now show what the billing API reports, like the rest of the app. The Smart card also claimed 7 days of history where the add-on actually serves 30.

## What changed in 0.7.13

- **Plan prices are the real ones**: Local 99 CZK, Smart 249 CZK, Pro 499 CZK per month. The billing API served 0 / 9.99 / 19.99 EUR, and the Profile page displayed exactly that.
- Every image is regenerated at twice its size with a resampling pass and a mild unsharp mask. There is no new detail to be had - the sources are the supplied designs - but on a large screen the browser is no longer the thing enlarging the image, which is what made it look soft.
- **The layout now grows with the screen.** Page gutters and gaps derive from the window width, the maximum width goes from 1600 to 2400 px, and above 1700 and 2200 px the cards, icon tiles and type scale up instead of leaving a laptop-sized column in the middle of a large display. Charts hold an aspect ratio rather than a fixed pixel height, so at 2560 px the dashboard chart is 304 px tall where it used to stay at 161 px.
- The "Live data" pill on the Dashboard is sized as a share of the hero image; at wider windows it stopped covering the pill printed into the artwork and the printed one showed from underneath.

## What changed in 0.7.12

- **Updating the add-on works again.** Home Assistant does not build the image, it pulls a prebuilt one from GHCR, and the build for 0.7.7 failed - so the tag it was told to pull never existed. Every update attempt reported "An unknown error occurred". The newest image that existed was 0.7.6. The build gate that stopped it (an English-coverage check over every Czech string) is satisfied again and 0.7.12 is published.
- All eight pages rebuilt against the supplied designs, with every control wired to a real action.
- A day's solar production could read in the hundreds of kWh, because auto-discovery preferred a lifetime counter for the "today" slot and a counter that never resets was published as-is. Both are fixed, and the add-on now checks what a sensor read just after midnight before trusting it.
- Locality, time zone, units, value precision, default page and the tips/animation switches are stored and take real effect.
- Tariffs, limits and prices on the Profile page come from the billing API instead of hardcoded amounts.

## What changed in 0.7.7

- Dozens of buttons across the Home Local UI were purely decorative (no action at all). They now genuinely navigate, save, or download real data.
- All notification and backup toggles in Settings now persist their state.
- Electricity price can actually be edited in Settings and is saved to the server.
- "Backup now" genuinely requests an immediate backup; data/report/diagnostics export buttons download real data.
- The monthly/yearly pricing toggle now actually recalculates prices; support buttons open a real email link.

## What changed in 0.7.6

- Fixed hero photos (Overview, Alerts, FVE Health) being stretched/distorted on desktop - CSS forced a fixed aspect-ratio stretch there, while the correct proportion-preserving "cover" sizing accidentally only existed in the mobile stylesheet.
- Dashboard metric cards (PV, Consumption, Battery, Grid) are now fully opaque so the background photo no longer shows through them.
- Replaced the dashboard hero photo with a cleaner crop that fits the wide banner without needing heavy cropping.

## What changed in 0.7.5

- Power-type entities reported in Watts by Home Assistant are now correctly converted to kW (previously shown 1000x too large, e.g. "11 064,0 kW" instead of "11,1 kW").
- Fixed a false "offline" status caused by strict clock comparison: a container clock running slightly ahead of the browser's clock could make fresh data look stale.

## What changed in 0.7.4

Version 0.7.4 adds real-time grid and battery power to the data pipeline:

- new optional entity overrides `entity_grid_power` and `entity_battery_power` (instantaneous W), plus automatic discovery for both - these values were previously always zero because nothing collected them, even though the dashboard and energy-flow widget already displayed them,
- the 24-hour history now stores instantaneous grid/battery power per point, so the "Consumption" and "Grid" lines in the energy chart are computed from real data instead of the cumulative energy (kWh) counter,
- the battery state-of-charge (%) line in the chart now uses its own right-hand axis instead of sharing (and distorting) the kW-scaled axis.

## What changed in 0.7.3

Version 0.7.3 fixes several display bugs in the redesigned "Home Local" light UI introduced in 0.7.0-0.7.2:

- fixed a duplicated "LOCAL" word in the sidebar logo,
- the "Online"/"Připojeno" connection badges on the Devices and Settings pages now reflect the real Home Assistant/agent connection state instead of always showing connected,
- the real-time "Home consumption" figure on the Dashboard and Graphs pages is now derived from live power readings (PV, grid, battery) instead of an energy (kWh) counter, which previously produced implausible values and distorted chart scaling,
- added the previously missing background images for the Alerts and FVE Health pages.

Versions 0.6.44 through 0.7.2 introduced the redesigned light "Home Local" experience; see `CHANGELOG.md` for the full history.

## What changed in 0.6.43

Version 0.6.43 is a maintenance update focused on internal technical reliability:

- improved consistency of background Local ↔ Cloud communication,
- refined behavior during restart, reconnect and temporary Cloud unavailability,
- improved internal synchronization and state handling,
- no intentional changes to the normal UI, installation flow or day-to-day operation.

The battery SOC improvements from 0.6.42 and the savings currency/free-form price-per-kWh improvements introduced in 0.6.41 remain included. Solario does **not** perform foreign-exchange conversion: enter the electricity price in the selected currency per kWh.

## Sensors and automatic mapping

Manual entity fields in the add-on configuration are optional overrides. If left empty, Solario searches for suitable sources using entity ID, friendly name, unit, `device_class` and `state_class`.

Version 0.6.40 expanded Deye / Solarman support for real-world `sensor.inverter_*` naming and added the searchable manual entity picker. If automatic discovery misses a source or chooses a technically compatible but semantically wrong sensor, open **Change sensor**, search by friendly name or entity ID and save the correct compatible source. Manual choices persist across restarts and can be reset back to automatic discovery.

Supported energy mappings include current PV power, today's energy, battery SOC/voltage, grid import/export, home consumption, total solar production, inverter power, string 1–4 power and 10-minute production maximum/average.

## Energy calculations and savings

Cumulative energy counters are converted into today's and current month's values using Home Assistant Recorder data. Recorder statistics may be used when raw history around the beginning of a period is unavailable.

Savings are calculated as:

**self-consumed PV energy in kWh × configured electricity price per kWh**

If a trustworthy period baseline is not available, Solario leaves that period temporarily unavailable rather than presenting an unverified estimate as an exact value.

## FREE plan

FREE provides the local foundation for a user's own Home Assistant installation:

- current PV production, battery and energy-balance overview,
- daily, monthly and lifetime energy values when Home Assistant provides the required data,
- local diagnostics of source entities and data quality,
- weather and current solar conditions,
- charts with up to 24 hours of history,
- 1 custom Solario automation,
- existing Home Assistant `automation.*` entities can be displayed/used without consuming the custom Solario automation slot,
- automatic entity discovery with searchable manual overrides,
- selectable savings currency,
- Czech and English UI.

AI recommendations, general device editor/import and general manual device control are not active in FREE and require PRO.

## Anonymous version statistics

Anonymous usage statistics are **disabled by default**. When explicitly enabled, Solario reports only a random installation identifier, the Solario Local version and architecture (`amd64` or `aarch64`). The cloud stores a one-way hash of the random installation identifier. Home Assistant entity names, energy values, access codes and credentials are not included.

## Security and restart behavior

The backend runs locally inside the add-on, PostgreSQL is not exposed to the network, and Home Assistant Ingress is the default access method. The Supervisor token is provided only to the collection agent and is not written to the agent's persistent configuration.

Access credentials, settings, entity mappings, built-in agent identity, automations and energy trackers are persisted in `/data`. A normal add-on restart therefore does not require a new registration.

## Supported platforms

- `amd64`
- `aarch64`

For detailed configuration and technical behavior, see [`DOCS.md`](DOCS.md).

More information and paid plans: `https://solario.cloud`