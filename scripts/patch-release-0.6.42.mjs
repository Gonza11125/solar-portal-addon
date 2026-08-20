import fs from 'node:fs'

function replaceUnique(path, from, to, label) {
  let code = fs.readFileSync(path, 'utf8')
  const first = code.indexOf(from)
  if (first < 0) throw new Error(`${path}: missing ${label}`)
  if (code.indexOf(from, first + from.length) >= 0) throw new Error(`${path}: ambiguous ${label}`)
  code = code.slice(0, first) + to + code.slice(first + from.length)
  fs.writeFileSync(path, code)
}

replaceUnique(
  'solar_portal/config.yaml',
  '# Solario Local 0.6.41 release manifest\nname: Solario Local\nversion: "0.6.41"',
  '# Solario Local 0.6.42 release manifest\nname: Solario Local\nversion: "0.6.42"',
  'config version',
)

const rootOld = `Current stable version: **0.6.41**  \nSupported architectures: **amd64** and **aarch64**\n\n## What's new in 0.6.41\n\n- the savings price/currency UI is now consistent in both Solario Local and Solario Cloud,\n- the former fixed CZK-only \`1–15\` slider is replaced by a normal numeric electricity-price input,\n- searchable currency selection supports ISO codes and currency names, with any valid three-letter currency code accepted,\n- electricity price and currency are persisted per site and legacy sites default safely to CZK,\n- savings cards, price-per-kWh labels, chart axis, tooltips and displayed history use the selected currency consistently,\n- displayed savings/history are repriced against the currently configured electricity price,\n- Local and Cloud builds now contain release guards that fail if the old fixed slider returns or the currency picker is missing.\n`
const rootNew = `Current stable version: **0.6.42**  \nSupported architectures: **amd64** and **aarch64**\n\n## What's new in 0.6.42\n\n- missing or unmapped battery SOC is no longer shown as a false \`0 %\`,\n- unavailable SOC is displayed as unavailable and does not trigger false low/high battery warnings or recommendations,\n- a genuine measured \`0 %\` battery SOC remains a valid value,\n- battery history no longer draws missing SOC measurements as artificial zero points,\n- Alpha ESS automatic discovery now also recognizes \`sensor.alpha_ess_battery_soc\` and \`sensor.alpha_ess_battery_state_of_charge\` while keeping \`sensor.alpha_ess_soc_battery\` as the primary exact alias,\n- SOC aliases still require a percentage-compatible sensor, preventing voltage/current entities from being selected as battery charge,\n- the release candidate passed Local backend validation and the complete Home Assistant image/runtime smoke test; the published \`0.6.42\` and \`latest\` manifests were verified for amd64 and arm64.\n`
replaceUnique('README.md', rootOld, rootNew, 'root release section')
replaceUnique('README.md', 'and those improvements remain included in 0.6.41.', 'and those improvements remain included in 0.6.42.', 'compatibility release reference')

const addonOld = `# Solario Local 0.6.41\n\nSolario Local is a local Home Assistant application for solar PV overview, energy balance, diagnostics and safe automations. The default access path uses secured Home Assistant Ingress; direct LAN port 3000 is optional and is not published by default.\n\n## Installation`
const addonNew = `# Solario Local 0.6.42\n\nSolario Local is a local Home Assistant application for solar PV overview, energy balance, diagnostics and safe automations. The default access path uses secured Home Assistant Ingress; direct LAN port 3000 is optional and is not published by default.\n\n## Installation`
replaceUnique('solar_portal/README.md', addonOld, addonNew, 'addon heading')

const addonChangesOld = `## What changed in 0.6.41\n\nVersion 0.6.41 makes the savings price/currency experience consistent across Solario Local and Solario Cloud:\n\n- the old fixed \`1–15 Kč/kWh\` slider is replaced by a normal numeric electricity-price input,\n- currency can be searched by name or ISO code,\n- any valid three-letter currency code can be used,\n- electricity price and currency persist per site,\n- older sites without a saved currency safely default to CZK,\n- savings cards, price/kWh labels, chart axis, tooltips and displayed history use the selected currency,\n- displayed savings/history are repriced using the currently configured electricity price,\n- build-time release guards prevent the old fixed slider from returning or the currency picker from disappearing unnoticed.\n\nSolario does **not** perform foreign-exchange conversion. If you select EUR, enter your real electricity price in EUR/kWh; if you select CZK, enter it in CZK/kWh.\n`
const addonChangesNew = `## What changed in 0.6.42\n\nVersion 0.6.42 improves battery SOC reliability in Solario Local:\n\n- missing or unmapped SOC is shown as unavailable instead of a false \`0 %\`,\n- unavailable SOC no longer triggers false low-battery or high-battery messages,\n- a genuine measured \`0 %\` remains valid and is still displayed as zero,\n- missing SOC history samples are not plotted as artificial zero points,\n- Alpha ESS discovery also recognizes \`sensor.alpha_ess_battery_soc\` and \`sensor.alpha_ess_battery_state_of_charge\`, while \`sensor.alpha_ess_soc_battery\` remains the primary exact alias,\n- SOC aliases are accepted only for percentage-compatible sensors.\n\nThe savings currency and free-form price-per-kWh improvements introduced in 0.6.41 remain included. Solario does **not** perform foreign-exchange conversion: enter the electricity price in the selected currency per kWh.\n`
replaceUnique('solar_portal/README.md', addonChangesOld, addonChangesNew, 'addon release section')

const changelogMarker = '# Changelog\n\n'
const changelogSection = `## [0.6.42] - 2026-08-20\n\n- opraveno rozlišení mezi chybějícím SOC baterie a skutečně naměřenými 0 %; nedostupný nebo nenamapovaný SOC se už na hlavním dashboardu nezobrazuje jako falešných \`0 %\`\n- při nedostupném SOC se nezobrazují falešná upozornění na nízkou baterii ani doporučení založená na vysokém nebo nízkém nabití\n- skutečně naměřená hodnota \`0 %\` zůstává platnou hodnotou a není zaměněna za nedostupnost\n- historické body nově nesou informaci o dostupnosti SOC, takže chybějící měření nevytvářejí v bateriovém grafu umělé nulové propady\n- rozšířena bezpečná Alpha ESS autodetekce o \`sensor.alpha_ess_battery_soc\` a \`sensor.alpha_ess_battery_state_of_charge\`; původní \`sensor.alpha_ess_soc_battery\` zůstává první přesnou volbou\n- Alpha ESS SOC aliasy se přijmou pouze s kompatibilní procentní jednotkou, takže napětí nebo proud nelze omylem použít jako stav nabití\n- doplněny regresní testy pro scénář nedostupné SOC → 53 % → nedostupné SOC → skutečných 0 % a pro alternativní Alpha ESS názvy\n- finální release kandidát prošel Local backend validací, TypeScript buildem a kompletním Home Assistant image/runtime testem včetně restartu PostgreSQL, záloh, izolace procesů a Web UI\n- po publikaci byly samostatně ověřeny manifesty \`0.6.42\` i \`latest\` pro \`linux/amd64\` a \`linux/arm64\`\n\n`
replaceUnique('solar_portal/CHANGELOG.md', changelogMarker, changelogMarker + changelogSection, 'changelog header')

console.log('0.6.42 public release metadata patched.')
