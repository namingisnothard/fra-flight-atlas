'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, Footprints, Info, MapPin, Plane, ShieldCheck, TrainFront } from 'lucide-react';
import AirportScene from './airport-scene';
import AirportInterior from './airport-interior';
import type { InteriorArea } from './airport-interior-data';
import { concourses, origins, parseGate, estimateJourney, frankfurtInput, frankfurtTimestamp, type Concourse, type Origin } from './airport-data';
import './airport.css';

export type AirportFlight = { number: string; date: string; departure: string; destination: string };
const timeLabel = (n: number) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }).format(n);
export default function AirportPlanner({ flight, onBrowseFlights }: { flight?: AirportFlight; onBrowseFlights: () => void }) {
  const [origin, setOrigin] = useState<Origin>('ice');
  const [gate, setGate] = useState(flight ? '' : 'Z50');
  const [departure, setDeparture] = useState(flight ? `${flight.date}T${flight.departure}` : '');
  const [now, setNow] = useState<number | null>(null);
  const [pace, setPace] = useState(1);
  const [security, setSecurity] = useState(20);
  const [passport, setPassport] = useState(10);
  const [bag, setBag] = useState(0);
  const [buffer, setBuffer] = useState(15);
  const [closing, setClosing] = useState(30);
  const [details, setDetails] = useState(false);
  const [interior, setInterior] = useState<InteriorArea | null>(null);
  useEffect(() => { const update = () => setNow(Date.now()); update(); const id = window.setInterval(update, 30000); return () => clearInterval(id); }, []);
  const concourse = parseGate(gate);
  const estimate = concourse ? estimateJourney(origin, concourse, pace, security, passport, bag, buffer) : null;
  const departureAt = frankfurtTimestamp(departure);
  const closesAt = departureAt === null ? null : departureAt - closing * 60000;
  const leaveBy = closesAt === null || !estimate ? null : closesAt - estimate.total * 60000;
  const spare = leaveBy === null || now === null ? null : Math.floor((leaveBy - now) / 60000);
  const expired = closesAt !== null && now !== null && closesAt <= now;
  const steps = estimate ? [
    ...(bag ? [{ name: 'Check-in / bag drop', detail: 'Your allowance; confirm airline cutoff', minutes: bag, icon: Plane }] : []),
    { name: 'Walk through the airport', detail: `${origins[origin].label} → ${concourse} concourse`, minutes: estimate.walking, icon: Footprints },
    ...(estimate.train ? [{ name: 'Sky Line · change terminals', detail: '8 min ride + 4 min assumed wait', minutes: estimate.train, icon: TrainFront }] : []),
    { name: 'Security screening', detail: 'Planning allowance · not a live queue', minutes: security, icon: ShieldCheck },
    ...(passport ? [{ name: 'Passport control', detail: 'Confirm whether your journey needs it', minutes: passport, icon: MapPin }] : []),
    { name: 'Extra time at the gate', detail: 'Your contingency before gate closure', minutes: buffer, icon: Clock3 },
  ] : [];
  return <section className="airport-workspace" aria-label="Frankfurt Airport wayfinding">
    <aside className="journey-panel">
      <div className="eyebrow">VOL. II · THE AIRPORT, UNFOLDED</div>
      <h2>Find your gate.<br /><em>Keep your calm.</em></h2>
      <p className="journey-intro">A little perspective for your next departure.</p>
      <div className="journey-form">
        <label className="field-label" htmlFor="airport-origin"><span className="field-dot" /> I’m starting from</label>
        <select id="airport-origin" value={origin} onChange={e => setOrigin(e.target.value as Origin)}>{Object.entries(origins).map(([id, entry]) => <option key={id} value={id}>{entry.label}</option>)}</select>
        <label className="field-label" htmlFor="airport-gate"><MapPin size={12} /> My departure gate</label>
        <div className="gate-input"><input id="airport-gate" placeholder="e.g. Z50 or A26" maxLength={8} value={gate} onChange={e => setGate(e.target.value.toUpperCase())} aria-invalid={!!gate && !concourse} /><span>{concourse ? `TERMINAL ${concourses[concourse].terminal}` : 'BOARDING PASS'}</span></div>
        <small className="field-help">{concourse ? `${concourses[concourse].level}. Gate number is your label; map locates the concourse.` : /^[DE]/i.test(gate) ? 'Terminal 2 is closed. Check the reassigned gate with your airline.' : 'Use A, B, C, Z, G, H or J. Confirm the actual gate with your airline.'}</small>
        <label className="field-label" htmlFor="airport-departure"><Plane size={12} /> {flight ? `${flight.number} → ${flight.destination}` : 'Departure date & time'} <span>Frankfurt time</span></label>
        <input id="airport-departure" type="datetime-local" value={departure} onChange={e => setDeparture(e.target.value)} aria-invalid={!!departure && departureAt === null} />
        {departure && departureAt === null && <small className="field-error">Enter a valid Frankfurt time outside the daylight-saving transition hour.</small>}
        <div className="flight-shortcuts"><button onClick={onBrowseFlights}>Choose from flight board <ArrowUpRight size={12} /></button>{!departure && <button onClick={() => setDeparture(frankfurtInput(Date.now() + 7200000))}>Try +2 hours</button>}</div>
        {flight && <small className="field-help">Published snapshot time, not live. Enter your boarding-pass gate above.</small>}
      </div>
      <div className={`journey-result ${spare !== null && spare < 0 ? 'tight' : ''}`} aria-live="polite">
        <span className="eyebrow">{estimate ? 'ILLUSTRATIVE TIME BUDGET · NOT MAP-MEASURED' : 'ENTER A GATE TO PLAN'}</span>
        <div className="result-minutes">{estimate?.total ?? '—'}<span>min</span><Footprints size={26} strokeWidth={1.2} /></div>
        <p>{estimate ? `${estimate.journey} min to gate + ${buffer} min extra` : 'Your route and timing will appear here.'}</p>
        {estimate && <p>Walking allowances are assumptions, not validated by the official floor maps.</p>}
        {leaveBy !== null && <div className="leave-by"><span>Start from here by</span><strong>{timeLabel(leaveBy)}</strong></div>}
        <div className="timing-status">{expired ? 'Gate-close time has passed for this plan.' : spare === null ? 'Add your flight time to calculate when to start.' : spare < 0 ? `${Math.abs(spare)} min short of this plan. Recheck queues and contact your airline.` : `${spare} min before your planned start. Estimates don’t guarantee boarding.`}</div>
      </div>
      <button className="assumptions-toggle" onClick={() => setDetails(!details)} aria-expanded={details}>Adjust time allowances <span>{details ? '−' : '+'}</span></button>
      {details && <div className="time-settings">
        <label>Walking pace<select value={pace} onChange={e => setPace(Number(e.target.value))}><option value={1}>Usual pace</option><option value={1.4}>Unhurried / with luggage</option><option value={1.8}>Allow much more time</option></select></label>
        {([{ label: 'Security (min)', value: security, setter: setSecurity, max: 180 }, { label: 'Passport control (min)', value: passport, setter: setPassport, max: 180 }, { label: 'Check-in / bag drop (min)', value: bag, setter: setBag, max: 180 }, { label: 'Extra buffer (min)', value: buffer, setter: setBuffer, max: 120 }, { label: 'Gate closes before departure (min)', value: closing, setter: setClosing, max: 120 }]).map(item => <label key={item.label}>{item.label}<input type="number" min="0" max={item.max} value={item.value} onChange={e => item.setter(Math.max(0, Math.min(item.max, Number(e.target.value) || 0)))} /></label>)}
        <p>Use your airline’s gate-close time. Bag-drop cutoffs are separate. For an accessible route or an airside connection, use the official airport map.</p>
      </div>}
      <a className="official-link" href="https://www.frankfurt-airport.com/wartezeiten/public?lang=en" target="_blank" rel="noreferrer">Check official queue times <ArrowUpRight size={13} /></a>
    </aside>
    <div className="airport-stage">
      <div className="airport-stage-heading"><div><span className="eyebrow">FRANKFURT AM MAIN · FRA / EDDF</span><h3>Your journey, in perspective.</h3></div><span className="schematic-badge"><span /> 3D SCHEMATIC</span></div>
      {interior ? <AirportInterior key={interior} area={interior} onArea={setInterior} onBack={() => setInterior(null)} /> : <AirportScene origin={origin} concourse={concourse} gate={gate} onOpen={setInterior} />}
      <div className="airport-concourse-bar"><span>Go inside</span>{(Object.keys(concourses) as Concourse[]).map(c => <button key={c} aria-label={`Explore concourse ${c}`} aria-pressed={interior === c} onClick={() => setInterior(c)}>{c}</button>)}<span className="t2-closed">T2 · closed</span></div>
      <div className="indoor-shortcuts"><button onClick={() => setInterior('t1')}>Terminal 1</button><button onClick={() => setInterior('t3')}>Terminal 3</button><button onClick={() => setInterior('regional')}><TrainFront size={12} /> S-Bahn · platforms 1–3</button><button onClick={() => setInterior('ice')}><TrainFront size={12} /> ICE · platforms 4–7</button>{concourse && <button onClick={() => setInterior(concourse)}>Inside my gate area ↗</button>}</div>
      <div className="itinerary-card"><div className="itinerary-title"><div><span className="eyebrow">YOUR DEPARTURE PLAN</span><h3>{concourse ? <>From {origin === 'ice' ? 'the train' : origin === 'regional' ? 'the S-Bahn' : `Terminal ${origins[origin].terminal}`} to <em>{gate}</em></> : 'Choose your gate to begin'}</h3></div><span>{concourse && `T${concourses[concourse].terminal}`} <Plane size={19} /></span></div>
        <div className="journey-steps">{steps.map((step, index) => <div className="journey-step" key={step.name}><div className="step-symbol"><step.icon size={17} strokeWidth={1.5} /><span>{String(index + 1).padStart(2, '0')}</span></div><div><strong>{step.name}</strong><small>{step.detail}</small></div><b>{step.minutes}<small> min</small></b></div>)}</div>
        <div className="itinerary-foot"><Info size={13} /><p>Concourse-level planning, not indoor navigation. Walking allowances are illustrative; actual gates, queues, lifts and bus boarding can add time. A/Z are on different levels. <a href="https://www.frankfurt-airport.com/en/at-the-airport/orientation/airport-map.html" target="_blank" rel="noreferrer">Open official directions ↗</a></p></div>
      </div>
      <div className="airport-bottom"><span><i /> Your planned path <i /> Terminal buildings</span><span>Airport information checked 05 Sep 2026 · Not to scale</span></div>
    </div>
  </section>;
}
