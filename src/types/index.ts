// ── Auth / Customer ───────────────────────────────────────────────────────

export interface Customer {
  id:                  number;
  customer_code:       string;
  first_name:          string;
  last_name:           string;
  full_name:           string;
  email:               string;
  phone_number:        string;
  gender:              string | null;
  date_of_birth:       string | null;
  address:             string | null;
  city:                string | null;
  customer_type:       string | null;
  status:              string;
  dietary_preferences: string | null;
  allergies:           string | null;
  loyalty_points:      number;
  total_orders:        number;
  total_spent:         number;
  registration_source: string | null;
}

export interface AuthResponse {
  customer:   Customer;
  token:      string;
  token_type: string;
}

export interface RegisterData {
  first_name:    string;
  last_name:     string;
  email:         string;
  phone_number:  string;
  password:      string;
  password_confirmation: string;
}

export interface LoginData {
  email:    string;
  password: string;
}

// ── Homepage CMS ──────────────────────────────────────────────────────────

export interface HomepageContent {
  // Hero
  hero_image_url:           string | null;
  hero_headline:            string;
  hero_subheadline:         string | null;
  hero_description:         string | null;
  hero_primary_cta_label:   string;
  hero_primary_cta_href:    string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_href:  string;
  // Services section
  services_eyebrow:         string;
  services_heading:         string;
  // About section
  about_eyebrow:            string;
  about_heading_line1:      string;
  about_heading_line2:      string;
  about_description:        string | null;
  about_image_url:          string | null;
  about_stat_number:        string;
  about_stat_label:         string;
  about_cta_label:          string;
  about_values:             string[];
  // Testimonials section
  testimonials_eyebrow:     string;
  testimonials_heading:     string;
  // Footer
  footer_tagline:           string | null;
}

export interface ServiceCard {
  id:          number;
  title:       string;
  description: string | null;
  image_url:   string | null;
  sort_order:  number;
}

export interface SocialLink {
  id:       number;
  platform: string;
  label:    string;
  url:      string;
  icon:     string | null;
}

// ── Business ───────────────────────────────────────────────────────────────

export interface BusinessInfo {
  name:        string | null;
  tagline:     string | null;
  description: string | null;
  address:     string | null;
  phone:       string | null;
  email:       string | null;
  website:     string | null;
  currency:    string;
  logo_url:    string | null;
}

export interface OpeningHours {
  opening_time:  string | null;
  closing_time:  string | null;
  opening_hours: string | null;
}

// ── Menu ──────────────────────────────────────────────────────────────────

export interface MenuCategory {
  id:          number;
  name:        string;
  description: string | null;
  icon:        string | null;
  sort_order:  number;
  items_count?: number;
  items?:      MenuItem[];
}

export interface MenuItem {
  id:                        number;
  item_code:                 string;
  name:                      string;
  description:               string | null;
  image_url:                 string | null;
  selling_price:             number;
  preparation_time_minutes:  number | null;
  status:                    string;
  is_available:              boolean;
  category?:                 MenuCategory;
  category_id:               number;
}

// ── Testimonial ───────────────────────────────────────────────────────────

export interface Testimonial {
  id:            number;
  author_name:   string;
  author_title?: string | null;
  content:       string;
  rating:        number;
  avatar_url?:   string | null;
}

// ── Contact / Enquiry ─────────────────────────────────────────────────────

export interface ContactFormData {
  name:     string;
  email:    string;
  phone?:   string;
  subject?: string;
  message:  string;
}

// ── Catering ─────────────────────────────────────────────────────────────

export interface CateringEventType {
  value: string;
  label: string;
}

export interface CateringInquiryFormData {
  first_name:     string;
  last_name:      string;
  email:          string;
  phone_number:   string;
  event_name:     string;
  event_type:     string;
  event_date:     string;
  event_time?:    string;
  location?:      string;
  guest_count:    number;
  contact_person: string;
  contact_phone:  string;
  notes?:         string;
}

// CMS content for the entire catering page
export interface CateringPageContent {
  // Hero
  hero_image_url:           string | null;
  hero_eyebrow:             string;
  hero_headline:            string;
  hero_description:         string | null;
  hero_primary_cta_label:   string;
  hero_secondary_cta_label: string;
  // Intro
  intro_eyebrow:            string;
  intro_body:               string | null;
  intro_essentials_heading: string;
  intro_cta_label:          string;
  intro_essentials:         Array<{ icon?: string; text: string }>;
  // Menu showcase
  menu_eyebrow:             string;
  menu_heading:             string;
  menu_subtext:             string | null;
  menu_image_url:           string | null;
  menu_courses:             Array<{ label: string; description: string }>;
  // Inclusions
  inclusions_eyebrow:       string;
  inclusions_heading:       string;
  inclusions_columns:       Array<{ column: string; items: string[] }>;
  // Pricing
  pricing_eyebrow:          string;
  pricing_heading:          string;
  pricing_subtext:          string | null;
  pricing_label:            string;
  pricing_amount:           string;
  pricing_unit:             string;
  pricing_note:             string | null;
  pricing_cta_label:        string;
  pricing_specs:            Array<{ label: string; value: string }>;
  // CTA
  cta_eyebrow:              string;
  cta_heading:              string;
  cta_description:          string | null;
  cta_primary_label:        string;
  cta_secondary_label:      string;
  // Form
  form_eyebrow:             string;
  form_heading:             string;
  form_subtext:             string | null;
  // Meta
  meta_title:               string;
  meta_description:         string | null;
}

// Individual catering service (one per event type — weddings, corporate, etc.)
export interface CateringService {
  id:                number;
  slug:              string;
  event_type:        string | null;
  sort_order:        number;
  // Hub card
  card_image_url:    string | null;
  title:             string;
  tagline:           string | null;
  // Sub-page
  hero_image_url:    string | null;
  eyebrow:           string | null;
  description:       string | null;
  features:          Array<{ icon?: string; title: string; description: string }>;
  inclusions:        Array<{ heading: string; items: string[] }>;
  menu_courses:      Array<{ label: string; description: string }>;
  menu_image_url:    string | null;
  // Pricing
  pricing_from:      string | null;
  pricing_unit:      string;
  pricing_note:      string | null;
  pricing_specs:     Array<{ label: string; value: string }>;
  // CTAs
  quote_cta_label:   string;
  inquire_cta_label: string;
  // SEO
  meta_title:        string;
  meta_description:  string | null;
}

// ── API wrapper ───────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}

export interface PaginatedData<T> {
  data:          T[];
  current_page:  number;
  last_page:     number;
  per_page:      number;
  total:         number;
  from:          number | null;
  to:            number | null;
}

// ── Orders & Payments ─────────────────────────────────────────────────────

export interface OrderItem {
  id:                    number;
  menu_item_id:          number;
  name:                  string;
  image_url:             string | null;
  quantity:              number;
  unit_price:            number;
  subtotal:              number;
  special_instructions:  string | null;
}

export interface Payment {
  id:               number;
  payment_number:   string;
  order_number:     string | null;
  payment_method:   string;
  method_label:     string;
  amount:           number;
  reference_number: string | null;
  payment_date:     string;
  notes:            string | null;
}

export interface Order {
  id:              number;
  order_number:    string;
  order_type:      string;
  order_type_label:string;
  order_status:    string;
  status_label:    string;
  payment_status:  string;
  subtotal:        number;
  discount_amount: number;
  tax_amount:      number;
  total_amount:    number;
  amount_paid:     number;
  balance_due:     number;
  notes:           string | null;
  created_at:      string;
  items:           OrderItem[];
  payments:        Payment[];
  kitchen_status:  string | null;
}

export interface PlaceOrderData {
  order_type: string;
  notes?:     string;
  items: Array<{
    menu_item_id:         number;
    quantity:             number;
    special_instructions?: string;
  }>;
}

export interface PaymentData {
  order_number:     string;
  payment_method:   string;
  amount:           number;
  reference_number?: string;
  notes?:           string;
}

// Summary of a submitted catering inquiry/event (from GET /catering/my-events)
export interface CateringEventSummary {
  id:                number;
  event_number:      string;
  event_name:        string;
  event_type:        string | null;
  event_type_label:  string | null;
  event_date:        string;
  event_time:        string | null;
  location:          string | null;
  guest_count:       number;
  contact_person:    string | null;
  contact_phone:     string | null;
  quoted_amount:     number;
  final_amount:      number;
  status:            string;
  status_label:      string;
  notes:             string | null;
  created_at:        string;
}
