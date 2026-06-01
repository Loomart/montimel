# Project Guidelines & Rules

## 1. Core Principles
- **Security First**: Never expose API keys on the client side.
- **Accessibility**: Follow WCAG 2.1 standards (aria-labels, semantic HTML).
- **User Experience**: Implement skeletons and loading states for all async operations.

## 2. Security Checklist
- [ ] RLS policies configured for every table.
- [ ] Input validation implemented on all Server Actions.
- [ ] Sensitive data filtered out of API responses.
- [ ] CSRF and XSS protection active via Next.js defaults.

## 3. UI/UX Consistency
- **Colors**: Follow the defined palette (Warm tones, Nature-inspired).
- **Spacing**: Use the Tailwind spacing scale (rem/px) consistently.
- **Typography**: Consistent heading hierarchy (H1 -> H6).