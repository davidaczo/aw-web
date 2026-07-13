export type Locale = 'ro' | 'en' | 'hu';

export const LOCALES: { code: Locale; label: string }[] = [
	{ code: 'ro', label: 'RO' },
	{ code: 'en', label: 'EN' },
	{ code: 'hu', label: 'HU' },
];

const ro = {
	meta: { title: 'Cordiss — Platformă field service' },
	nav: { demo: 'Solicită un demo' },
	hero: {
		title: 'Compania ta pierde ore prețioase în administrație haotică, nu în lucrări.',
		lede: 'Nu ai vizibilitate asupra cine și ce lucrează în teren, iar planificarea lucrărilor viitoare devine haos — Cordiss elimină ineficiența cu fluxuri digitale, monitorizare live și programare clară a echipei.',
		ctaPrimary: 'Solicită un demo gratuit',
		ctaGhost: 'Vezi cum funcționează ↓',
	},
	ticket: {
		done: 'FINALIZAT', verified: '✓ VERIFICAT',
		client: 'Client', machine: 'Mașină', signature: 'Semnătură client', satisfaction: 'Satisfacția clientului',
	},
	tear: { from: 'De la haos de hârtii și mesaje', to: 'la un singur flux digital' },
	results: {
		outcomes: [
			{ tag: '+25%', title: 'Capacitate de lucru' },
			{ tag: '30%', title: 'Reducere administrativ' },
			{ tag: '0', title: 'Zero clienți pierduți' },
		],
	},
	problems: {
		eyebrow: 'Provocarea',
		title: 'Administrare haotică, procese invizibile',
		sub: 'Companiile de service pierd timp și bani din cauza lipsei de digitalizare și control.',
		cards: [
			{ title: 'Timp pierdut cu hârtiile', desc: 'Tehnicienii completează formulare manuale în loc să efectueze intervenții facturabile.' },
			{ title: 'Solicitări și clienți pierduți', desc: 'Fără sistem centralizat, comenzile se pierd și termenele sunt depășite.' },
			{ title: 'Lipsă de control în teren', desc: 'Managementul nu vede cine lucrează, unde se blochează procesul sau gradul de încărcare.' },
			{ title: 'Dispute cu clienții', desc: 'Lipsa dovezilor clare privind durata și calitatea intervenției generează conflicte.' },
		],
	},
	solution: {
		eyebrow: 'Soluția',
		title: 'Control și transparență',
		sub: 'O platformă cu două roluri care conectează biroul și terenul — de la alocarea lucrării până la semnătura clientului.',
		office: { who: 'Birou', what: 'Interfața Admin' },
		field: { who: 'Teren', what: 'Aplicația mobilă' },
		nodes: ['ALOCARE', 'EXECUȚIE', 'SEMNĂTURĂ', 'RAPORT'],
		benefits: [
			'Mai puțină birocrație pentru tehnician',
			'Monitorizare 100% pentru clienți și orele de lucru',
			'Utilizare maximă a capacității echipei și facturare imediată',
		],
		flow: [
			{ label: 'Alocare', alt: 'Creare lucrare nouă în 4 pași' },
			{ label: 'Execuție', alt: 'Sesiune de lucru activă, cronometrată în timp real' },
			{ label: 'Semnătură', alt: 'Semnătură digitală a clientului pe ecranul telefonului' },
			{ label: 'Raport', alt: 'Raport PDF generat automat' },
		],
	},
	timeline: {
		eyebrow: 'Funcționalitate',
		title: 'Garanția incontestabilă a calității',
		steps: [
			{ phase: 'START', title: 'Verificare foto obligatorie', desc: 'Tehnicianul documentează starea inițială și contorul prin fotografii la pornirea intervenției.' },
			{ phase: 'STOP', title: 'Dovadă foto la finalizare', desc: 'Fotografiile de la oprire demonstrează lucrarea efectuată, reducând drastic disputele cu clienții.' },
			{ phase: 'RAPORT', title: 'PDF generat instant', desc: 'Pe baza marcajelor temporale și fotografiilor salvate, aplicația generează un raport oficial PDF în câteva secunde.' },
		],
		callout: 'Rezultat: o dovadă clară, transparentă și incontestabilă a calității lucrării — disponibilă instant pentru client și management.',
	},
	security: {
		eyebrow: 'Securitate',
		title: 'Datele tale, în siguranță',
		rows: [
			{ label: 'Acces', title: 'Doar oamenii tăi au acces', desc: 'Fiecare angajat intră cu propriul cont — nimeni din afara echipei nu poate vedea datele companiei sau ale clienților tăi.' },
			{ label: 'Roluri', title: 'Fiecare vede doar ce trebuie', desc: 'Administratorii au acces complet; tehnicienii văd doar lucrările proprii, fără date care nu îi privesc.' },
			{ label: 'Criptare', title: 'Datele sunt criptate, mereu', desc: 'Fie că sunt introduse din aplicația de teren sau văzute în panoul de administrare, datele circulă și sunt stocate criptat, protejate de accesul neautorizat.' },
		],
		callout: 'Siguranța datelor nu e un titlu de marketing — e simplu: acces controlat, conturi protejate, nimic pierdut din greșeală.',
	},
	cta: {
		eyebrow: 'Următorul pas',
		title: 'Maximalizați eficiența echipei chiar de astăzi!',
		lede: 'Eliminați haosul din gestionarea lucrărilor din teren și ridicați experiența clienților la un alt nivel cu Cordiss. Solicitați un demo personalizat!',
	},
	form: {
		headEyebrow: 'Solicită un demo',
		headText: 'Completați formularul — vă contactăm în cel mai scurt timp.',
		name: 'Nume *', company: 'Companie *', email: 'Email *', phone: 'Telefon (opțional)',
		message: 'Câteva detalii despre echipa dvs. (opțional)',
		submit: 'Trimite solicitarea', submitting: 'Se trimite…',
		success: '✓ Mulțumim! V-am primit solicitarea și vă contactăm în curând.',
		error: 'A apărut o eroare. Încercați din nou sau scrieți-ne la david.daczo@cordiss.com.',
		required: 'Vă rugăm completați numele, compania și emailul.',
	},
	contact: { email: 'Email', phone: 'Telefon' },
	footer: {
		tag: '„Cordiss — platforma care transformă haosul din teren în eficiență măsurabilă.”',
		fine: '© 2026 Cordiss',
	},
};

export type Dict = typeof ro;

const en: Dict = {
	meta: { title: 'Cordiss — Field service platform' },
	nav: { demo: 'Request a demo' },
	hero: {
		title: 'Your company is losing hours to chaotic admin, not to billable work.',
		lede: 'You have no visibility into who’s working on what in the field, and planning future jobs turns into chaos — Cordiss cuts the inefficiency with digital workflows, live tracking, and clear team scheduling.',
		ctaPrimary: 'Request a free demo',
		ctaGhost: 'See how it works ↓',
	},
	ticket: {
		done: 'COMPLETED', verified: '✓ VERIFIED',
		client: 'Client', machine: 'Machine', signature: 'Client signature', satisfaction: 'Client satisfaction',
	},
	tear: { from: 'From paper chaos', to: 'to a single digital flow' },
	results: {
		outcomes: [
			{ tag: '+25%', title: 'Work capacity' },
			{ tag: '30%', title: 'Less admin' },
			{ tag: '0', title: 'Zero lost clients' },
		],
	},
	problems: {
		eyebrow: 'The challenge',
		title: 'Chaotic administration, invisible processes',
		sub: 'Service companies lose time and money due to a lack of digitization and control.',
		cards: [
			{ title: 'Time lost on paperwork', desc: 'Technicians fill out manual forms instead of doing billable work.' },
			{ title: 'Lost requests and clients', desc: 'Without a central system, orders get lost and deadlines are missed.' },
			{ title: 'No control in the field', desc: 'Management can’t see who is working, where the process stalls, or the workload.' },
			{ title: 'Disputes with clients', desc: 'The lack of clear proof of duration and quality generates conflicts.' },
		],
	},
	solution: {
		eyebrow: 'The solution',
		title: 'Control and transparency',
		sub: 'A two-role platform that connects the office and the field — from job assignment to the client’s signature.',
		office: { who: 'Office', what: 'Admin interface' },
		field: { who: 'Field', what: 'Mobile app' },
		nodes: ['ASSIGN', 'EXECUTE', 'SIGNATURE', 'REPORT'],
		benefits: [
			'Less paperwork for the technician',
			'Full monitoring of clients and work hours',
			'Maximum team capacity and instant invoicing',
		],
		flow: [
			{ label: 'Assignment', alt: 'Create a new job in 4 steps' },
			{ label: 'Execution', alt: 'Active work session, timed in real time' },
			{ label: 'Signature', alt: 'Client’s digital signature on the phone screen' },
			{ label: 'Report', alt: 'PDF report generated automatically' },
		],
	},
	timeline: {
		eyebrow: 'How it works',
		title: 'Undeniable proof of quality',
		steps: [
			{ phase: 'START', title: 'Mandatory photo check', desc: 'The technician documents the initial state and meter with photos at the start of the job.' },
			{ phase: 'STOP', title: 'Photo proof at completion', desc: 'Photos at stop demonstrate the work done, drastically reducing client disputes.' },
			{ phase: 'REPORT', title: 'Instant PDF', desc: 'Based on timestamps and saved photos, the app generates an official PDF report in seconds.' },
		],
		callout: 'Result: clear, transparent and undeniable proof of work quality — available instantly to client and management.',
	},
	security: {
		eyebrow: 'Security',
		title: 'Your data, kept safe',
		rows: [
			{ label: 'Access', title: 'Only your people get in', desc: 'Each employee logs in with their own account — no one outside your team can see your company’s or clients’ data.' },
			{ label: 'Roles', title: 'Everyone sees only what they need', desc: 'Admins have full access; technicians only see their own jobs, with nothing extra cluttering their view.' },
			{ label: 'Encryption', title: 'Your data is always encrypted', desc: 'Whether it’s entered from the field app or viewed in the admin panel, data travels and is stored encrypted, protected from unauthorized access.' },
		],
		callout: 'Data safety isn’t a marketing line here — it’s simple: controlled access, protected accounts, nothing lost by accident.',
	},
	cta: {
		eyebrow: 'Next step',
		title: 'Maximize your team’s efficiency starting today!',
		lede: 'Eliminate the chaos of managing field work and take your client experience to the next level with Cordiss. Request a personalized demo!',
	},
	form: {
		headEyebrow: 'Request a demo',
		headText: 'Fill in the form — we’ll get back to you shortly.',
		name: 'Name *', company: 'Company *', email: 'Email *', phone: 'Phone (optional)',
		message: 'A few details about your team (optional)',
		submit: 'Send request', submitting: 'Sending…',
		success: '✓ Thank you! We received your request and will contact you soon.',
		error: 'Something went wrong. Please try again or email us at david.daczo@cordiss.com.',
		required: 'Please fill in your name, company and email.',
	},
	contact: { email: 'Email', phone: 'Phone' },
	footer: {
		tag: '“Cordiss — the platform that turns field chaos into measurable efficiency.”',
		fine: '© 2026 Cordiss',
	},
};

const hu: Dict = {
	meta: { title: 'Cordiss — Helyszíni szerviz platform' },
	nav: { demo: 'Demó igénylése' },
	hero: {
		title: 'A céged drága órákat veszít a kaotikus adminisztrációban, nem a munkában.',
		lede: 'Nincs rálátásod arra, ki min dolgozik a terepen, a jövőbeli munkák tervezése pedig káosszá válik — a Cordiss digitális folyamatokkal, élő nyomon követéssel és átlátható ütemezéssel szünteti meg a hatékonyságvesztést.',
		ctaPrimary: 'Ingyenes demó igénylése',
		ctaGhost: 'Nézd meg, hogyan működik ↓',
	},
	ticket: {
		done: 'BEFEJEZVE', verified: '✓ ELLENŐRIZVE',
		client: 'Ügyfél', machine: 'Gép', signature: 'Ügyfél aláírása', satisfaction: 'Ügyfél elégedettsége',
	},
	tear: { from: 'A papírkáosztól', to: 'egyetlen digitális folyamatig' },
	results: {
		outcomes: [
			{ tag: '+25%', title: 'Munkakapacitás' },
			{ tag: '30%', title: 'Kevesebb adminisztráció' },
			{ tag: '0', title: 'Nulla elveszett ügyfél' },
		],
	},
	problems: {
		eyebrow: 'A kihívás',
		title: 'Kaotikus adminisztráció, láthatatlan folyamatok',
		sub: 'A szervizcégek időt és pénzt veszítenek a digitalizáció és a kontroll hiánya miatt.',
		cards: [
			{ title: 'Papírmunkára fecsérelt idő', desc: 'A technikusok kézi űrlapokat töltenek ki a számlázható munka helyett.' },
			{ title: 'Elveszett igények és ügyfelek', desc: 'Központi rendszer nélkül a megrendelések elvesznek és a határidők csúsznak.' },
			{ title: 'Nincs kontroll a terepen', desc: 'A vezetőség nem látja, ki dolgozik, hol akad el a folyamat vagy mekkora a leterheltség.' },
			{ title: 'Viták az ügyfelekkel', desc: 'A munka idejére és minőségére vonatkozó egyértelmű bizonyíték hiánya konfliktusokat szül.' },
		],
	},
	solution: {
		eyebrow: 'A megoldás',
		title: 'Kontroll és átláthatóság',
		sub: 'Kétszerepes platform, amely összeköti az irodát és a terepet — a munka kiosztásától az ügyfél aláírásáig.',
		office: { who: 'Iroda', what: 'Admin felület' },
		field: { who: 'Terep', what: 'Mobilalkalmazás' },
		nodes: ['KIOSZTÁS', 'VÉGREHAJTÁS', 'ALÁÍRÁS', 'JELENTÉS'],
		benefits: [
			'Kevesebb adminisztráció a technikusnak',
			'100%-os követés az ügyfelek és a munkaórák felett',
			'Maximális csapatkapacitás és azonnali számlázás',
		],
		flow: [
			{ label: 'Kiosztás', alt: 'Új munka létrehozása 4 lépésben' },
			{ label: 'Végrehajtás', alt: 'Aktív munkamenet, valós időben mérve' },
			{ label: 'Aláírás', alt: 'Az ügyfél digitális aláírása a telefon képernyőjén' },
			{ label: 'Jelentés', alt: 'Automatikusan generált PDF jelentés' },
		],
	},
	timeline: {
		eyebrow: 'Funkció',
		title: 'A minőség megcáfolhatatlan garanciája',
		steps: [
			{ phase: 'START', title: 'Kötelező fotóellenőrzés', desc: 'A technikus fotókkal dokumentálja a kezdeti állapotot és az óraállást a munka indításakor.' },
			{ phase: 'STOP', title: 'Fotós bizonyíték a befejezéskor', desc: 'A leállításkor készült fotók igazolják az elvégzett munkát, drasztikusan csökkentve az ügyféllel való vitákat.' },
			{ phase: 'JELENTÉS', title: 'Azonnali PDF', desc: 'Az időbélyegek és a mentett fotók alapján az alkalmazás másodpercek alatt hivatalos PDF jelentést készít.' },
		],
		callout: 'Eredmény: egyértelmű, átlátható és megcáfolhatatlan bizonyíték a munka minőségéről — azonnal elérhető az ügyfél és a vezetőség számára.',
	},
	security: {
		eyebrow: 'Biztonság',
		title: 'Az adataid biztonságban',
		rows: [
			{ label: 'Hozzáférés', title: 'Csak a te embereid férnek hozzá', desc: 'Minden alkalmazott a saját fiókjával lép be — a csapatodon kívül senki nem láthatja a céged vagy az ügyfeleid adatait.' },
			{ label: 'Szerepkörök', title: 'Mindenki csak azt látja, amire szüksége van', desc: 'Az adminoknak teljes hozzáférésük van; a technikusok csak a saját munkáikat látják, semmi felesleges adat nem zavarja őket.' },
			{ label: 'Titkosítás', title: 'Az adataid mindig titkosítva vannak', desc: 'Akár a terepi alkalmazásból, akár az admin felületről nézed, az adatok titkosítva utaznak és tárolódnak, védve az illetéktelen hozzáféréstől.' },
		],
		callout: 'Az adatbiztonság nálunk nem csak egy marketingszlogen — egyszerűen: kontrollált hozzáférés, védett fiókok, semmi nem vész el véletlenül.',
	},
	cta: {
		eyebrow: 'A következő lépés',
		title: 'Növeld csapatod hatékonyságát már ma!',
		lede: 'Szüntesd meg a helyszíni munkák kezelésének káoszát, és emeld új szintre az ügyfélélményt a Cordiss-szal. Igényelj személyre szabott demót!',
	},
	form: {
		headEyebrow: 'Demó igénylése',
		headText: 'Töltsd ki az űrlapot — hamarosan felvesszük veled a kapcsolatot.',
		name: 'Név *', company: 'Cég *', email: 'Email *', phone: 'Telefon (opcionális)',
		message: 'Néhány részlet a csapatodról (opcionális)',
		submit: 'Igénylés elküldése', submitting: 'Küldés…',
		success: '✓ Köszönjük! Megkaptuk az igényed, hamarosan jelentkezünk.',
		error: 'Hiba történt. Próbáld újra, vagy írj nekünk: david.daczo@cordiss.com.',
		required: 'Kérjük, add meg a nevet, a céget és az emailt.',
	},
	contact: { email: 'Email', phone: 'Telefon' },
	footer: {
		tag: '„Cordiss — a platform, amely a terepi káoszt mérhető hatékonysággá alakítja.”',
		fine: '© 2026 Cordiss',
	},
};

export const translations: Record<Locale, Dict> = { ro, en, hu };
