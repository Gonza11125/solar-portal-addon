# Solario Local for Home Assistant

**Solario Local** is a local Home Assistant app for solar PV monitoring, energy overview, diagnostics and safe automations.

Current stable version: **0.6.36**  
Supported architectures: **amd64** and **aarch64**

[![Add Solario Local repository to Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGonza11125%2Fsolar-portal-addon)

## What Solario Local does

Solario Local turns Home Assistant solar and energy entities into a dedicated interface for a photovoltaic system. It is designed to work with minimal manual configuration: the built-in agent reads Home Assistant states and selects suitable sources using entity IDs, names, units, `device_class` and `state_class`.

The FREE version currently provides:

- live PV production overview,
- battery state of charge and available battery information,
- grid import/export and home energy overview when the required entities are available,
- daily, monthly and lifetime PV energy values when Home Assistant provides sufficient source data,
- estimated solar savings based on the configured electricity price and PV energy consumed on site,
- weather and current solar conditions,
- PV/source diagnostics including string power when suitable entities are available,
- charts with up to **24 hours of history**,
- **1 Solario automation**,
- display/use of existing Home Assistant `automation.*` entities without consuming the single Solario automation slot,
- automatic entity discovery with optional manual overrides,
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

Refresh the app/add-on store, open **Solario Local**, install it and start it.

## Home Assistant connection

The built-in local agent connects automatically through Home Assistant `homeassistant_api`. A local Home Assistant installation does not require a separate agent pairing code or another integration.

The default access path is secured Home Assistant Ingress. Direct LAN port `3000` is optional and is not published by default.

## Automatic entity discovery

Manual entity fields in the add-on configuration are optional overrides. When they are empty, Solario attempts to discover suitable sources automatically.

Discovery evaluates the entity ID, friendly name, unit, `device_class` and `state_class`. Exact aliases are also included for common Alpha ESS entities, but an alias is only accepted when the entity exists, is available, contains a numeric value and has a compatible unit.

Available manual energy overrides include current PV power, today's energy, battery SOC/voltage, grid import/export, home consumption, total solar production, inverter power, string 1–4 power and 10-minute production maximum/average.

Optional comfort/control overrides include room temperature, room humidity, boiler switch, HDO switch and heating/boiler switch.

## Energy calculations

When Home Assistant exposes cumulative energy counters, Solario uses Home Assistant Recorder data to derive calendar-period values such as today's and current month's production. Recorder statistics can be used when raw history around the beginning of a period is unavailable.

Solario does not intentionally turn an unverified estimate into an exact value. If a trustworthy period baseline cannot be obtained, that period remains temporarily unavailable and a later collection attempts the calculation again. Daily and monthly baselines are handled independently.

### Solar savings

Savings are calculated from the configured electricity price and PV energy actually consumed on site. When production and export data are available, self-consumed solar energy is calculated as production minus exported energy. Monthly and lifetime savings use their corresponding energy periods.

A monthly saving is treated as reliable only when monthly production is explicitly available in the current data payload.

## PV diagnostics

Solario provides local diagnostics for the Home Assistant sources used by the PV system. Where string-power entities are available, it can compare individual string values and supporting recent production information. The UI explains when production is too low for a reliable comparison instead of presenting a low-light comparison as a confirmed fault.

Diagnostics also expose the source/calculation state where data quality matters, helping distinguish measured values from derived or temporarily unavailable values.

## Weather and solar conditions

Solario can use Home Assistant `weather.*`, `sun.sun`, or a suitable sun-elevation sensor. If no physical irradiance sensor is available, current irradiance may be derived from weather and sun elevation.

When `sunElevation <= 0`, current irradiance is forced to **0 W/m²**, including cases where a physical Home Assistant sensor briefly retains an old positive value after sunset.

## Automations

FREE allows **1 custom Solario automation**. Existing native Home Assistant `automation.*` entities do not consume this slot.

Automations above the active plan limit are not deleted; they are locked or paused according to their origin and the active plan.

## Language support

The interface supports **English and Czech**. Language switching covers the main dashboard, diagnostics, automations, profile, onboarding, security/QR states, dynamic messages, user-facing errors, pre-filled email text, and date/time/currency formatting.

Entity, device and automation names coming directly from Home Assistant remain unchanged because they are user-defined data.

## Security and persistence

- Default UI access uses Home Assistant Ingress.
- Backend services remain local to the add-on.
- PostgreSQL is not exposed to the network.
- The Home Assistant Supervisor token is provided only to the collection agent and is not written to the agent's persistent configuration.
- Access credentials, local settings, entity mappings, built-in agent identity, automations and energy trackers are persisted in `/data`.
- A normal add-on restart therefore does **not** require a new registration.
- Maximum JSON request body: **1 MiB**.

The access code and recovery code are shown during initial registration and should be stored safely.

## FREE plan limits

FREE limits are enforced server-side, not only hidden in the web interface:

- history: maximum **24 hours**,
- custom Solario automations: **1**,
- native Home Assistant `automation.*`: not counted against that slot,
- standard safe Home Assistant entity overview: available,
- general device editor/import and general manual device control: PRO,
- AI recommendations: disabled in FREE.

## Supported platforms

- `amd64`
- `aarch64`

## Distribution

This public repository contains Home Assistant release metadata and public documentation. The application is distributed as the pre-built multi-architecture image `ghcr.io/gonza11125/solario-local`.

For detailed configuration and technical behavior, see [`solar_portal/DOCS.md`](solar_portal/DOCS.md).

More information: `https://solario.cloud`
