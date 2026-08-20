# Solario Local 0.6.42

Solario Local is a local Home Assistant application for solar PV overview, energy balance, diagnostics and safe automations. The default access path uses secured Home Assistant Ingress; direct LAN port 3000 is optional and is not published by default.

## Installation

1. Add `https://github.com/Gonza11125/solar-portal-addon` to Home Assistant repositories.
2. Install **Solario Local** and start it.
3. Open the Web UI directly from Home Assistant through Ingress.
4. On first launch, generate both an access code and a recovery code and store them safely.
5. After the first sign-in, choose the installation type: **your own Home Assistant** or **Solario Solar Box**. The selection is security-locked after initial setup.

The built-in local agent connects to Home Assistant automatically through `homeassistant_api`. A local installation does not generate a separate agent pairing code and does not require an additional inverter connection.

## What changed in 0.6.42

Version 0.6.42 improves battery SOC reliability in Solario Local:

- missing or unmapped SOC is shown as unavailable instead of a false `0 %`,
- unavailable SOC no longer triggers false low-battery or high-battery messages,
- a genuine measured `0 %` remains valid and is still displayed as zero,
- missing SOC history samples are not plotted as artificial zero points,
- Alpha ESS discovery also recognizes `sensor.alpha_ess_battery_soc` and `sensor.alpha_ess_battery_state_of_charge`, while `sensor.alpha_ess_soc_battery` remains the primary exact alias,
- SOC aliases are accepted only for percentage-compatible sensors.

The savings currency and free-form price-per-kWh improvements introduced in 0.6.41 remain included. Solario does **not** perform foreign-exchange conversion: enter the electricity price in the selected currency per kWh.

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
