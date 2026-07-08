import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
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
				<title>Cordiss — Platformă field service</title>
			</Head>

			<header>
				<div className='header-inner'>
					<div className='logo'>
						<Image src='/images/logo.png' alt='Cordiss' width={32} height={32} />
						Cordiss
					</div>
					<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20Cordiss'>Solicită un demo</a>
				</div>
			</header>

			<main>
				<section className='hero wrap'>
					<div className='hero-grid'>
						<div>
							<h1>Platformă inteligentă pentru service&nbsp;și lucrări din teren.</h1>
							<p className='lede'>Fluxuri de lucru digitalizate, monitorizare în timp real și rapoarte automate — eficiență maximă, fără birocrație.</p>
							<div className='hero-ctas'>
								<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20Cordiss'>Solicită un demo gratuit</a>
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
									<span className='id'>BON #CO-4471</span>
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
									<span className='k'>Semnătură client</span>
									<span className='v'>✓ 14 iun, 16:42</span>
								</div>
								<div className='ticket-row highlight'>
									<span className='k'>Satisfacția clientului</span>
									<span className='v accent'>100% ✓</span>
								</div>
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

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='results-grid'>
							<div className='shot results-shot'>
								<Image src='/images/calendar-list.png' alt='Calendarul echipei cu lucrările active, în aplicația Cordiss' width={640} height={1316} />
							</div>
							<div>
								<h2><span className='hl'>Cordiss</span>: eficiența cuantificată</h2>
								<p className='sub'>Rezultate concrete, măsurabile, de la prima zi de utilizare.</p>
								<div className='outcomes-table'>
									<div className='outcome-row'>
										<div className='tag'>+25%</div>
										<div>
											<h3>Capacitate de lucru</h3>
											<p>Creștere fără angajări suplimentare. Calendarul inteligent și monitorizarea live elimină timpii morți.</p>
										</div>
									</div>
									<div className='outcome-row'>
										<div className='tag'>30%</div>
										<div>
											<h3>Reducere administrativ</h3>
											<p>Formulare digitale în 3 pași și cronometru în timp real elimină introducerea manuală a datelor.</p>
										</div>
									</div>
									<div className='outcome-row'>
										<div className='tag'>0</div>
										<div>
											<h3>Zero clienți pierduți</h3>
											<p>Baza de date centralizată cu filtre avansate garantează că nicio comandă nu se pierde.</p>
										</div>
									</div>
								</div>
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

				<section className='section' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>Soluția</div>
							<h2>Control și transparență</h2>
							<p className='sub'>O platformă cu două roluri care conectează biroul și terenul — de la alocarea lucrării până la semnătura clientului.</p>
						</div>

						<div className='roles'>
							<div className='role-box'>
								<div className='role-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<rect x='2.5' y='4' width='19' height='12.5' rx='1.5' />
										<path d='M9 20.5h6M12 16.5v4' />
									</svg>
								</div>
								<div className='who'><i className='dot' aria-hidden='true' />Birou</div>
								<div className='what'>Interfața Admin</div>
							</div>

							<div className='role-connector'>
								<div className='connector-track'>
									<span className='wire' aria-hidden='true'><i className='pulse' /></span>
									<span className='node'>ALOCARE</span>
									<span className='node'>EXECUȚIE</span>
									<span className='node'>SEMNĂTURĂ</span>
									<span className='node'>RAPORT</span>
								</div>
								<div className='connector-sync'>⇄ Sincronizare în timp real</div>
							</div>

							<div className='role-box'>
								<div className='role-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<rect x='6.5' y='2.5' width='11' height='19' rx='2.5' />
										<path d='M10.5 18.5h3' />
									</svg>
								</div>
								<div className='who'><i className='dot' aria-hidden='true' />Teren</div>
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

						<div className='flow-strip'>
							<div className='flow-step'>
								<div className='shot small'>
									<Image src='/images/job-new.png' alt='Creare lucrare nouă în 4 pași' width={628} height={1324} />
								</div>
								<div className='flow-label'>01 · Alocare</div>
							</div>
							<span className='flow-arrow'>→</span>
							<div className='flow-step'>
								<div className='shot small'>
									<Image src='/images/job-active.png' alt='Sesiune de lucru activă, cronometrată în timp real' width={632} height={1310} />
								</div>
								<div className='flow-label'>02 · Execuție</div>
							</div>
							<span className='flow-arrow'>→</span>
							<div className='flow-step'>
								<div className='shot small'>
									<Image src='/images/signature.png' alt='Semnătură digitală a clientului pe ecranul telefonului' width={680} height={1296} />
								</div>
								<div className='flow-label'>03 · Semnătură</div>
							</div>
							<span className='flow-arrow'>→</span>
							<div className='flow-step'>
								<div className='shot small'>
									<Image src='/images/report-preview.png' alt='Raport PDF generat automat' width={640} height={1326} />
								</div>
								<div className='flow-label'>04 · Raport</div>
							</div>
						</div>
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
								<div className='step-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<path d='M3 8.8A1.8 1.8 0 0 1 4.8 7H7l1.2-1.9h7.6L17 7h2.2A1.8 1.8 0 0 1 21 8.8v8.4A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.2z' />
										<circle cx='12' cy='13' r='3.2' />
									</svg>
								</div>
								<div className='step-time'>
									<span className='time'>08:14</span>
									<span className='phase'>START</span>
								</div>
								<h3>Verificare foto obligatorie</h3>
								<p>Tehnicianul documentează starea inițială și contorul prin fotografii la pornirea intervenției.</p>
							</div>
							<span className='timeline-arrow' aria-hidden='true'>→</span>
							<div className='timeline-item'>
								<div className='step-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<path d='M12 3l7 2.4v5.1c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V5.4z' />
										<path d='M9 12l2.2 2.2L15 10.4' />
									</svg>
								</div>
								<div className='step-time'>
									<span className='time'>16:42</span>
									<span className='phase'>STOP</span>
								</div>
								<h3>Dovadă foto la finalizare</h3>
								<p>Fotografiile de la oprire demonstrează lucrarea efectuată, reducând drastic disputele cu clienții.</p>
							</div>
							<span className='timeline-arrow' aria-hidden='true'>→</span>
							<div className='timeline-item'>
								<div className='step-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<path d='M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z' />
										<path d='M14 3v4h4' />
										<path d='M9 13h6M9 16.5h4' />
									</svg>
								</div>
								<div className='step-time'>
									<span className='time'>16:43</span>
									<span className='phase'>RAPORT</span>
								</div>
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
					<p className='lede'>Eliminați haosul din gestionarea lucrărilor din teren și ridicați experiența clienților la un alt nivel cu Cordiss. Solicitați un demo personalizat!</p>
					<div className='cta-btnrow'>
						<a className='btn btn-primary' href='mailto:daczdvid@gmail.com?subject=Solicitare%20demo%20Cordiss'>Solicită un demo gratuit</a>
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
					<p className='tag'>„Cordiss — platforma care transformă haosul din teren în eficiență măsurabilă.”</p>
					<p className='fine'>© 2026 Cordiss</p>
				</div>
			</footer>
		</>
	);
};

export default HomePage;
