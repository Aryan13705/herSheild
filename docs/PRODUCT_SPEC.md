# HerShield: Master Product Specification

This document is the definitive master specification for HerShield. It defines *what* the product must do. Every feature, database schema, API endpoint, and UI component must trace back to the requirements established in this document.

---

## 1. Product Vision
To build the world's most trusted AI-powered travel companion exclusively for women, integrating seamless trip planning, real-time safety nets, and a verified global community into one intelligent ecosystem. HerShield is not just a utility; it is the ultimate guardian for the female traveler.

## 2. Target Audience
- **Primary:** Female solo travelers (Ages 18-45) seeking independence but prioritizing personal safety.
- **Secondary:** Female groups planning trips, expats, and digital nomads.
- **Tertiary (Passive):** "Guardians" (trusted friends or family) who monitor the traveler's safety status.

## 3. Product Pillars
1. **Safety as a Guarantee:** Identity verification is non-negotiable. Bad actors cannot access the community.
2. **AI as an Expert:** Travel planning should feel like chatting with a world-class local guide who deeply understands female safety.
3. **Frictionless Emergency Response:** In moments of panic, help must be accessible via muscle memory, overriding complex UI.
4. **Community Trust:** Content is highly curated and tied strictly to verified female identities.

---

## 4. Modules & 5. Features

### Module 1: Identity & Access Management (IAM)
- **F-1.1 Strict Authentication:** Passwordless magic links and OAuth.
- **F-1.2 Government ID Verification:** Mandatory KYC flow (ID + Liveness) to access social and trip-sharing features.
- **F-1.3 Role-Based Access:** Automatic demotion/promotion based on verification status.

### Module 2: AI Travel Engine
- **F-2.1 Conversational Planner:** NLP chat interface to generate itineraries based on constraints (budget, safety, dates).
- **F-2.2 Safe-Zone Routing:** Mapbox integration that highlights well-lit, highly populated, or historically safe routes.
- **F-2.3 Hotel Safety Scoring:** Aggregation of female-centric reviews to score accommodations out of 10.

### Module 3: Active Safety & SOS
- **F-3.1 SOS Emergency Slider:** 1-swipe activation that dims the screen, logs GPS, and sends silent alerts.
- **F-3.2 Guardian Mode:** A timed check-in system. If the timer expires without a user check-in, an alert is escalated.
- **F-3.3 Live Telemetry:** Background GPS pinging shared only with active Guardians.

### Module 4: Verified Community
- **F-4.1 Global Feed:** A curated feed of travel tips, alerts, and photo memories from verified users.
- **F-4.2 Hyper-Local Reviews:** Ability to drop pins and leave safety-focused reviews (e.g., "Street lights broken here").

---

## 6. User Flows & 7. Screen IDs

| Flow | Associated Screen IDs | Description |
| :--- | :--- | :--- |
| **Verification Gate** | `W-AUTH-04`, `W-AUTH-05` | User attempts to access the feed but is routed to the ID verification pipeline. |
| **AI Trip Generation** | `W-DASH-01` → `W-TRIP-02` → `W-TRIP-03` | User opens the AI chat, inputs criteria, and the system generates a persistent itinerary. |
| **Guardian Activation** | `W-SAFE-01` → `W-SAFE-02` → `W-SAFE-03` | User selects a contact, sets a 2-hour timer for a taxi ride, and begins live tracking. |
| **Emergency SOS** | `W-SAFE-04` (Overlay anywhere) | User slides the SOS trigger. The system enters Emergency Mode. |

---

## 8. Business Rules
1. **The "No Verification, No Community" Rule:** Unverified users ("Guests") can use the AI Trip Planner and view global safety stats, but they **cannot** post, read community reviews, or use Guardian Mode.
2. **SOS Irrevocability:** Once SOS is triggered, it cannot be canceled without a pre-configured 4-digit PIN to prevent an attacker from dismissing it.
3. **Data Retention (Location):** Background location pings (telemetry) must be hard-deleted 24 hours after a trip or Guardian session ends unless linked to an active SOS incident.
4. **AI Liability Guardrails:** The AI must explicitly state it is providing *recommendations*, not guarantees. It must refuse to route users through known high-risk conflict zones.

---

## 9. Roles & 10. Permissions

| Role | Permissions | Limitations |
| :--- | :--- | :--- |
| **Guest** | Create account, generate private AI trips. | Cannot post, view feed, or use live tracking. |
| **Verified Traveler** | Full access to app, create posts, active SOS tracking. | Cannot moderate others. |
| **Guardian (External)** | Receive SMS links to view live web maps during sessions. | No app access required. |
| **Moderator** | Ban users, remove posts, review verification queues. | Cannot access raw server logs. |
| **Super Admin** | Full system access, API key rotation, incident response. | None. |

---

## 11. Feature Matrix (MVP Scope)

| Feature | Phase | Priority | Owner |
| :--- | :--- | :--- | :--- |
| **Next.js/Hono Architecture**| Phase 1 | P0 | Engineering |
| **Database & Auth Setup** | Phase 2 | P0 | Engineering |
| **Gov ID Verification Flow** | Phase 3 | P1 | Product/Eng |
| **AI Mapbox Trip Planner** | Phase 4 | P1 | Product/AI |
| **SOS Slider & Basic Alerts** | Phase 5 | P1 | Product/Eng |
| **Verified Community Feed** | Phase 6 | P2 | Product |
| **Guardian Mode (LiveKit)** | Phase 7 | P3 | Engineering |

---

## 12. Success Metrics (KPIs)
- **Trust Metric:** % of users who successfully complete Government ID Verification (>60% target).
- **Utility Metric:** Average AI Trips generated per user per month.
- **Safety Metric:** False Positive SOS Rate (Must be <2% to prevent alarm fatigue).
- **Engagement Metric:** DAU/MAU ratio of the Verified Community Feed.

---

## 13. Roadmap Overview
- **Phase 1:** Infrastructure & Product Specs (Complete)
- **Phase 2:** Core Database (Drizzle), Authentication (Better Auth)
- **Phase 3:** Identity Verification integration
- **Phase 4:** AI Agents & Mapbox Implementation
- **Phase 5:** Safety Hub & SOS Logic
- **Phase 6:** Community Feed & Polish
- **Phase 7:** Launch & Monitor
- **Phase 8+ (Future):** Hardware panic buttons, Wearable app integrations, Enterprise traveler tiers.
