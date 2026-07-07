import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
	useEffect(() => {
		const els = document.querySelectorAll('[data-reveal]');
		if ('IntersectionObserver' in window) {
			const io = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
						io.unobserve(entry.target);
					}
				});
			}, { threshold: 0.12 });
			els.forEach((el) => io.observe(el));
			return () => io.disconnect();
		}
		els.forEach((el) => el.classList.add('in-view'));
		return undefined;
	}, []);

	return (
		<>
			<Head>
				<title>AW-SERVICE — Platformă field service</title>
			</Head>

			<header>
				<div className='header-inner'>
					<div className='logo'>
						<span className='mark'>✓</span>
						aW-SERVICE
					</div>
					<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20AW-SERVICE'>Solicită un demo</a>
				</div>
			</header>

			<main>
				<section className='hero wrap'>
					<div className='hero-grid'>
						<div>
							<div className='eyebrow'>Platformă field service</div>
							<h1>Platformă inteligentă pentru service&nbsp;și lucrări din teren.</h1>
							<p className='lede'>Fluxuri de lucru digitalizate, monitorizare în timp real și rapoarte automate — eficiență maximă, fără birocrație.</p>
							<div className='hero-ctas'>
								<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20AW-SERVICE'>Solicită un demo gratuit</a>
								<a className='btn btn-ghost' href='#problema'>Vezi cum funcționează ↓</a>
							</div>
						</div>
						<div>
							<div className='ticket'>
								<div className='stamp'>
									FINALIZAT
									<br />
									✓ VERIFICAT
								</div>
								<div className='ticket-head'>
									<span className='id'>BON #AW-4471</span>
									<span className='status'>FINALIZAT</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>Client</span>
									<span className='v'>Agro Nord SRL</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>Mașină</span>
									<span className='v'>Tractor · SN 88214</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>Ore funcționare</span>
									<span className='v'>312,4 h</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>Suprafață</span>
									<span className='v'>184 ha</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>Semnătură client</span>
									<span className='v'>✓ 14 iun, 16:42</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Rezultate</div>
							<h2>AW-SERVICE: eficiența cuantificată</h2>
							<p className='sub'>Rezultate concrete, măsurabile, de la prima zi de utilizare.</p>
						</div>
						<div className='outcomes'>
							<div className='outcome-card'>
								<div className='tag'>REZULTAT · 01</div>
								<h3>Capacitate de lucru</h3>
								<p>Creștere fără angajări suplimentare. Calendarul inteligent și monitorizarea live elimină timpii morți.</p>
							</div>
							<div className='outcome-card'>
								<div className='tag'>REZULTAT · 02</div>
								<h3>Reducere administrativ</h3>
								<p>Formulare digitale în 3 pași și cronometru în timp real elimină introducerea manuală a datelor.</p>
							</div>
							<div className='outcome-card'>
								<div className='tag'>REZULTAT · 03</div>
								<h3>Zero clienți pierduți</h3>
								<p>Baza de date centralizată cu filtre avansate garantează că nicio comandă nu se pierde.</p>
							</div>
						</div>
					</div>
				</section>

				<section className='section' id='problema' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow warn'>Provocarea</div>
							<h2>Administrare haotică, procese invizibile</h2>
							<p className='sub'>Companiile de service pierd timp și bani din cauza lipsei de digitalizare și control.</p>
						</div>
						<div className='problems'>
							<div className='problem-card'>
								<div className='num'>01</div>
								<h3>Timp pierdut cu hârtiile</h3>
								<p>Tehnicienii completează formulare manuale în loc să efectueze intervenții facturabile.</p>
							</div>
							<div className='problem-card'>
								<div className='num'>02</div>
								<h3>Solicitări și clienți pierduți</h3>
								<p>Fără sistem centralizat, comenzile se pierd și termenele sunt depășite.</p>
							</div>
							<div className='problem-card'>
								<div className='num'>03</div>
								<h3>Lipsă de control în teren</h3>
								<p>Managementul nu vede cine lucrează, unde se blochează procesul sau gradul de încărcare.</p>
							</div>
							<div className='problem-card'>
								<div className='num'>04</div>
								<h3>Dispute cu clienții</h3>
								<p>Lipsa dovezilor clare privind durata și calitatea intervenției generează conflicte.</p>
							</div>
						</div>
					</div>
				</section>

				<div className='tear'>
					<p className='tear-text'>
						de la haos de hârtii&nbsp; — &nbsp;la
						<b>un singur flux digital</b>
					</p>
				</div>

				<section className='section' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Soluția</div>
							<h2>Control și transparență într-o singură platformă</h2>
							<p className='sub'>AW-SERVICE conectează coordonarea de la birou (interfața Admin) cu activitatea tehnicienilor din teren (aplicația mobilă) — o platformă cu două roluri care acoperă întregul flux de service, de la alocarea lucrării până la semnătura clientului.</p>
						</div>

						<div className='roles'>
							<div className='role-box'>
								<div className='who'>Birou</div>
								<div className='what'>Interfața Admin</div>
							</div>
							<div className='role-flow'>
								<span>ALOCARE</span>
								<span className='arrow'>→</span>
								<span>EXECUȚIE</span>
								<span className='arrow'>→</span>
								<span>SEMNĂTURĂ</span>
								<span className='arrow'>→</span>
								<span>RAPORT</span>
							</div>
							<div className='role-box'>
								<div className='who'>Teren</div>
								<div className='what'>Aplicația mobilă</div>
							</div>
						</div>

						<ul className='benefit-list'>
							<li>
								<span className='check'>✓</span>
								Mai puțină birocrație pentru tehnician
							</li>
							<li>
								<span className='check'>✓</span>
								Monitorizare 100% pentru clienți și orele de lucru
							</li>
							<li>
								<span className='check'>✓</span>
								Utilizare maximă a capacității echipei și facturare imediată
							</li>
						</ul>
					</div>
				</section>

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Funcționalitate</div>
							<h2>Garanția incontestabilă a calității</h2>
						</div>
						<div className='timeline'>
							<div className='timeline-item'>
								<div className='dot'>1</div>
								<div className='tstamp'>08:14 · START</div>
								<h3>Verificare foto obligatorie</h3>
								<p>Tehnicianul documentează starea inițială și contorul prin fotografii la pornirea intervenției.</p>
							</div>
							<div className='timeline-item'>
								<div className='dot'>2</div>
								<div className='tstamp'>16:42 · STOP</div>
								<h3>Dovadă foto la finalizare</h3>
								<p>Fotografiile de la oprire demonstrează lucrarea efectuată, reducând drastic disputele cu clienții.</p>
							</div>
							<div className='timeline-item'>
								<div className='dot'>3</div>
								<div className='tstamp'>16:43 · RAPORT</div>
								<h3>PDF generat instant</h3>
								<p>Pe baza marcajelor temporale și fotografiilor salvate, aplicația generează un raport oficial PDF în câteva secunde.</p>
							</div>
						</div>
						<div className='callout'>
							<div className='stamp-mini'>✓</div>
							<p>Rezultat: o dovadă clară, transparentă și incontestabilă a calității lucrării — disponibilă instant pentru client și management.</p>
						</div>
					</div>
				</section>

				<section className='section' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Închidere lucrare</div>
							<h2>Cash-flow mai rapid, clienți mulțumiți</h2>
							<p className='sub'>Procesul de validare și facturare se reduce de la câteva zile la câteva minute.</p>
						</div>
						<div className='sign-feature'>
							<ul className='feat3'>
								<li>
									<span className='idx'>01</span>
									<div>
										<h3>Validare la fața locului</h3>
										<p>Clientul semnează confirmarea de primire direct pe ecranul telefonului, cu degetul — fără hârtii.</p>
									</div>
								</li>
								<li>
									<span className='idx'>02</span>
									<div>
										<h3>Semnătură integrată automat</h3>
										<p>Numele semnatarului și data exactă sunt incluse automat și securizat în raportul PDF.</p>
									</div>
								</li>
								<li>
									<span className='idx'>03</span>
									<div>
										<h3>Facturare imediată</h3>
										<p>Documentul poate fi partajat instant, accelerând ciclul de facturare și încasare.</p>
									</div>
								</li>
							</ul>
							<div className='sign-card'>
								<div className='eyebrow'>Confirmare client</div>
								<div className='sign-line'>
									<svg width='220' height='34' viewBox='0 0 220 34' fill='none'>
										<path d='M4 26 C 18 6, 30 6, 40 20 C 48 30, 56 30, 62 16 C 68 4, 78 4, 84 18 C 90 30, 98 26, 104 14 C 112 0, 128 4, 136 18 C 142 28, 150 22, 158 12 C 166 2, 180 6, 190 20 C 196 28, 204 24, 212 14' stroke='var(--accent)' strokeWidth='2' strokeLinecap='round' fill='none' />
									</svg>
									<span className='cap'>M. Popescu · 14.06 · 16:42</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Securitate</div>
							<h2>Infrastructură profesională de business</h2>
						</div>
						<div className='spec-list'>
							<div className='spec-row'>
								<div className='label'>Autentificare</div>
								<div>
									<h3>Autentificare securizată</h3>
									<p>Acces protejat prin Firebase Auth, cu opțiune de autentificare în doi pași (2FA) pentru datele critice ale companiei.</p>
								</div>
							</div>
							<div className='spec-row'>
								<div className='label'>Roluri</div>
								<div>
									<h3>Acces pe bază de roluri</h3>
									<p>Administratorii au control complet; tehnicienii folosesc o interfață simplificată, concentrată strict pe sarcinile proprii.</p>
								</div>
							</div>
							<div className='spec-row'>
								<div className='label'>Stocare date</div>
								<div>
									<h3>Stocare conformă GDPR</h3>
									<p>Datele de service rămân în arhivă securizată 30 de zile la dezactivarea unui cont, prevenind pierderea accidentală.</p>
								</div>
							</div>
						</div>
						<div className='callout'>
							<div className='stamp-mini'>EU</div>
							<p>Conformitate garantată: platforma respectă standardele europene de protecție a datelor, oferind liniște managerilor și clienților.</p>
						</div>
					</div>
				</section>

				<section className='cta-section wrap' data-reveal>
					<div className='eyebrow'>Următorul pas</div>
					<h2>Maximalizați eficiența echipei chiar de astăzi!</h2>
					<p className='lede'>Eliminați haosul din gestionarea lucrărilor din teren și ridicați experiența clienților la un alt nivel cu AW-SERVICE. Solicitați un demo personalizat!</p>
					<div className='cta-btnrow'>
						<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20AW-SERVICE'>Solicită un demo gratuit</a>
					</div>
					<div className='contact-card'>
						<div className='contact-row'>
							<span className='k'>Email</span>
							<span className='v'>daczdvid@gmail.com</span>
						</div>
						<div className='contact-row'>
							<span className='k'>Telefon</span>
							<span className='v'>0744 885 242</span>
						</div>
						<div className='next-step'>→ Solicitați un demo gratuit și vedeți platforma în acțiune.</div>
					</div>
				</section>
			</main>

			<footer className='wrap'>
				<div className='footer-inner'>
					<p className='tag'>„AW-SERVICE — platforma care transformă haosul din teren în eficiență măsurabilă.”</p>
					<p className='fine'>© 2026 AW-SERVICE</p>
				</div>
			</footer>

			{/* eslint-disable-next-line react/no-unknown-property */}
			<style jsx global>
				{`
				:root {
					--bg: #EEF0E9;
					--bg-panel: #E4E7DC;
					--surface: #FBFBF7;
					--surface-strong: #F4F5EE;
					--ink: #1A1F19;
					--ink-soft: #4C5348;
					--ink-faint: #7A8172;
					--border: #D3D6C7;
					--border-strong: #B9BEA9;
					--accent: #1F5C34;
					--accent-strong: #163F24;
					--accent-ink: #F4F8F1;
					--accent-soft: #DCE8DA;
					--warn: #B3590C;
					--warn-strong: #8C4409;
					--warn-soft: #F1E1CC;
					--warn-ink: #2A1706;
					--shadow: 0 1px 2px rgba(26,31,25,0.06), 0 8px 24px -12px rgba(26,31,25,0.18);
					--serif: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
					--sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
					--mono: "SF Mono", "IBM Plex Mono", "Roboto Mono", Menlo, Consolas, monospace;
				}

				@media (prefers-color-scheme: dark) {
					:root {
						--bg: #12160F;
						--bg-panel: #191F14;
						--surface: #1C2217;
						--surface-strong: #202719;
						--ink: #ECEEE6;
						--ink-soft: #B7BEAC;
						--ink-faint: #7E8672;
						--border: #333A2A;
						--border-strong: #454D37;
						--accent: #4EA968;
						--accent-strong: #6FC384;
						--accent-ink: #0D1A0F;
						--accent-soft: #223A28;
						--warn: #E28A3D;
						--warn-strong: #F0A55F;
						--warn-soft: #3B2A16;
						--warn-ink: #FBE7CD;
						--shadow: 0 1px 2px rgba(0,0,0,0.3), 0 12px 28px -14px rgba(0,0,0,0.6);
					}
				}
				:root[data-theme="dark"] {
					--bg: #12160F; --bg-panel: #191F14; --surface: #1C2217; --surface-strong: #202719;
					--ink: #ECEEE6; --ink-soft: #B7BEAC; --ink-faint: #7E8672;
					--border: #333A2A; --border-strong: #454D37;
					--accent: #4EA968; --accent-strong: #6FC384; --accent-ink: #0D1A0F; --accent-soft: #223A28;
					--warn: #E28A3D; --warn-strong: #F0A55F; --warn-soft: #3B2A16; --warn-ink: #FBE7CD;
					--shadow: 0 1px 2px rgba(0,0,0,0.3), 0 12px 28px -14px rgba(0,0,0,0.6);
				}
				:root[data-theme="light"] {
					--bg: #EEF0E9; --bg-panel: #E4E7DC; --surface: #FBFBF7; --surface-strong: #F4F5EE;
					--ink: #1A1F19; --ink-soft: #4C5348; --ink-faint: #7A8172;
					--border: #D3D6C7; --border-strong: #B9BEA9;
					--accent: #1F5C34; --accent-strong: #163F24; --accent-ink: #F4F8F1; --accent-soft: #DCE8DA;
					--warn: #B3590C; --warn-strong: #8C4409; --warn-soft: #F1E1CC; --warn-ink: #2A1706;
					--shadow: 0 1px 2px rgba(26,31,25,0.06), 0 8px 24px -12px rgba(26,31,25,0.18);
				}

				* { box-sizing: border-box; }
				html, body { margin: 0; padding: 0; }
				body {
					background: var(--bg);
					color: var(--ink);
					font-family: var(--sans);
					font-size: 16px;
					line-height: 1.55;
					-webkit-font-smoothing: antialiased;
					overflow-x: hidden;
				}
				::selection { background: var(--accent); color: var(--accent-ink); }
				a { color: inherit; }
				h1, h2, h3 { font-family: var(--serif); font-weight: 600; text-wrap: balance; margin: 0; color: var(--ink); }
				p { margin: 0; }
				.wrap { max-width: 1040px; margin: 0 auto; padding: 0 28px; }
				.eyebrow {
					font-family: var(--mono);
					font-size: 12.5px;
					letter-spacing: 0.14em;
					text-transform: uppercase;
					color: var(--accent);
					font-weight: 600;
				}
				.eyebrow.warn { color: var(--warn); }
				section { position: relative; }

				header {
					position: sticky; top: 0; z-index: 40;
					background: color-mix(in srgb, var(--bg) 88%, transparent);
					backdrop-filter: blur(10px);
					border-bottom: 1px solid var(--border);
				}
				.header-inner {
					display: flex; align-items: center; justify-content: space-between;
					padding: 16px 28px; max-width: 1040px; margin: 0 auto;
				}
				.logo {
					font-family: var(--mono); font-weight: 700; font-size: 17px; letter-spacing: 0.02em;
					display: flex; align-items: center; gap: 8px;
				}
				.logo .mark {
					width: 22px; height: 22px; border-radius: 50%;
					border: 1.5px solid var(--accent); color: var(--accent);
					display: flex; align-items: center; justify-content: center;
					font-size: 12px; font-weight: 700;
				}
				.btn {
					font-family: var(--sans); font-weight: 600; font-size: 14.5px;
					border-radius: 3px; padding: 10px 18px; cursor: pointer;
					border: 1px solid transparent; text-decoration: none; display: inline-block;
					transition: transform .15s ease, box-shadow .15s ease;
				}
				.btn:hover { transform: translateY(-1px); }
				.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
				.btn-primary { background: var(--accent); color: var(--accent-ink); box-shadow: var(--shadow); }
				.btn-ghost { background: transparent; color: var(--ink); border-color: var(--border-strong); font-size: 13.5px; padding: 8px 14px; }

				.hero { padding: 76px 0 64px; }
				.hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
				.hero h1 { font-size: clamp(32px, 4.4vw, 48px); line-height: 1.12; margin-top: 14px; }
				.hero .lede { font-size: 18px; color: var(--ink-soft); margin-top: 18px; max-width: 46ch; }
				.hero-ctas { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; }
				.hero-ctas .btn-ghost { align-self: center; color: var(--ink-soft); border: none; padding: 10px 4px; }

				.ticket {
					background: var(--surface);
					border: 1px solid var(--border);
					border-radius: 6px;
					box-shadow: var(--shadow);
					padding: 22px 24px 20px;
					font-family: var(--mono);
					position: relative;
					transform: rotate(-1.2deg);
				}
				.ticket-head {
					display: flex; justify-content: space-between; align-items: baseline;
					border-bottom: 1px dashed var(--border-strong); padding-bottom: 12px; margin-bottom: 14px;
				}
				.ticket-head .id { font-size: 12px; color: var(--ink-faint); letter-spacing: 0.06em; }
				.ticket-head .status {
					font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
					background: var(--accent-soft); color: var(--accent-strong);
					padding: 3px 8px; border-radius: 2px;
				}
				.ticket-row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13.5px; border-bottom: 1px solid var(--border); }
				.ticket-row:last-of-type { border-bottom: none; }
				.ticket-row .k { color: var(--ink-faint); }
				.ticket-row .v { color: var(--ink); font-weight: 600; text-align: right; }
				.stamp {
					position: absolute; top: -14px; right: -10px;
					width: 92px; height: 92px; border-radius: 50%;
					border: 2.5px solid var(--accent); color: var(--accent);
					display: flex; align-items: center; justify-content: center; text-align: center;
					font-family: var(--mono); font-weight: 700; font-size: 10.5px; letter-spacing: 0.08em;
					transform: rotate(11deg);
					background: color-mix(in srgb, var(--surface) 75%, transparent);
					opacity: 0; animation: stamp-in .5s cubic-bezier(.2,1.4,.4,1) .5s forwards;
				}
				@keyframes stamp-in { from { opacity: 0; transform: rotate(28deg) scale(1.5);} to { opacity: 1; transform: rotate(11deg) scale(1);} }

				.section { padding: 84px 0; border-top: 1px solid var(--border); }
				.section-head { max-width: 640px; margin-bottom: 44px; }
				.section-head h2 { font-size: clamp(26px, 3vw, 34px); margin-top: 10px; }
				.section-head .sub { color: var(--ink-soft); font-size: 16.5px; margin-top: 12px; }
				.section.alt { background: var(--bg-panel); }

				[data-reveal] { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
				[data-reveal].in-view { opacity: 1; transform: translateY(0); }
				@media (prefers-reduced-motion: reduce) {
					[data-reveal] { opacity: 1; transform: none; transition: none; }
					.stamp { animation: none; opacity: 1; }
				}

				.outcomes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
				.outcome-card {
					background: var(--surface); border: 1px solid var(--border); border-radius: 6px;
					padding: 24px 22px;
				}
				.outcome-card .tag { font-family: var(--mono); font-size: 11.5px; color: var(--accent); letter-spacing: 0.06em; }
				.outcome-card h3 { font-family: var(--sans); font-size: 17.5px; font-weight: 700; margin-top: 10px; }
				.outcome-card p { color: var(--ink-soft); font-size: 14.5px; margin-top: 8px; }

				.problems { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border-strong); border: 1px solid var(--border-strong); border-radius: 6px; overflow: hidden; }
				.problem-card { background: var(--surface); padding: 26px 24px; }
				.problem-card .num { font-family: var(--mono); font-size: 12px; color: var(--warn); letter-spacing: 0.06em; }
				.problem-card h3 { font-family: var(--sans); font-size: 16.5px; font-weight: 700; margin-top: 8px; }
				.problem-card p { color: var(--ink-soft); font-size: 14.5px; margin-top: 8px; }

				.tear {
					background: var(--surface-strong);
					padding: 34px 0;
					position: relative;
				}
				.tear::before, .tear::after {
					content: ""; position: absolute; left: 0; right: 0; height: 11px;
					background-image: radial-gradient(circle at 11px 50%, var(--bg) 6px, transparent 6.5px);
					background-size: 22px 11px; background-repeat: repeat-x;
				}
				.tear::before { top: -5.5px; }
				.tear::after { bottom: -5.5px; transform: scaleY(-1); }
				.tear-text {
					text-align: center; font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.1em;
					color: var(--ink-faint); text-transform: uppercase;
				}
				.tear-text b { color: var(--ink); }

				.roles { display: grid; grid-template-columns: 1fr auto 1fr; gap: 18px; align-items: center; margin-top: 40px; }
				.role-box {
					background: var(--surface); border: 1px solid var(--border); border-radius: 6px;
					padding: 22px; text-align: center;
				}
				.role-box .who { font-family: var(--mono); font-size: 11.5px; color: var(--ink-faint); letter-spacing: 0.08em; text-transform: uppercase; }
				.role-box .what { font-family: var(--sans); font-weight: 700; font-size: 17px; margin-top: 6px; }
				.role-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--accent); }
				.role-flow .arrow { font-size: 20px; }
				.role-steps { display: flex; gap: 8px; font-family: var(--mono); font-size: 10px; color: var(--ink-faint); text-align: center; flex-wrap: wrap; justify-content: center; margin-top: 6px; }

				.benefit-list { list-style: none; margin: 36px 0 0; padding: 0; display: grid; gap: 12px; }
				.benefit-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 15.5px; color: var(--ink); }
				.benefit-list .check {
					flex: none; width: 18px; height: 18px; border-radius: 50%; margin-top: 2px;
					background: var(--accent-soft); color: var(--accent-strong);
					display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
				}

				.timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; margin-top: 8px; }
				.timeline::before {
					content: ""; position: absolute; top: 13px; left: 8%; right: 8%; height: 1px;
					background: repeating-linear-gradient(to right, var(--border-strong) 0 6px, transparent 6px 12px);
				}
				.timeline-item { padding: 0 18px 0 0; position: relative; }
				.timeline-item .dot {
					width: 26px; height: 26px; border-radius: 50%; background: var(--surface);
					border: 2px solid var(--accent); color: var(--accent);
					display: flex; align-items: center; justify-content: center;
					font-family: var(--mono); font-size: 10px; font-weight: 700; position: relative; z-index: 1;
				}
				.timeline-item .tstamp { font-family: var(--mono); font-size: 11px; color: var(--ink-faint); margin-top: 12px; letter-spacing: 0.04em; }
				.timeline-item h3 { font-family: var(--sans); font-size: 16px; font-weight: 700; margin-top: 6px; }
				.timeline-item p { color: var(--ink-soft); font-size: 14px; margin-top: 6px; max-width: 26ch; }

				.callout {
					margin-top: 32px; padding: 20px 22px; border-radius: 6px;
					background: var(--accent-soft); border: 1px solid var(--border);
					display: flex; gap: 14px; align-items: flex-start;
				}
				.callout .stamp-mini {
					flex: none; width: 34px; height: 34px; border-radius: 50%;
					border: 2px solid var(--accent-strong); color: var(--accent-strong);
					display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700;
				}
				.callout p { font-size: 14.5px; color: var(--accent-strong); font-weight: 600; }
				.callout.warn { background: var(--warn-soft); }
				.callout.warn .stamp-mini { border-color: var(--warn-strong); color: var(--warn-strong); }
				.callout.warn p { color: var(--warn-ink); }

				.sign-feature { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 8px; }
				.sign-card {
					background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 26px;
				}
				.sign-line { border-bottom: 1px solid var(--border-strong); padding-bottom: 10px; margin-top: 26px; position: relative; height: 44px; }
				.sign-line svg { position: absolute; bottom: 6px; left: 0; }
				.sign-line .cap { font-family: var(--mono); font-size: 10.5px; color: var(--ink-faint); position: absolute; bottom: -18px; left: 0; letter-spacing: 0.05em; }
				.feat3 { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
				.feat3 li { display: flex; gap: 14px; }
				.feat3 .idx { font-family: var(--mono); color: var(--accent); font-weight: 700; font-size: 13px; flex: none; padding-top: 2px; }
				.feat3 h3 { font-family: var(--sans); font-size: 16px; font-weight: 700; }
				.feat3 p { color: var(--ink-soft); font-size: 14.5px; margin-top: 4px; }

				.spec-list { display: grid; gap: 0; border-top: 1px solid var(--border); margin-top: 36px; }
				.spec-row { display: grid; grid-template-columns: 200px 1fr; gap: 24px; padding: 20px 0; border-bottom: 1px solid var(--border); }
				.spec-row .label { font-family: var(--mono); font-size: 12.5px; color: var(--ink-faint); letter-spacing: 0.05em; text-transform: uppercase; padding-top: 2px; }
				.spec-row h3 { font-family: var(--sans); font-size: 16px; font-weight: 700; }
				.spec-row p { color: var(--ink-soft); font-size: 14.5px; margin-top: 5px; }

				.cta-section { text-align: center; padding: 96px 0 88px; }
				.cta-section h2 { font-size: clamp(28px, 3.6vw, 40px); max-width: 720px; margin: 12px auto 0; }
				.cta-section .lede { max-width: 52ch; margin: 18px auto 0; color: var(--ink-soft); font-size: 16.5px; }
				.cta-btnrow { display: flex; justify-content: center; margin-top: 32px; }
				.contact-card {
					margin: 44px auto 0; max-width: 460px;
					background: var(--surface); border: 1px solid var(--border); border-radius: 6px;
					box-shadow: var(--shadow); padding: 26px 30px; text-align: left;
				}
				.contact-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--border-strong); font-size: 14.5px; }
				.contact-row:last-child { border-bottom: none; }
				.contact-row .k { font-family: var(--mono); font-size: 11px; color: var(--ink-faint); letter-spacing: 0.06em; text-transform: uppercase; }
				.contact-row .v { font-weight: 700; font-family: var(--mono); }
				.next-step { margin-top: 18px; font-size: 13px; color: var(--ink-faint); font-family: var(--mono); }

				footer { border-top: 1px solid var(--border); padding: 36px 0; }
				.footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
				.footer-inner .tag { font-family: var(--serif); font-style: italic; color: var(--ink-soft); font-size: 14.5px; max-width: 44ch; }
				.footer-inner .fine { font-family: var(--mono); font-size: 12px; color: var(--ink-faint); }

				@media (max-width: 860px) {
					.hero-grid { grid-template-columns: 1fr; }
					.ticket { transform: none; margin-top: 12px; }
					.outcomes { grid-template-columns: 1fr; }
					.problems { grid-template-columns: 1fr; }
					.roles { grid-template-columns: 1fr; }
					.role-flow { flex-direction: row; }
					.role-flow .arrow { transform: rotate(90deg); }
					.timeline { grid-template-columns: 1fr; gap: 28px; }
					.timeline::before { display: none; }
					.sign-feature { grid-template-columns: 1fr; gap: 28px; }
					.spec-row { grid-template-columns: 1fr; gap: 6px; }
					.footer-inner { flex-direction: column; align-items: flex-start; }
				}
			`}
			</style>
		</>
	);
};

export default HomePage;
