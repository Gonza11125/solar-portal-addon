# Solario Local 0.6.36

Solario Local is a local Home Assistant application for solar PV overview, energy balance, diagnostics, and safe automations. The default access path uses secured Home Assistant Ingress; direct LAN port 3000 is optional and is not published by default.

## Installation

1. Add `https://github.com/Gonza11125/solar-portal-addon` to Home Assistant repositories.
2. Install **Solario Local** and start it.
3. Open the Web UI directly from Home Assistant through Ingress.
4. On first launch, generate both an access code and a recovery code and store them safely.
5. After the first sign-in, choose the installation type: **your own Home Assistant** or **Solario Solar Box**. The selection is security-locked after initial setup.

The built-in local agent connects to Home Assistant automatically through `homeassistant_api`. A local installation does not generate a separate agent pairing code and does not require an additional integration.

## English and Czech

The Solario Local interface is available in English and Czech. Language switching applies to the dashboard, diagnostics, automations, profile, onboarding, QR/passkey states, user-facing errors, dynamic messages, email links, and date/time/currency formatting.

Version 0.6.36 fixes mixed Czech/English runtime text in panel diagnostics. The broad fragment `je` → `is` can no longer affect arbitrary Czech sentences, and low-power diagnostic messages are translated as complete semantic units. The release audit also checks that this runtime protection remains active.

Entity, device, and automation names received directly from Home Assistant remain user-defined and are not automatically translated.

## FREE plan

FREE is the complete local foundation for a user's own Home Assistant installation:

- current PV production, battery, and energy-balance overview,
- daily, monthly, and lifetime energy values when Home Assistant provides the required data,
- local diagnostics of source entities and their data quality,
- weather and current solar conditions,
- charts with up to 24 hours of history,
- 1 custom Solario automation,
- existing Home Assistant `automation.*` entities can be displayed/used without consuming the custom Solario automation slot,
- AI recommendations are not active in FREE,
- general manual device editor/import and general manual device control are PRO features.

Plan limits are enforced by the backend and are not only hidden in the web interface.

## Sensors and automatic mapping

Manual entity fields in the add-on configuration are optional overrides. If left empty, Solario searches for suitable sources using entity ID, name, unit, `device_class`, and `state_class`.

Exact aliases are also supported for common Alpha ESS entities covering current PV power, total PV production, total grid import, total grid export, home consumption, battery state of charge, and battery voltage.

## Daily and monthly energy

Cumulative energy counters are converted into today's and current month's values using Home Assistant Recorder data. Recorder statistics may be used when raw history around the beginning of the period is unavailable.

Version 0.6.36 fixes a 0.6.35 condition where the first unsuccessful Recorder lookup could save the current cumulative value as the period baseline and produce a persistent false monthly zero. Without a trustworthy baseline, Solario now stores no false baseline, leaves the period temporarily unavailable, and retries automatically during later collection.

Daily and monthly calculations are independent. An unavailable monthly baseline therefore does not block valid daily energy. The backend treats monthly savings as reliable only when the current payload actually contains monthly production.

When upgrading from 0.6.35, only derived periodic trackers are rebuilt once. Account data, configuration, access/recovery codes, automations, and Home Assistant data are not deleted.

## Solar savings

Savings are based on the configured electricity price and PV energy actually consumed on site. If production and export data are available, self-consumed PV energy is calculated as production minus export. Monthly and lifetime savings use the corresponding monthly/lifetime energy sources.

If the monthly basis is not yet trustworthy, Solario must not present it as a reliable value. Once Recorder provides a valid monthly delta, the calculation recovers automatically.

Current irradiance is always 0 W/m² when sun elevation is zero or below, even if a Home Assistant sensor briefly retains an old positive value after sunset.

## PV diagnostics

Solario can use individual string-power entities when available. It can compare string values together with recent production context. When production is too low for a reliable comparison, the interface reports that condition rather than treating a large percentage difference as a confirmed fault.

## Security and restart behavior

The backend runs locally inside the add-on, PostgreSQL is not exposed to the network, and Home Assistant Ingress is the default access method. The Supervisor token is provided only to the collection agent and is not written to the agent's persistent configuration.

Access credentials, settings, entity mappings, built-in agent identity, automations, and energy trackers are persisted in `/data`. A normal add-on restart therefore does not require a new registration.

## Supported platforms

- `amd64`
- `aarch64`

For detailed configuration and technical behavior, see [`DOCS.md`](DOCS.md).

More information and paid plans: `https://solario.cloud`
