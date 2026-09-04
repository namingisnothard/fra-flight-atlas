'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CalendarDays, ChevronDown, Clock3, ExternalLink, Globe2, Info, MapPin, Plane, Search, X } from 'lucide-react';
import AtlasMap from './atlas-map';
import { routes, type Route } from './routes';
import { flights } from './flights';
import dataMeta from './flight-data-meta.json';

type Direction = 'All' | 'Departures' | 'Arrivals';
type Region = 'World' | 'Europe';
const formatDate = (date: string, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
const days = dataMeta.dates.map(date => ({ day: formatDate(date, { weekday: 'short' }), date, number: Number(date.slice(8)), available: dataMeta.availableDates.includes(date) }));
const weekLabel = `${formatDate(days[0].date, { day: 'numeric', month: 'short' })} – ${formatDate(days[6].date, { day: 'numeric', month: 'short', year: 'numeric' })}`;
const refreshedLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin', timeZoneName: 'short' }).format(new Date(dataMeta.refreshedAt));
const fra = { lat: 50.0379, lng: 8.5622 };
const europeanCountries = new Set(['Albania','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czechia','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia','Lithuania','Luxembourg','Malta','Moldova','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Russia','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Türkiye','Ukraine','United Kingdom']);

function distance(route: Route) {
  const rad = (value: number) => value * Math.PI / 180;
  const dLat = rad(route.lat - fra.lat); const dLng = rad(route.lng - fra.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(fra.lat)) * Math.cos(rad(route.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function durationFor(route: Route) {
  const hours = Math.max(.7, distance(route) / 760 + .45);
  return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
}

function utcOffsetMinutes(timezone: string, day: string) {
  const date = new Date(`${day}T12:00:00Z`);
  const zoneName = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, timeZoneName: 'longOffset', hour: '2-digit' }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value || 'GMT';
  const match = zoneName.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] || 0);
  return match[1] === '-' ? -minutes : minutes;
}

function timezoneDifference(route: Route, day: string) {
  const difference = utcOffsetMinutes(route.timezone, day) - utcOffsetMinutes('Europe/Berlin', day);
  if (difference === 0) return 'Same time as FRA';
  const sign = difference > 0 ? '+' : '−';
  const absolute = Math.abs(difference);
  const hours = Math.floor(absolute / 60); const minutes = absolute % 60;
  return `${sign}${hours}${minutes ? `h ${minutes}m` : 'h'} vs FRA`;
}

function localTime(timezone: string) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

export default function Home() {
  const [direction, setDirection] = useState<Direction>('All');
  const [selectedDay, setSelectedDay] = useState(dataMeta.selectedDate);
  const [query, setQuery] = useState('');
  const [selectedIata, setSelectedIata] = useState('JFK');
  const [clock, setClock] = useState(() => Date.now());
  const [region, setRegion] = useState<Region>('World');
  const [listOpen, setListOpen] = useState(false);
  const [hovered, setHovered] = useState<Route | null>(null);
  const regionRoutes = useMemo(() => region === 'Europe' ? routes.filter(route => europeanCountries.has(route.country)) : routes, [region]);
  const dayFlights = useMemo(() => flights.filter(flight => flight[0] === selectedDay && (direction === 'All' || flight[1] === (direction === 'Arrivals' ? 'A' : 'D'))), [selectedDay, direction]);
  const activeRoutes = useMemo(() => regionRoutes.flatMap(route => {
    const records = dayFlights.filter(flight => flight[2] === route.iata);
    return records.length ? [{ ...route, frequency: `${records.length} flights`, airlines: [...new Set(records.map(flight => flight[6]))] }] : [];
  }), [regionRoutes, dayFlights]);
  const selected = activeRoutes.find(route => route.iata === selectedIata) || activeRoutes[0] || routes[0];
  const stale = clock - new Date(dataMeta.refreshedAt).getTime() > 24 * 60 * 60 * 1000;
  const selectedFlights = useMemo(() => flights.filter(flight => flight[0] === selectedDay && flight[2] === selected.iata && (direction === 'All' || flight[1] === (direction === 'Arrivals' ? 'A' : 'D'))).sort((a, b) => (a[1] === 'A' ? a[4] : a[3]).localeCompare(b[1] === 'A' ? b[4] : b[3])), [selectedDay, selected.iata, direction]);
  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return activeRoutes;
    return activeRoutes.filter(route => [route.city, route.iata, route.country, ...route.airlines].some(value => value.toLowerCase().includes(needle)));
  }, [query, activeRoutes]);
  const regionCountryCount = useMemo(() => new Set(activeRoutes.map(route => route.country)).size, [activeRoutes]);
  const regionAirlineCount = useMemo(() => new Set(activeRoutes.flatMap(route => route.airlines)).size, [activeRoutes]);
  const routeDistance = distance(selected);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.getElementById('route-search')?.focus(); }
      if (event.key === 'Escape') { setQuery(''); setListOpen(false); }
    };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const selectRoute = (route: Route) => { setSelectedIata(route.iata); setQuery(''); setListOpen(false); setHovered(null); };
  const selectRegion = (nextRegion: Region) => { setRegion(nextRegion); setHovered(null); };
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark"><Plane size={19} strokeWidth={2.4} /></div>
        <div className="brand-copy"><h1>FRA Flight Atlas</h1><p>A journal of journeys · Frankfurt am Main</p></div>
        <button className="week-pill" onClick={() => setSelectedDay(dataMeta.selectedDate)} title="Return to the latest snapshot date"><span /> <CalendarDays size={14} />{weekLabel}<ChevronDown size={13} /></button>
      </header>

      <section className="workspace">
        <aside className="sidebar">
          <div className="eyebrow">VOL. I · THE FRANKFURT COLLECTION</div>
          <h2>Every journey<br />begins with wonder.</h2>
          <p className="intro">An atlas of nonstop journeys. Trace a route, discover a destination, and let the world unfold.</p>

          <div className="segmented" aria-label="Flight direction">
            {(['All', 'Departures', 'Arrivals'] as Direction[]).map(item => (
              <button key={item} className={direction === item ? 'active' : ''} aria-pressed={direction === item} onClick={() => setDirection(item)}>
                {item === 'Departures' && <ArrowUpRight size={12} />}{item === 'Arrivals' && <ArrowDownLeft size={12} />}{item}
              </button>
            ))}
          </div>

          <div className="stats">
            <div><strong>{activeRoutes.length}</strong><span>{direction === 'All' ? 'active routes' : direction.toLowerCase()}</span></div>
            <div><strong>{regionCountryCount}</strong><span>countries</span></div>
            <div><strong>{regionAirlineCount}</strong><span>operators</span></div>
          </div>

          <div className="date-label"><span>{formatDate(selectedDay, { month: 'long', year: 'numeric' })}</span><small>Week of {formatDate(days[0].date, { day: 'numeric', month: 'short' })}</small></div>
          <div className="date-strip" role="group" aria-label="Select day">
            {days.map(item => <button key={item.date} className={selectedDay === item.date ? 'active' : ''} disabled={!item.available} aria-pressed={selectedDay === item.date} title={item.available ? formatDate(item.date, { dateStyle: 'full' }) : 'Source board unavailable for this date'} onClick={() => setSelectedDay(item.date)}><span>{item.day}</span><strong>{item.number}</strong>{item.date === dataMeta.selectedDate && <i />}</button>)}
          </div>

          <div className="selected-card">
            <div className="selected-head"><div><span className="city-label">Selected route</span><h3>FRA <b>↔</b> {selected.iata}</h3></div><div className="airport-badge"><MapPin size={14} /></div></div>
            <p>{selected.city} ({selected.country})</p>
            <div className="route-metrics">
              <div><span>On this day</span><strong>{selected.frequency}</strong></div>
              <div><span>Distance</span><strong>{routeDistance.toLocaleString()} km</strong></div>
              <div><span>Est. duration</span><strong>{durationFor(selected)}</strong></div>
            </div>
            <div className="carrier-line"><span>Operated by</span><div>{selected.airlines.slice(0, 3).map(airline => <b key={airline}>{airline}</b>)}</div></div>
          </div>

          <button className="all-routes" onClick={() => setListOpen(true)}><span><strong>Browse {region === 'Europe' ? 'European' : 'active'} routes</strong><small>{activeRoutes.length} destinations on {days.find(day => day.date === selectedDay)?.day}</small></span><ArrowUpRight size={17} /></button>
          <p className="data-note"><Info size={12} /> {stale ? 'Older snapshot' : 'Updated'} · {refreshedLabel}. Times may change.</p>
        </aside>

        <div className="map-panel">
          <div className="map-toolbar">
            <div className="toolbar-left">
              <div className="search-wrap">
                <Search size={15} />
                <input id="route-search" value={query} onFocus={() => setListOpen(true)} onChange={event => { setQuery(event.target.value); setListOpen(true); }} placeholder="Search city, airport or airline" aria-label="Search routes" />
                {query ? <button onClick={() => setQuery('')} aria-label="Clear search"><X size={13} /></button> : <kbd>⌘ K</kbd>}
              </div>
              <div className="region-switch" aria-label="Map region">
                <button className={region === 'World' ? 'active' : ''} aria-pressed={region === 'World'} onClick={() => selectRegion('World')}><Globe2 size={12} /> World</button>
                <button className={region === 'Europe' ? 'active' : ''} aria-pressed={region === 'Europe'} onClick={() => selectRegion('Europe')}>Europe</button>
              </div>
            </div>

          </div>

          {listOpen && <div className="search-results">
            <div className="result-head"><span>{query ? `${searchResults.length} matches` : `${activeRoutes.length} active routes`}</span><button onClick={() => setListOpen(false)} aria-label="Close results"><X size={14} /></button></div>
            <div className="result-scroll">
              {searchResults.map(route => <button key={route.iata} onClick={() => selectRoute(route)}><span className="result-code">{route.iata}</span><span><strong>{route.city} ({route.country})</strong><small>{route.frequency}</small></span><ArrowUpRight size={14} /></button>)}
              {!searchResults.length && <div className="empty-result">No nonstop route found.</div>}
            </div>
          </div>}

          <AtlasMap routes={activeRoutes} selected={selected} region={region} direction={direction} onSelect={selectRoute} onHover={setHovered} />

          {hovered && <div className="map-hover-bar">
            <span className="hover-code">{hovered.iata}</span><div className="hover-place"><strong>{hovered.city} ({hovered.country})</strong><small>{hovered.frequency}</small></div>
            <div className="hover-metric"><Clock3 size={12} /><span>Est. duration<strong>{durationFor(hovered)}</strong></span></div>
            <div className="hover-metric"><span className="hover-time">{localTime(hovered.timezone)}</span><span>Local time<strong>{timezoneDifference(hovered, selectedDay)}</strong></span></div>
          </div>}

          <section className="schedule-card" aria-label={`Flights for ${selected.city}`}>
            <div className="schedule-head"><div><span>{formatDate(selectedDay, { weekday: 'short', day: 'numeric', month: 'short' })}</span><strong>{direction === 'All' ? 'Arrivals & departures' : direction}</strong></div><div className="status-key"><i /> Board snapshot · local times</div></div>
            <div className="schedule-scroll">
              {selectedFlights.map((flight, index) => {
                const isArrival = flight[1] === 'A';
                return <article className="schedule-row" key={`${flight[1]}-${flight[5]}-${index}`}>
                  <div className={`direction-icon ${isArrival ? 'inbound' : ''}`}>{isArrival ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}</div>
                  <time>{isArrival ? flight[4] : flight[3]}</time><div className="flight-main"><strong>{flight[5]}</strong><span>{flight[6]}</span></div>
                  <div className="flight-route"><span>{isArrival ? selected.iata : 'FRA'}<small>{flight[3]}</small></span><i /><Plane size={12} /><i /><span>{isArrival ? 'FRA' : selected.iata}<small>{flight[4]}</small></span></div>
                  <b className="scheduled">Published</b>
                </article>
              })}
              {!selectedFlights.length && <div className="empty-schedule">No sourced flight found for this route and day.</div>}
            </div>
          </section>

          <div className="map-footer"><div><span className="legend-dot airport-legend" /> Active airport · click for details</div><p><Clock3 size={11} /> Drag to move · scroll/pinch to zoom · double-click to reset</p></div>
        </div>
      </section>

      <footer className="source-bar">FlightStats board snapshot · refreshed {refreshedLabel}. Route directory: {dataMeta.routeDirectoryEdition}. All times local; check the live board before travel. <a href="https://www.flightstats.com/v2/flight-tracker/arrivals/FRA" target="_blank" rel="noreferrer">Flight source <ExternalLink size={10} /></a><a href="https://directfromhere.com/airports/fra" target="_blank" rel="noreferrer">Route source <ExternalLink size={10} /></a></footer>
    </main>
  );
}
