# Solario Local 0.7.40 — Configuration and Technical Documentation

Solario Local is designed so that a new installation can work without manually entering every energy entity. The built-in agent reads states from Home Assistant and safely selects usable sources using entity ID, name, unit, `device_class`, and `state_class`. Manual fields in the add-on configuration are optional overrides for automatic discovery.

## Interface language

Solario Local supports both English and Czech. Language switching applies to the main screens, diagnostics, automations, profile, onboarding, security/QR states, dynamic messages, user-facing error responses, text pre-filled into email links, and date/time/currency formatting.

Since version 0.6.35, the production image uses a strict audit for uncovered Czech user-facing strings. Version 0.6.36 adds a runtime safety check against overly broad grammatical fragments. In particular, a global `je` → `is` replacement must not be applied to arbitrary DOM sentences; diagnostic messages are translated as complete semantic units.

Entity, automation, and device names received from Home Assistant are not translated because they are user-defined data.

## Basic configuration

The default polling interval is **5000 ms**. The allowed range is **1000–60000 ms**.

Optional manual energy entity overrides:

- `entity_power_now`
- `entity_energy_today`
- `entity_battery_soc`
- `entity_battery_voltage`
- `entity_grid_import`
- `entity_grid_export`
- `entity_grid_power`
- `entity_battery_power`
- `entity_home_consumption`
- `entity_home_power` (optional instantaneous home power in kW for exact power-alert evaluation)
- `entity_solar_production`
- `entity_inverter_power`
- `entity_string_1_power` through `entity_string_4_power`
- `entity_production_max_10min`
- `entity_production_avg_10min`
- `entity_ev_power` (wallbox charging power)
- `entity_ev_energy_today` (energy charged today)

Optional comfort/control entities:

- `entity_room_temperature`
- `entity_room_humidity`
- `entity_hdo_switch` (low-tariff switch; while it is on, energy used is priced at the low rate)

An empty field means: let Solario safely discover the source. A valid manually selected entity takes precedence over automatic discovery.

## History by plan

History is kept at three resolutions, because each costs differently:

- **detailed** (a reading every few minutes) - Local a day and a week, Smart and Pro a month,
- **hourly** (one row per hour) - Local 7 days, Smart 31 days, Pro 366 days,
- **daily** (one row per day) - Local 31 days, Smart a year, Pro 5 years.

A year of detailed readings would be tens of megabytes rewritten every minute,
so Pro does not reach further by keeping more detail but through the coarser
rows: any day of the past year opens from its hourly rows and still has its
shape, and whole periods are summed from the daily ones.

The tabs on the Graphs page match what the plan will actually serve. "Celkem"
is available on every plan - it does not read stored history at all, but the
lifetime counters from Home Assistant.

## Support address and paid plans

`support_email` sets the address printed in the recovery instructions and on the
sign-in page; left empty it falls back to the product's own mailbox.
`paid_upgrades_enabled` decides whether the Smart and Pro checkout is offered at
all; it is off by default.

## Two-tariff savings and feed-in

The electricity price is the main (high) rate. The low rate and the feed-in
price may both be left empty, in which case everything is computed with the one
price exactly as before.

With a low rate set, the day's saving is not taken at the end of the day at one
price: each increment of self-consumed energy is priced at the rate in force
when it flowed, following the state of `entity_hdo_switch`. Monthly and lifetime
savings stay on the main price, because there is no basis for splitting them by
tariff after the fact.

The feed-in price applies only to energy exported to the grid and is shown
separately from savings - it is income, not energy that did not have to be
bought.

## Alpha ESS and energy data

The current version includes tightly controlled aliases for common Alpha ESS entities. An alias is used only when the specific entity exists, is available, has a numeric value, and uses a compatible unit.

If Home Assistant provides a cumulative energy counter, the agent uses Home Assistant Recorder data to derive today's, current month's, and lifetime values. If raw history around the beginning of a period is missing, the calendar baseline may be recovered from Recorder statistics.

Version 0.6.36 changes the behavior when the Recorder baseline is unavailable: if a trustworthy baseline cannot be obtained, the agent does not save the current cumulative value as the start of the period and does not publish a false periodic zero from it. The period remains temporarily unavailable and a later collection automatically retries the calculation.

Daily and monthly baselines are handled independently. A failure to obtain the monthly baseline must therefore not suppress valid daily energy. The backend also treats monthly savings as reliable only when monthly production is explicitly available in the current payload.

When upgrading from 0.6.35, only the derived periodic tracker file is removed once and rebuilt from Home Assistant data. The account, local settings, mappings, automations, access/recovery codes, and Home Assistant data are not deleted.

If history or reliable statistical data required for an exact calculation is missing, Solario does not label an unverified estimate as an exact value. Diagnostics show the source and calculation state where applicable.

## Local / Smart / Pro capability matrix

The backend has one canonical plan policy and the UI advertises those same enforced capabilities:

- **Local (internal id `free`)**: detailed history up to 7 days, Day/Week tabs, basic economics, current system status, fixed built-in alerts, automation catalogue/request flow, and 0 commissioned automations included.
- **Smart**: detailed history up to 30 days, Month tab, detailed economics, 30-day system-status history, editable built-in alert thresholds, remote Cloud access/push, and 1 commissioned automation included.
- **Pro**: 30 days of detailed history plus 366 days of hourly history and 5 years of daily history, Year and custom ranges, long-term economics, ROI from a complete verified 365-day basis, custom alerts, service report, 3 commissioned automations included, device editor, yearly energy calendar with month-over-last-year comparison, export/PDF and webhooks.

The number of already commissioned rules is not a runtime execution quota. Downgrading does not delete paid settings or existing commissioned automations. The active entitlement still governs what can be edited or evaluated: Local uses fixed alert thresholds, Smart does not run Pro custom alert rules, and manual device editing/control remains Pro-only for an own-Home-Assistant installation.


## Weather and solar conditions

Solario can use Home Assistant `weather.*`, a measured irradiance sensor, `sun.sun`, or a suitable sun-elevation sensor. Only a real `weather.*` source or measured irradiance counts as a weather station; `sun.sun` alone is shown as **Sun position only**. If a physical irradiance sensor is not available, current irradiance may be derived from weather and sun elevation.

When `sunElevation <= 0`, current irradiance is always **0 W/m²**. This also applies when a physical Home Assistant sensor briefly retains an old positive value after sunset.

## History storage

Detailed readings (one point every five minutes, 30 days back) are stored in `/data/history/`, one file per calendar day; only today's file is rewritten, and only when a reading is appended. The hourly and daily summaries have their own files and are written on an interval, always at the turn of the hour and of the day. A planned stop of the add-on writes everything out at once.

## Network and persistent data

- Home Assistant API: `http://supervisor/core`
- backend: `127.0.0.1:5000`
- Ingress: port `8099`, Home Assistant Ingress proxy only
- local Web UI: port `3000`, no host mapping by default
- maximum JSON body: **1 MiB**

The access code and recovery code are shown during initial registration and can be downloaded to a local text file; a newly rotated pair after recovery can be downloaded as well. If both codes are lost, they cannot be looked up remotely and recovery requires direct service access to that add-on. Account state, local settings, investment inputs, alert rules, commissioned-automation request queue, built-in agent identity, automations, mappings, and energy trackers are persisted in `/data`, so a normal restart does not require a new registration.

The one-time 0.6.36 repair affects only derived periodic trackers.

## Installation behavior

For a standard local Home Assistant installation, the built-in agent connects automatically through `homeassistant_api`. No separate local agent pairing code or additional Home Assistant integration is required.

The default user-facing access method is Home Assistant Ingress. Direct LAN access on port 3000 is optional and not published by default.

## First launch and access

On first launch, the user generates an access code and a recovery code. Both should be stored securely. After the first sign-in, the installation type can be selected as either a user's own Home Assistant installation or a Solario Solar Box. The selected installation type is security-locked after initial setup.

Normal add-on restarts preserve the account and access state through persistent `/data` storage.

## Automatic mapping behavior

Automatic discovery is intended to reduce manual configuration while avoiding arbitrary matches. Candidate sources are evaluated using their identifiers, names, units, `device_class`, and `state_class`. Manual valid overrides always win over discovery.

When a required source cannot be established reliably, Solario should prefer an unavailable/diagnostic state over presenting an unsupported value as exact.

## PV diagnostics behavior

Where individual string-power entities are available, Solario can use them for string-level diagnostics and comparison. Supporting recent production values such as the 10-minute maximum and average can also be mapped.

Low production can make percentage differences between strings misleading. In such conditions, the interface reports that power is too low for a reliable comparison rather than presenting the result as a confirmed PV fault.

## Savings calculation behavior

Savings are based on the configured electricity price and PV energy consumed on site. When production and export values are available, self-consumption is calculated as production minus export.

Daily, monthly, and lifetime savings require the corresponding energy basis. If the monthly basis is not yet trustworthy, Solario must not present it as a reliable monthly value. Once Recorder provides a valid monthly delta, the calculation can recover automatically.

## Data ownership and localization

Names of entities, devices, and automations imported from Home Assistant remain exactly as the user configured them. Solario's own UI strings and system messages are localized independently.

## Supported architectures

- `amd64`
- `aarch64`
