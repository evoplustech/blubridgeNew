// Personal / free mailbox providers that may not be used as a work email on the consulting enquiry forms.
// Configurable: add a domain here to block it on both the field and the server (mirror of
// backend/enquiry_contact_validation.py PERSONAL_EMAIL_DOMAINS).
export const PERSONAL_EMAIL_DOMAINS = new Set([
  // Google
  'gmail.com', 'googlemail.com', 'google.com',
  // Microsoft personal
  'outlook.com', 'outlook.in', 'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.es', 'outlook.it',
  'outlook.com.au', 'outlook.co.id', 'outlook.sa', 'outlook.jp', 'outlook.kr', 'outlook.dk', 'outlook.cl',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.co.jp', 'hotmail.fr', 'hotmail.de', 'hotmail.it', 'hotmail.es',
  'hotmail.be', 'hotmail.nl', 'hotmail.ca', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.ar',
  'live.com', 'live.co.uk', 'live.in', 'live.ca', 'live.com.au', 'live.fr', 'live.de', 'live.it', 'live.nl',
  'live.se', 'live.dk', 'live.no', 'live.jp', 'live.cn', 'msn.com', 'passport.com', 'windowslive.com',
  // Yahoo
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.in', 'yahoo.co.jp', 'yahoo.co.id', 'yahoo.co.nz',
  'yahoo.com.au', 'yahoo.com.br', 'yahoo.com.mx', 'yahoo.com.ar', 'yahoo.com.sg', 'yahoo.com.hk',
  'yahoo.com.ph', 'yahoo.com.tw', 'yahoo.com.vn', 'yahoo.com.tr', 'yahoo.de', 'yahoo.fr', 'yahoo.it',
  'yahoo.es', 'yahoo.se', 'yahoo.dk', 'yahoo.no', 'yahoo.fi', 'yahoo.nl', 'yahoo.be', 'yahoo.pl',
  'yahoo.gr', 'yahoo.ie', 'yahoo.ca', 'ymail.com', 'rocketmail.com', 'yahoogroups.com',
  // Apple
  'icloud.com', 'me.com', 'mac.com',
  // AOL / Verizon
  'aol.com', 'aol.co.uk', 'aol.de', 'aol.fr', 'aim.com', 'verizon.net', 'netscape.net',
  // Proton
  'protonmail.com', 'protonmail.ch', 'proton.me', 'pm.me',
  // GMX / Mail.com family
  'gmx.com', 'gmx.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'gmx.co.uk', 'gmx.fr', 'gmx.es',
  'mail.com', 'email.com', 'usa.com', 'consultant.com', 'europe.com', 'post.com', 'writeme.com',
  // Yandex / Mail.ru / other CIS
  'yandex.com', 'yandex.ru', 'yandex.by', 'yandex.kz', 'ya.ru', 'mail.ru', 'inbox.ru', 'bk.ru',
  'list.ru', 'internet.ru', 'rambler.ru',
  // Zoho personal
  'zoho.com', 'zohomail.com', 'zoho.in', 'zoho.eu',
  // India / regional ISPs and free providers
  'rediffmail.com', 'rediff.com', 'indiatimes.com', 'in.com', 'sify.com', 'vsnl.net', 'vsnl.com',
  'bsnl.in', 'airtelmail.in', 'yopmail.com',
  // Asia-Pacific free providers
  'qq.com', 'foxmail.com', '163.com', '126.com', 'sina.com', 'sina.cn', 'sohu.com', 'aliyun.com',
  '21cn.com', 'naver.com', 'hanmail.net', 'daum.net', 'nate.com', 'docomo.ne.jp', 'ezweb.ne.jp',
  'softbank.ne.jp', 'nifty.com', 'excite.co.jp',
  // Europe / Americas free providers and ISP mailboxes
  'web.de', 't-online.de', 'freenet.de', 'arcor.de', 'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr',
  'laposte.net', 'libero.it', 'virgilio.it', 'alice.it', 'tiscali.it', 'tin.it', 'terra.com',
  'terra.com.br', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'globo.com', 'telefonica.net',
  'seznam.cz', 'centrum.cz', 'wp.pl', 'o2.pl', 'onet.pl', 'interia.pl', 'abv.bg', 'mynet.com',
  'comcast.net', 'sbcglobal.net', 'att.net', 'bellsouth.net', 'cox.net', 'charter.net', 'earthlink.net',
  'juno.com', 'optonline.net', 'roadrunner.com', 'rogers.com', 'shaw.ca', 'sympatico.ca', 'telus.net',
  'btinternet.com', 'sky.com', 'virginmedia.com', 'talktalk.net', 'ntlworld.com', 'blueyonder.co.uk',
  'bigpond.com', 'bigpond.net.au', 'optusnet.com.au', 'iinet.net.au', 'xtra.co.nz',
  // Disposable / throwaway
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org',
  'trashmail.com', 'throwawaymail.com', 'getnada.com', 'sharklasers.com', 'dispostable.com',
  'fakeinbox.com', 'maildrop.cc', 'mailnesia.com', 'tutanota.com', 'tutanota.de', 'tuta.io',
]);

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PERSONAL_EMAIL_MESSAGE = 'Please enter your company email address. Personal email providers such as Gmail, Yahoo, and Outlook are not allowed.';

// True when the domain, or any parent of it, is a known personal provider (blocks mail.gmail.com too).
export const isPersonalEmailDomain = domain => {
  const labels = domain.toLowerCase().split('.');
  return labels.some((_, index) => PERSONAL_EMAIL_DOMAINS.has(labels.slice(index).join('.')));
};

// Returns an error message, or '' when the value is a usable company email address.
export const validateWorkEmail = value => {
  const email = (value || '').trim();
  if (!email) return 'Please enter your work email.';
  if (!EMAIL_FORMAT.test(email)) return 'Please enter a valid email address.';
  if (isPersonalEmailDomain(email.slice(email.lastIndexOf('@') + 1))) return PERSONAL_EMAIL_MESSAGE;
  return '';
};
