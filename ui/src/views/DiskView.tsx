import { useCallback, useEffect, useState } from 'react'
import { fetchDiskProjection, fetchHostResources, startDiskScan, type HostResources } from '../lib/brain-client'

const gb = (bytes: number): string => `${(bytes / (1024 ** 3)).toFixed(1)} GB`

export default function DiskView() {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchDiskProjection>> | null>(null)
  const [resources, setResources] = useState<HostResources | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const refresh = useCallback(async () => {
    try { setData(await fetchDiskProjection()); setError('') }
    catch (cause) { setError(cause instanceof Error ? cause.message : String(cause)) }
  }, [])
  useEffect(() => { void refresh(); void fetchHostResources().then(setResources).catch(() => setResources(null)) }, [refresh])
  useEffect(() => {
    if (!data?.scan?.running) return
    const timer = window.setInterval(() => { void refresh() }, 2500)
    return () => clearInterval(timer)
  }, [data?.scan?.running, refresh])
  const scan = async () => {
    setBusy(true); setError('')
    try { await startDiskScan(); await refresh() }
    catch (cause) { setError(cause instanceof Error ? cause.message : String(cause)) }
    finally { setBusy(false) }
  }
  const recommendations = data?.recommendations?.recommendations ?? []
  const candidates = data?.wipeCheck?.items ?? []
  return <section className="pb-domain-view" aria-label="Festplatten">
    <header className="pb-view-header"><h2>Festplatten</h2><p>Reale Laufwerke, Inventur und geprüfte Aufräumkandidaten</p>
      <button className="pb-button" type="button" onClick={() => void refresh()}>Aktualisieren</button>
      <button className="pb-button pb-button--primary" type="button" disabled={busy || data?.scan?.running} onClick={() => void scan()}>
        {data?.scan?.running ? 'Inventur läuft …' : busy ? 'Starte …' : 'Inventur starten'}
      </button>
    </header>
    {error && <p className="pb-domain-error" role="alert">Festplatten-Daten nicht verfügbar: {error}</p>}
    {!data && !error && <p role="status">Festplatten-Daten werden geladen …</p>}
    {data && <>
      <section className="pb-domain-card"><h3>Laufwerke</h3>
        {resources?.host.drives.length ? <div className="pb-drive-grid">{resources.host.drives.map(drive => <article key={drive.root}><strong>{drive.root}</strong><span>{gb(drive.freeBytes)} frei von {gb(drive.totalBytes)}</span></article>)}</div> : <p>{data.scan?.roots?.length ? 'Laufwerkskapazitäten sind aktuell nicht verfügbar.' : 'Für die Laufwerke liegt noch keine Inventur vor. Starte eine metadata-only Inventur, um Verzeichnisse und Platzbelegung zu erfassen.'}</p>}
      </section>
      <section className="pb-domain-card"><h3>Letzte Inventur</h3>
        {data.scan ? <p role="status">{data.scan.running ? 'Läuft' : data.scan.complete ? 'Abgeschlossen' : 'Unvollständig'} · {data.scan.directories.toLocaleString()} Verzeichnisse · {data.scan.files.toLocaleString()} Dateien · {gb(data.scan.bytes)} erfasst · {data.scan.inaccessible} unzugänglich</p> : <p>Noch keine Inventur vorhanden.</p>}
        {data.scan?.errors?.length > 0 && <ul>{data.scan.errors.slice(0, 8).map((item: string, index: number) => <li key={`${index}-${item}`}>{item}</li>)}</ul>}
      </section>
      <section className="pb-domain-card"><h3>Erfasste Verzeichnisse auf der obersten Ebene</h3>
        {data.directories.length ? <ol className="pb-domain-list">{data.directories.slice(0, 12).map((row: any) => <li key={row.path}><code>{row.path}</code><span>{gb(row.bytes)} · {row.files.toLocaleString()} Dateien</span></li>)}</ol> : <p>Keine Verzeichnisdaten vorhanden. Erst nach abgeschlossener Inventur kann eine Größenliste gezeigt werden.</p>}
      </section>
      <section className="pb-domain-card"><h3>Verlauf und größte Zuwächse</h3>
        {data.history.length ? <ol className="pb-domain-list">{data.history.slice(0, 10).map((item: any) => <li key={item.scanId}><strong>{item.complete ? 'Abgeschlossen' : item.running ? 'Läuft' : 'Unvollständig'}</strong><span>{new Date(item.startedAt).toLocaleString()} · {item.directories.toLocaleString()} Verzeichnisse · {gb(item.bytes)}</span></li>)}</ol> : <p>Mit dieser Version beginnt der Verlauf. Ältere Scans wurden vom Server nicht aufbewahrt.</p>}
        {data.largestGrowth.length ? <ul className="pb-domain-list">{data.largestGrowth.map((item: any) => <li key={item.path}><code>{item.path}</code><span>+{gb(item.deltaBytes)} seit dem vorherigen vollständigen Scan · vorher {gb(item.previousBytes)}, jetzt {gb(item.bytes)}</span></li>)}</ul> : <p>Größte Zuwächse benötigen zwei vollständige Inventuren mit überlappenden Verzeichnissen.</p>}
      </section>
      <section className="pb-domain-card"><h3>Aufräumkandidaten</h3>
        <p>Nur eine Prüfliste für den Owner. PlugBrain löscht hier nichts.</p>
        {recommendations.length ? <ul className="pb-domain-list">{recommendations.slice(0, 20).map((item: any, index: number) => <li key={`${item.paths?.[0]}-${index}`}><code>{item.paths?.join(', ')}</code><span>{gb(item.bytes)} · {item.risk} · {item.reason}</span></li>)}</ul> : <p>Keine Empfehlungen aus der vorhandenen Inventur.</p>}
        <h4>Geschützte / zu prüfende Pfade</h4>
        {candidates.length ? <ul className="pb-domain-list">{candidates.slice(0, 20).map((item: any) => <li key={item.path}><code>{item.path}</code><span>{gb(item.bytes)} · {item.reason}</span></li>)}</ul> : <p>Die aktuelle Prüfliste enthält keine geschützten Pfade.</p>}
      </section>
    </>}
  </section>
}
