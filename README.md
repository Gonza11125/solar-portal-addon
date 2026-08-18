# Solario Local for Home Assistant

**Solario Local** is a local Home Assistant app for solar PV monitoring, energy overview, diagnostics and safe automations.

Current stable version: **0.6.40**  
Supported architectures: **amd64** and **aarch64**

## What's new in 0.6.40

- expanded Deye / Solarman entity discovery for real-world `sensor.inverter_*` naming, including `energy_import`, `energy_export`, `pv_power` and `battery_capacity`,
- searchable and filtered manual entity picker with recommended compatible sensors,
- manual correction of a technically valid but semantically wrong auto-detected sensor,
- persistent manual overrides with a reset back to automatic discovery,
- searchable savings currency picker by ISO code or currency name,
- free numeric electricity price per kWh instead of the former CZK-only 1–15 slider,
- selected currency is used consistently in savings cards, price/kWh labels, chart axis, tooltips and historical savings,
- historical savings are repriced consistently when the configured price or currency changes,
- optional anonymous version telemetry so Solario Cloud can show version adoption without collecting Home Assistant entity data.

> **Compatibility note:** Solario reads existing Home Assistant entities; it does not connect directly to an inverter or data logger. Alpha ESS is a verified setup. Deye / Sunsynk / Sol-Ark installations exposed through the Home Assistant Solarman integration are explicitly supported and 0.6.40 broadens that support with additional real-world naming variants and a manual fallback picker. Other integrations can still be used through automatic discovery or manual entity selection.

[![Add Solario Local repository to Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGonza11125%2Fsolar-portal-addon)

## What Solario Local does

Solario Local turns Home Assistant solar and energy entities into a dedicated photovoltaic-system interface. The built-in agent reads Home Assistant states and selects suitable sources using entity IDs, names, units, `device_class` and `state_class`.

The FREE version currently provides:

- live PV production overview,
- battery state of charge and available battery information,
- grid import/export and home energy overview when the required entities are available,
- daily, monthly and lifetime PV energy values when Home Assistant provides sufficient source data,
- estimated solar savings based on the configured electricity price and PV energy consumed on site,
- selectable savings currency,
- weather and current solar conditions,
- PV/source diagnostics including string power when suitable entities are available,
- charts with up to **24 hours of history**,
- **1 Solario automation**,
- display/use of existing Home Assistant `automation.*` entities without consuming the single Solario automation slot,
- automatic entity discovery with searchable manual overrides,
- Czech and English UI with instant language switching.

AI recommendations, the general device editor/import workflow and general manual device control are not included in FREE and require PRO.

## Installation

### One click

1. Click **Add Solario Local repository to Home Assistant** above.
2. Confirm the repository in Home Assistant.
3. Open **Solario Local** in the app/add-on store.
4. Install and start it.
5. Open the Web UI through Home Assistant Ingress.
6. On first launch, generate and securely save both the access code and recovery code.

### Manual installation

If the button does not work, add this repository manually:

`https://github.com/Gonza11125/solar-portal-addon`

Then refresh the app/add-on store, open **Solario Local**, install it and start it.

## Home Assistant connection

The built-in local agent connects automatically through Home Assistant `homeassistant_api`. A local Home Assistant installation does not require a separate agent pairing code or another inverter connection.

Solario consumes entities that already exist in Home Assistant. For example, if Deye is exposed through the Solarman integration, Solario reads those Solarman-created entities rather than opening a second direct connection to the inverter/logger.

The default access path is secured Home Assistant Ingress. Direct LAN port `3000` is optional and is not published by default.

## Automatic entity discovery and manual fallback

Manual entity fields in the add-on configuration remain optional overrides. When they are empty, Solario attempts to discover suitable sources automatically.

Discovery evaluates entity ID, friendly name, unit, `device_class` and `state_class`. Known aliases are accepted only when the entity exists, is available, contains a numeric value and has a compatible unit.

Version 0.6.40 also adds an in-app entity picker. If automatic discovery misses a source or selects the wrong compatible sensor, the user can open **Change sensor**, search by friendly name or entity ID, choose from ranked compatible candidates and save the override. Manual choices persist across restarts and can later be reset back to automatic discovery.

Supported energy mappings include current PV power, today's energy, battery SOC/voltage, grid import/export, home consumption, total solar production, inverter power, string 1–4 power and 10-minute production maximum/average.

Optional comfort/control overrides include room temperature, room humidity, boiler switch, HDO switch and heating/boiler switch.

## Energy calculations and savings

When Home Assistant exposes cumulative energy counters, Solario uses Home Assistant Recorder data to derive calendar-period values such as today's and current month's production. Recorder statistics can be used when raw history around the beginning of a period is unavailable.

Solario does not intentionally turn an unverified estimate into an exact value. If a trustworthy period baseline cannot be obtained, that period remains temporarily unavailable and a later collection attempts the calculation again.

Savings are calculated as:

**self-consumed PV energy in kWh × configured electricity price per kWh**

The user selects the currency and enters the real electricity price in that currency. Solario does not perform foreign-exchange conversion. The same selected currency is used in the savings cards, price-per-kWh labels, graph axis and tooltips.

The former fixed 1–15 CZK/kWh slider has been removed. Version 0.6.40 accepts a normal numeric price input, so values such as `0.25 EUR/kWh`, `6.20 CZK/kWh` or prices in currencies with much larger nominal units work correctly.

## Anonymous version statistics

Anonymous usage statistics are **disabled by default** and must be explicitly enabled in the add-on options.

When enabled, Solario Local reports only:

- a random installation identifier,
- the Solario Local version,
- the architecture (`amd64` or `aarch64`).

The cloud stores a one-way hash of the random installation identifier. Home Assistant entity names, energy values, access codes and credentials are not part of this version-adoption report.

These opt-in reports are used to show how many reporting installations are running each release. They are not presented as the total number of all Solario installations or GHCR downloads.

## Automations

FREE allows **1 custom Solario automation**. Existing native Home Assistant `automation.*` entities do not consume this slot.

Automations above the active plan limit are not deleted; they are locked or paused according to their origin and active plan.

## Language support

The interface supports **English and Czech**. Entity, device and automation names coming directly from Home Assistant remain unchanged because they are user-defined data.

## Security and persistence

- Default UI access uses Home Assistant Ingress.
- Backend services remain local to the add-on.
- PostgreSQL is not exposed to the network.
- The Home Assistant Supervisor token is provided only to the collection agent and is not written to the agent's persistent configuration.
- Access credentials, local settings, entity mappings, built-in agent identity, automations and energy trackers are persisted in `/data`.
- A normal add-on restart does **not** require a new registration.
- Maximum JSON request body: **1 MiB**.

The access code and recovery code are shown during initial registration and should be stored safely.

## FREE plan limits

FREE limits are enforced server-side:

- history: maximum **24 hours**,
- custom Solario automations: **1**,
- native Home Assistant `automation.*`: not counted against that slot,
- standard safe Home Assistant entity overview: available,
- general device editor/import and general manual device control: PRO,
- AI recommendations: disabled in FREE.

## Distribution

This public repository contains Home Assistant release metadata and public documentation. The application is distributed as the pre-built multi-architecture image `ghcr.io/gonza11125/solario-local`.

For detailed configuration and technical behavior, see [`solar_portal/DOCS.md`](solar_portal/DOCS.md).

More information: `https://solario.cloud`
