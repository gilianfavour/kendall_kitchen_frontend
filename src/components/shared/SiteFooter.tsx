import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import type { BusinessInfo, HomepageContent, SocialLink } from '@/src/types';

interface SiteFooterProps {
  business:    BusinessInfo    | null;
  homepage:    HomepageContent | null;
  socialLinks: SocialLink[];
}

export default function SiteFooter({ business, homepage, socialLinks }: SiteFooterProps) {
  const name    = business?.name    ?? 'Kendall Kitchen';
  const email   = business?.email   ?? null;
  const phone   = business?.phone   ?? null;
  const address = business?.address ?? null;
  const website = business?.website ?? null;
  const tagline = homepage?.footer_tagline
    ?? 'Fresh, authentic meals crafted with care and served with warmth — for every occasion.';
  const year    = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-[#1a0a08] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#d4b96a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
            >
              {name}
            </Link>
            <p className="text-white/50 text-xs leading-relaxed mt-3 max-w-xs">{tagline}</p>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors"
              >
                {website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5 mt-5" aria-label="Social media links">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="h-8 w-8 rounded flex items-center justify-center border border-white/10 text-white/50 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Company links */}
          <nav aria-label="Company links">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home',     href: '/'          },
                { label: 'About Us', href: '/#about'    },
                { label: 'Our Menu', href: '/#menu'     },
                { label: 'Catering', href: '/catering'  },
                { label: 'Reviews',  href: '/#testimonials' },
                { label: 'Contact',  href: '/#contact'  },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 text-xs hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services links">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'Dine-In',         href: '/#services'   },
                { label: 'Takeaway',         href: '/#services'   },
                { label: 'Catering Events',  href: '/catering'    },
                { label: 'Corporate Meals',  href: '/#services'   },
                { label: 'Custom Menus',     href: '/#contact'    },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 text-xs hover:text-[#c9a84c] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">Contact Us</h3>
            <ul className="space-y-3.5">
              {address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-3.5 w-3.5 text-[#c9a84c] mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-white/50 text-xs leading-relaxed">{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-[#c9a84c] shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-white/50 text-xs hover:text-[#c9a84c] transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-[#c9a84c] shrink-0" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="text-white/50 text-xs hover:text-[#c9a84c] transition-colors">
                    {email}
                  </a>
                </li>
              )}
              <li className="pt-2">
                <Link
                  href="/catering#inquire"
                  className="inline-block rounded bg-[#c9a84c]/20 border border-[#c9a84c]/30 px-3 py-1.5 text-xs text-[#c9a84c] hover:bg-[#c9a84c]/30 transition-colors"
                >
                  Book a Catering Event
                </Link>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} {name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/#contact" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/#contact" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
