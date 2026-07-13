import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	FC, Fragment, FormEvent, useEffect, useRef, useState,
} from 'react';

import {
	Dict, Locale, LOCALES, translations,
} from '../i18n/translations';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error' | 'invalid';

const FLOW_IMAGES = [
	{ src: '/images/job-new.png', w: 3904, h: 8192 },
	{ src: '/images/job-active.png', w: 3904, h: 8192 },
	{ src: '/images/signature.png', w: 3904, h: 8192 },
	{ src: '/images/report-preview.png', w: 3904, h: 8192 },
];

const TIMELINE_TIMES = ['08:14', '16:42', '16:43'];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'david.daczo@cordiss.com';

const TIMELINE_ICONS = [
	(
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
			<path d='M3 8.8A1.8 1.8 0 0 1 4.8 7H7l1.2-1.9h7.6L17 7h2.2A1.8 1.8 0 0 1 21 8.8v8.4A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.2z' />
			<circle cx='12' cy='13' r='3.2' />
		</svg>
	),
	(
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
			<path d='M12 3l7 2.4v5.1c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V5.4z' />
			<path d='M9 12l2.2 2.2L15 10.4' />
		</svg>
	),
	(
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
			<path d='M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z' />
			<path d='M14 3v4h4' />
			<path d='M9 13h6M9 16.5h4' />
		</svg>
	),
];

const LanguageSelector: FC = () => {
	const { locale, asPath } = useRouter();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

	useEffect(() => {
		if (!open) return undefined;
		const onDocEvent = (e: MouseEvent | KeyboardEvent) => {
			if (e instanceof KeyboardEvent) {
				if (e.key === 'Escape') setOpen(false);
				return;
			}
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', onDocEvent);
		document.addEventListener('keydown', onDocEvent);
		return () => {
			document.removeEventListener('mousedown', onDocEvent);
			document.removeEventListener('keydown', onDocEvent);
		};
	}, [open]);

	return (
		<div className='lang-select' ref={ref}>
			<button
				type='button'
				className='lang-trigger'
				aria-haspopup='listbox'
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
			>
				{current.label}
				<svg className='lang-chevron' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
					<path d='m6 9 6 6 6-6' />
				</svg>
			</button>
			{open && (
				<div className='lang-menu' role='listbox'>
					{LOCALES.filter((l) => l.code !== locale).map((l) => (
						<Link
							key={l.code}
							href={asPath}
							locale={l.code}
							className='lang-menu-item'
							role='option'
							aria-selected='false'
							onClick={() => setOpen(false)}
						>
							{l.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

const ContactForm: FC<{ t: Dict['form'] }> = ({ t }) => {
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState<SubmitStatus>('idle');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (status === 'sending') return;
		if (!name.trim() || !company.trim() || !email.trim()) {
			setStatus('invalid');
			return;
		}
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name, company, email, phone, message,
				}),
			});
			if (!res.ok) throw new Error('request failed');
			setStatus('success');
			setName('');
			setCompany('');
			setEmail('');
			setPhone('');
			setMessage('');
		} catch {
			setStatus('error');
		}
	};

	return (
		<form className='contact-form' onSubmit={handleSubmit} noValidate>
			<div className='contact-form-head'>
				<span className='eyebrow'>{t.headEyebrow}</span>
				<p>{t.headText}</p>
			</div>
			<div className='form-fields'>
				<input
					className='field' type='text' name='name' placeholder={t.name} required
					autoComplete='name' value={name} onChange={(e) => setName(e.target.value)}
				/>
				<input
					className='field' type='text' name='company' placeholder={t.company} required
					autoComplete='organization' value={company} onChange={(e) => setCompany(e.target.value)}
				/>
			</div>
			<div className='form-fields'>
				<input
					className='field' type='email' name='email' placeholder={t.email} required
					autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className='field' type='tel' name='phone' placeholder={t.phone}
					autoComplete='tel' value={phone} onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<textarea
				className='field' name='message' rows={3} placeholder={t.message}
				value={message} onChange={(e) => setMessage(e.target.value)}
			/>
			<button className='btn btn-primary' type='submit' disabled={status === 'sending'}>
				{status === 'sending' ? t.submitting : t.submit}
			</button>
			{status === 'success' && <p className='form-msg ok'>{t.success}</p>}
			{status === 'error' && <p className='form-msg err'>{t.error}</p>}
			{status === 'invalid' && <p className='form-msg err'>{t.required}</p>}
		</form>
	);
};

const HomePage: NextPage = () => {
	const { locale } = useRouter();
	const t = translations[locale as Locale] ?? translations.ro;

	useEffect(() => {
		if (locale) document.documentElement.lang = locale;
	}, [locale]);

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
				<title>{t.meta.title}</title>
			</Head>

			<header>
				<div className='header-inner'>
					<div className='logo'>
						<Image src='/images/logo.png' alt='Cordiss' width={32} height={32} />
						Cordiss
					</div>
					<div className='header-actions'>
						<LanguageSelector />
						<a className='btn btn-primary' href='#contact'>{t.nav.demo}</a>
					</div>
				</div>
			</header>

			<main>
				<section className='hero wrap'>
					<div className='hero-grid'>
						<div>
							<h1>{t.hero.title}</h1>
							<p className='lede'>{t.hero.lede}</p>
							<div className='hero-ctas'>
								<a className='btn btn-primary' href='#contact'>{t.hero.ctaPrimary}</a>
								<a className='btn btn-ghost' href='#problema'>{t.hero.ctaGhost}</a>
							</div>
						</div>
						<div>
							<div className='ticket'>
								<div className='stamp'>
									{t.ticket.done}
									<br />
									{t.ticket.verified}
								</div>
								<div className='ticket-head'>
									<span className='id'>BON #CO-4471</span>
									<span className='status'>{t.ticket.done}</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>{t.ticket.client}</span>
									<span className='v'>Agro Nord SRL</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>{t.ticket.machine}</span>
									<span className='v'>Tractor · SN 88214</span>
								</div>
								<div className='ticket-row'>
									<span className='k'>{t.ticket.signature}</span>
									<span className='v'>✓ 14 iun, 16:42</span>
								</div>
								<div className='ticket-row highlight'>
									<span className='k'>{t.ticket.satisfaction}</span>
									<span className='v accent'>100% ✓</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className='wrap hero-outcomes'>
					<div className='outcomes-strip'>
						{t.results.outcomes.map((o) => (
							<div className='outcome-chip' key={o.title}>
								<div className='tag'>{o.tag}</div>
								<div className='outcome-chip-title'>{o.title}</div>
							</div>
						))}
					</div>
				</div>

				<div className='tear'>
					<p className='tear-text'>
						<span>{t.tear.from}</span>
						<span className='tear-sep' aria-hidden='true'>→</span>
						<b>{t.tear.to}</b>
					</p>
				</div>

				<section className='section' id='problema' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow warn'>{t.problems.eyebrow}</div>
							<h2>{t.problems.title}</h2>
							<p className='sub'>{t.problems.sub}</p>
						</div>
						<div className='problem-grid'>
							<div className='shot problem-shot'>
								<Image src='/images/calendar-list.png' alt='Cordiss' width={3904} height={8192} />
							</div>
							<div className='problems compact'>
								{t.problems.cards.map((c, i) => (
									<div className='problem-card' key={c.title}>
										<div className='num'>{`0${i + 1}`}</div>
										<div>
											<h3>{c.title}</h3>
											<p>{c.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className='section' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>{t.solution.eyebrow}</div>
							<h2>{t.solution.title}</h2>
							<p className='sub'>{t.solution.sub}</p>
						</div>

						<div className='roles'>
							<div className='role-box'>
								<div className='role-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<rect x='2.5' y='4' width='19' height='12.5' rx='1.5' />
										<path d='M9 20.5h6M12 16.5v4' />
									</svg>
								</div>
								<div className='who'><i className='dot' aria-hidden='true' />{t.solution.office.who}</div>
								<div className='what'>{t.solution.office.what}</div>
							</div>

							<div className='role-connector'>
								<div className='connector-track'>
									<span className='wire' aria-hidden='true'><i className='pulse' /></span>
									{t.solution.nodes.map((n) => (
										<span className='node' key={n}>{n}</span>
									))}
								</div>
							</div>

							<div className='role-box'>
								<div className='role-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
										<rect x='6.5' y='2.5' width='11' height='19' rx='2.5' />
										<path d='M10.5 18.5h3' />
									</svg>
								</div>
								<div className='who'><i className='dot' aria-hidden='true' />{t.solution.field.who}</div>
								<div className='what'>{t.solution.field.what}</div>
							</div>
						</div>

						<ul className='benefit-list'>
							{t.solution.benefits.map((b) => (
								<li key={b}>
									<span className='check'>✓</span>
									{b}
								</li>
							))}
						</ul>

						<div className='flow-strip'>
							{t.solution.flow.map((f, i) => (
								<Fragment key={f.label}>
									{i > 0 && <span className='flow-arrow'>→</span>}
									<div className='flow-step'>
										<div className='shot small'>
											<Image src={FLOW_IMAGES[i].src} alt={f.alt} width={FLOW_IMAGES[i].w} height={FLOW_IMAGES[i].h} />
										</div>
										<div className='flow-label'>{`0${i + 1} · ${f.label}`}</div>
									</div>
								</Fragment>
							))}
						</div>
					</div>
				</section>

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>{t.timeline.eyebrow}</div>
							<h2>{t.timeline.title}</h2>
						</div>
						<div className='timeline'>
							{t.timeline.steps.map((s, i) => (
								<Fragment key={s.title}>
									{i > 0 && <span className='timeline-arrow' aria-hidden='true'>→</span>}
									<div className='timeline-item'>
										<div className='step-icon' aria-hidden='true'>{TIMELINE_ICONS[i]}</div>
										<div className='step-time'>
											<span className='time'>{TIMELINE_TIMES[i]}</span>
											<span className='phase'>{s.phase}</span>
										</div>
										<h3>{s.title}</h3>
										<p>{s.desc}</p>
									</div>
								</Fragment>
							))}
						</div>
						<div className='callout'>
							<div className='stamp-mini'>✓</div>
							<p>{t.timeline.callout}</p>
						</div>
					</div>
				</section>

				<section className='section alt' data-reveal>
					<div className='wrap'>
						<div className='section-head'>
							<div className='eyebrow'>{t.security.eyebrow}</div>
							<h2>{t.security.title}</h2>
						</div>
						<div className='spec-list'>
							{t.security.rows.map((r) => (
								<div className='spec-row' key={r.label}>
									<div className='label'>{r.label}</div>
									<div>
										<h3>{r.title}</h3>
										<p>{r.desc}</p>
									</div>
								</div>
							))}
						</div>
						<div className='callout'>
							<div className='stamp-mini'>EU</div>
							<p>{t.security.callout}</p>
						</div>
					</div>
				</section>

				<section className='cta-section wrap' id='contact' data-reveal>
					<div className='eyebrow'>{t.cta.eyebrow}</div>
					<h2>{t.cta.title}</h2>
					<p className='lede'>{t.cta.lede}</p>
					<ContactForm t={t.form} />
					<div className='contact-methods'>
						<div className='contact-method'>
							<span className='cm-icon' aria-hidden='true'>
								<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
									<rect x='3' y='5' width='18' height='14' rx='2' />
									<path d='m3.5 7 8.5 6 8.5-6' />
								</svg>
							</span>
							<span className='cm-text'>
								<span className='cm-label'>{t.contact.email}</span>
								<span className='cm-value'>{contactEmail}</span>
							</span>
						</div>
						<a className='contact-method' href='tel:+40744885242'>
							<span className='cm-icon' aria-hidden='true'>
								<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round'>
									<path d='M6.5 3h3l1.2 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.2v3a1.6 1.6 0 0 1-1.7 1.6A16 16 0 0 1 4.9 5.2 1.6 1.6 0 0 1 6.5 3z' />
								</svg>
							</span>
							<span className='cm-text'>
								<span className='cm-label'>{t.contact.phone}</span>
								<span className='cm-value'>0744 885 242</span>
							</span>
						</a>
					</div>
				</section>
			</main>

			<footer className='wrap'>
				<div className='footer-inner'>
					<p className='tag'>{t.footer.tag}</p>
					<p className='fine'>{t.footer.fine}</p>
				</div>
			</footer>
		</>
	);
};

export default HomePage;
