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
						<Image src='/images/logo.png' alt='Cordiss' width={22} height={22} />
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

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='results-grid'>
							<div className='shot results-shot'>
								<Image src='/images/calendar-list.png' alt='Calendarul echipei cu lucrările active, în aplicația Cordiss' width={640} height={1316} />
							</div>
							<div>
								<div className='eyebrow'>Rezultate</div>
								<h2>Cordiss: eficiența cuantificată</h2>
								<p className='sub'>Rezultate concrete, măsurabile, de la prima zi de utilizare.</p>
								<div className='outcomes-table'>
									<div className='outcome-row'>
										<div className='tag'>01</div>
										<div>
											<h3>Capacitate de lucru</h3>
											<p>Creștere fără angajări suplimentare. Calendarul inteligent și monitorizarea live elimină timpii morți.</p>
										</div>
									</div>
									<div className='outcome-row'>
										<div className='tag'>02</div>
										<div>
											<h3>Reducere administrativ</h3>
											<p>Formulare digitale în 3 pași și cronometru în timp real elimină introducerea manuală a datelor.</p>
										</div>
									</div>
									<div className='outcome-row'>
										<div className='tag'>03</div>
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
							<p className='sub'>Cordiss conectează coordonarea de la birou (interfața Admin) cu activitatea tehnicienilor din teren (aplicația mobilă) — o platformă cu două roluri care acoperă întregul flux de service, de la alocarea lucrării până la semnătura clientului.</p>
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
								<div className='shot'>
									<Image src='/images/signature.png' alt='Ecran de semnătură client, cu numele semnatarului și data adăugate automat' width={680} height={1296} />
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
