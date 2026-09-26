const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-message').textContent = 'Thank you. Please add the firm email address to activate online enquiries.';
});

const teamDetails = document.querySelector('#team-details');
const teamToggles = document.querySelectorAll('.team-toggle');
const teamPanels = document.querySelectorAll('[data-profile-panel]');
teamToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const key = toggle.dataset.profile;
    const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
    teamToggles.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
      const label = button.querySelector('.team-toggle-label');
      if (label) label.textContent = 'View profile';
    });
    teamPanels.forEach(panel => { panel.hidden = true; });
    if (wasExpanded) {
      if (teamDetails) teamDetails.hidden = true;
      return;
    }
    const panel = document.querySelector(`[data-profile-panel="${key}"]`);
    if (!panel || !teamDetails) return;
    toggle.setAttribute('aria-expanded', 'true');
    const label = toggle.querySelector('.team-toggle-label');
    if (label) label.textContent = 'Hide profile';
    panel.hidden = false;
    teamDetails.hidden = false;
    teamDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

/* Build the leadership profile controls from the equal team cards. */
const leadershipSection = document.querySelector('#team');
const leadershipGrid = leadershipSection?.querySelector('.team-grid');
if (leadershipSection && leadershipGrid && !leadershipSection.querySelector('.team-details')) {
  const profiles = {
    faisal: {
      name: 'Faisal Naseem',
      title: 'Head of Litigation',
      intro: 'Faisal Naseem is an advocate in independent practice in New Delhi with twenty years at the Bar. He advises and appears in civil, commercial, arbitration and criminal matters before the Supreme Court of India, the High Court of Delhi, District and Commercial Courts and specialist tribunals.',
      body: 'His work focuses on high-stakes disputes involving property and title, construction and development contracts, succession, recovery, insolvency, land acquisition and urban local bodies. He also drafts commercial agreements and real-estate documents with an eye trained by the disputes those documents later generate.',
      meta: '<p><strong>Practice areas</strong> Commercial and contractual disputes; arbitration; real estate and property; succession, wills and family matters; insolvency and recovery; regulatory and urban-body disputes; criminal practice; advisory and documentation.</p><p><strong>Forums and credentials</strong> Supreme Court of India, High Court of Delhi, NCLT, DRT, arbitral tribunals, consumer, revenue and Waqf forums. LL.M. and PG Diploma in International Trade Law, Indian Law Institute; LL.B., Campus Law Centre, University of Delhi; B.Com., Zakir Husain College. Bar Council of Delhi enrolment D/1281/2006.</p>'
    },
    sandeep: {
      name: 'Sandeep Kaushik',
      title: 'Head of Taxation',
      intro: 'Sandeep Kaushik is an advocate with a decade of litigation experience across civil, commercial, arbitration and criminal matters. He leads taxation work with a practical focus on clear filings, defensible positions and responsive advice.',
      body: 'His practice supports individuals and businesses through direct and indirect tax matters, compliance reviews, assessments, notices and related litigation, while connecting tax advice with accounting, finance and corporate requirements.',
      meta: '<p><strong>Practice areas</strong> Income-tax returns and assessments; GST, VAT and service-tax matters; TDS, PF and ESI compliance; accounting, audit and financial reporting; incorporation and corporate advisory; MSME and project-finance support.</p><p><strong>Approach</strong> Tax planning and compliance designed around the client’s operating reality, with coordinated documentation and timely follow-through.</p>'
    },
    rakesh: {
      name: 'Rakesh Kumar Yadav',
      title: 'Head of Management Consultancy',
      intro: 'Rakesh Kumar Yadav advises founders, enterprises and organisations on business setup, operating systems and practical compliance. His work connects commercial planning with the legal, tax and financial processes needed to run with confidence.',
      body: 'He also supports dispute resolution and public-interest work, bringing an implementation-minded perspective to matters that span operations, documentation and regulatory requirements.',
      meta: '<p><strong>Practice areas</strong> Company, LLP, OPC and partnership registration; Startup India and MSME; business plans and bank-loan project reports; SOPs; contracts and shareholder agreements; labour, ROC and IPR compliance; GST, income tax, TDS, accounting and bookkeeping.</p><p><strong>Dispute support</strong> Money recovery and commercial disputes, partnership disputes, cheque-bounce matters and civil and commercial litigation in Delhi courts. Education includes LL.B., M.S.W. and B.Com.</p>'
    }
  };

  const details = document.createElement('div');
  details.className = 'team-details';
  details.id = 'team-details';
  details.hidden = true;
  details.innerHTML = Object.entries(profiles).map(([key, profile]) => `<article class="team-profile" id="team-profile-${key}" data-profile-panel="${key}" hidden><div><p class="eyebrow">${profile.name.toUpperCase()}</p><h3>${profile.title}</h3><p>${profile.intro}</p><p>${profile.body}</p></div><div class="profile-meta">${profile.meta}</div></article>`).join('');
  leadershipGrid.after(details);

  leadershipGrid.querySelectorAll('article').forEach((card, index) => {
    const key = Object.keys(profiles)[index];
    const content = card.querySelector('div');
    if (!content || !key) return;
    const button = document.createElement('button');
    button.className = 'team-toggle';
    button.type = 'button';
    button.dataset.profile = key;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `team-profile-${key}`);
    button.innerHTML = '<span class="team-toggle-label">View profile</span><span aria-hidden="true">+</span>';
    content.append(button);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      leadershipGrid.querySelectorAll('.team-toggle').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.querySelector('.team-toggle-label').textContent = 'View profile';
      });
      details.querySelectorAll('[data-profile-panel]').forEach(panel => { panel.hidden = true; });
      if (open) { details.hidden = true; return; }
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('.team-toggle-label').textContent = 'Hide profile';
      details.querySelector(`[data-profile-panel="${key}"]`).hidden = false;
      details.hidden = false;
      details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

/* Ensure the controls are mounted even when this file is loaded in the document head. */
function mountLeadershipProfiles() {
  const section = document.querySelector('#team');
  const grid = section?.querySelector('.team-grid');
  if (!section || !grid || section.querySelector('.team-toggle')) return;
  const records = [
    ['faisal', 'Faisal Naseem', 'Head of Litigation', 'Civil, commercial and arbitration counsel with twenty years at the Bar. His work covers property, construction, succession, recovery, insolvency and disputes with urban authorities before the Supreme Court, Delhi High Court, district courts and specialist tribunals.'],
    ['sandeep', 'Sandeep Kaushik', 'Head of Taxation', 'Advocate focused on income tax, GST, assessments, notices, TDS, PF and ESI compliance, accounting and financial reporting, with related corporate and litigation support.'],
    ['rakesh', 'Rakesh Kumar Yadav', 'Head of Management Consultancy', 'Advises founders and enterprises on incorporation, business plans, SOPs, contracts, labour and ROC compliance, IPR, GST, accounting and practical operating systems, with civil and commercial dispute support.']
  ];
  const details = document.createElement('div');
  details.className = 'team-details';
  details.id = 'team-details';
  details.hidden = true;
  details.innerHTML = records.map(([key, name, title, copy]) => `<article class="team-profile" data-profile-panel="${key}" hidden><div><p class="eyebrow">${name.toUpperCase()}</p><h3>${title}</h3><p>${copy}</p></div><div class="profile-meta"><p><strong>Profile</strong> Click another leadership card to explore that specialist area.</p></div></article>`).join('');
  grid.after(details);
  records.forEach(([key], index) => {
    const card = grid.querySelectorAll('article')[index];
    const content = card?.querySelector('div');
    if (!content) return;
    const button = document.createElement('button');
    button.className = 'team-toggle';
    button.type = 'button';
    button.dataset.profile = key;
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span class="team-toggle-label">View profile</span><span aria-hidden="true">+</span>';
    content.append(button);
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      grid.querySelectorAll('.team-toggle').forEach(item => { item.setAttribute('aria-expanded', 'false'); item.querySelector('.team-toggle-label').textContent = 'View profile'; });
      details.querySelectorAll('[data-profile-panel]').forEach(panel => { panel.hidden = true; });
      details.hidden = expanded;
      if (!expanded) { button.setAttribute('aria-expanded', 'true'); button.querySelector('.team-toggle-label').textContent = 'Hide profile'; details.querySelector(`[data-profile-panel="${key}"]`).hidden = false; }
    });
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountLeadershipProfiles);
else mountLeadershipProfiles();
