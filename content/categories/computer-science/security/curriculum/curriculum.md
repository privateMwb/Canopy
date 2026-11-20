# Security — Curriculum

Three levels, twelve stages — cryptography, web security, and threat modeling, from hashing and encryption to threat-modeling whole systems.

## Level 1 — Junior

_Go from "I've heard the word encryption" to "I can tell encoding, hashing, and encryption apart, store passwords and sessions correctly, and find and fix the classic web bugs: injection, XSS, and CSRF."_

### 1.1 — Thinking Like a Defender

1. **Assets, Attackers & Trust Boundaries** — What you're protecting, who might attack it, and where data crosses from trusted to untrusted.
2. **Confidentiality, Integrity & Availability** — The three properties security is about, and which kinds of attack break which.
3. **Threat Modeling 101: Data-Flow Diagrams & STRIDE** — Draw the system, mark the trust boundaries, and ask what can go wrong at each one.
4. **Secure Design Principles** — Least privilege, defense in depth, fail-safe defaults, and shrinking the attack surface.
5. **Checkpoint** _(unscaffolded)_ — Threat-model a small web app with login and file upload: draw the data-flow diagram, list at least eight threats by STRIDE category, and pick the three to fix first.

### 1.2 — Hashing & Randomness

1. **Encoding, Hashing & Encryption: Three Different Things** — Base64 hides nothing, hashes can't be reversed, and ciphers need a key: choosing the right tool for the job.
2. **Hash Functions: What They Guarantee** — Determinism, preimage and collision resistance, the avalanche effect, and why MD5 and SHA-1 are no longer safe for security uses.
3. **Using Hashes: Integrity & Fingerprints** — Verifying downloads, content addressing in Git, and what a bare hash does not prove.
4. **Randomness & CSPRNGs** — Why Math.random() is not for secrets, where secure randomness comes from, and generating tokens and IDs safely.
5. **Checkpoint** _(unscaffolded)_ — Verify a download against a published SHA-256, then explain what the check proves and what it doesn't, and generate a password-reset token and justify its length and source.

### 1.3 — Passwords & Authentication

1. **Storing Passwords: Salts & Slow Hashes** — Why a fast hash is the wrong tool, and how salting plus bcrypt, scrypt, or Argon2 slows attackers down.
2. **Sessions & Login State on the Server** — Generating, storing, rotating, and ending session IDs, picking up where Networking's cookies lesson left off.
3. **Multi-Factor Authentication & TOTP** — Something you know, have, and are, and how time-based one-time codes work.
4. **Account Recovery & User Enumeration** — Password resets, 'forgot password' flows, and error messages that tell attackers which accounts exist.
5. **Credential Attacks: Brute Force, Stuffing & Spraying** — How attackers actually get into accounts, and the throttling, lockout, and breach-check defenses that work.
6. **Checkpoint** _(unscaffolded)_ — Build registration and login with a slow salted hash, server-side sessions, and throttling, then list every way it could still be attacked.

### 1.4 — Classic Web Vulnerabilities

1. **The Web Attack Surface: Never Trust Input** — Every place user-controlled data enters an application, and the one rule that governs all of it.
2. **Injection Beyond SQL** — Command injection, path traversal, and the shared pattern behind them, building on the SQL injection lesson in the SQL track.
3. **Cross-Site Scripting (XSS)** — Stored, reflected, and DOM-based XSS, and how injected script steals sessions and acts as the user.
4. **Cross-Site Request Forgery (CSRF)** — How a malicious page triggers actions with your cookies, and why SameSite and anti-CSRF tokens work where CORS does not.
5. **Validating Input & Encoding Output** — Allow-lists, context-aware output encoding, and why escaping at the right place beats filtering.
6. **Checkpoint** _(unscaffolded)_ — Given a deliberately vulnerable practice app running locally, find an XSS, a CSRF, and a command-injection bug, fix each, and write a test that fails before the fix and passes after.

## Level 2 — Intermediate

_Go from "I know the classic bugs" to "I can use real cryptography correctly through vetted libraries, manage keys, implement modern authentication, and defend a web app against the second tier of attacks."_

### 2.1 — Symmetric & Public-Key Cryptography

1. **Symmetric Encryption: Block Ciphers & Modes** — AES, why ECB leaks patterns, what CBC and CTR add, and how keys, IVs, and nonces differ.
2. **Authenticated Encryption: AES-GCM & ChaCha20-Poly1305** — The AEAD ciphers named in the TLS lesson, up close: why nonce reuse is catastrophic and why to reach for a vetted library's high-level API.
3. **MACs & HMAC** — Proving a message wasn't altered by anyone without the key, and the design behind the webhook signatures in the Networking track.
4. **Public-Key Cryptography & Key Exchange** — RSA, elliptic curves, and Diffie-Hellman: enough of the math to reason about them, and when to use each.
5. **Digital Signatures** — Signing and verifying with Ed25519 and ECDSA, what a signature proves that a MAC cannot, and how signing fails.
6. **Checkpoint** _(unscaffolded)_ — Using a vetted library, encrypt a file with AEAD, sign the result, then verify and decrypt it, and write down which property each step provides and what breaks if a nonce repeats.

### 2.2 — Keys, Trust & Protocols

1. **Key Derivation: KDFs, HKDF & Stretching** — Turning passwords and shared secrets into keys, and why one key should never serve two purposes.
2. **Key Management: Generation, Storage & Rotation** — Where keys live, envelope encryption with a KMS, and rotating without downtime, extending the encryption notes in the SQL track.
3. **Reading TLS 1.3 as Cryptography** — Map each primitive from Stage 2.1 onto the handshake you already know, and see what each one protects.
4. **Trusting Public Keys: TOFU, Pinning & Private CAs** — How systems decide whose key to believe when the public CA model doesn't fit: SSH host keys, pinning, and internal PKI.
5. **End-to-End Encryption & What It Doesn't Protect** — Who holds the keys, what metadata still leaks, and how messaging apps design around a server they don't trust.
6. **Checkpoint** _(unscaffolded)_ — Design the key hierarchy for an app that stores encrypted user documents: where each key lives, how it rotates, and exactly what a database leak versus a server compromise exposes.

### 2.3 — Modern Authentication & Authorization

1. **Sessions vs. Tokens: Storage, Rotation & Revocation** — Where to keep credentials in browsers and mobile apps, session fixation, refresh-token rotation, and logging out for real.
2. **OAuth 2.0 & OpenID Connect: Flows and Their Attacks** — The authorization code flow with PKCE in depth, ID tokens versus access tokens, and the redirect and token-leakage bugs that keep recurring.
3. **JWT Pitfalls: Algorithm & Key Confusion** — How trusting the alg header, confusing keys, and skipping claim checks break token validation, now that you know what signatures guarantee.
4. **Passkeys & WebAuthn** — Public-key login that resists phishing, how it differs from passwords and TOTP, and the recovery tradeoffs.
5. **Authorization Models: RBAC, ABAC & Policy Placement** — Roles, attributes, and relationships, and where in the code authorization checks should live, setting up BOLA in the OWASP API lesson.
6. **Checkpoint** _(unscaffolded)_ — Review a provided OAuth login and session implementation and list every missing or wrong check, ordered by severity.

### 2.4 — Web Application Security in Depth

1. **Content Security Policy & Defending Against XSS** — Policies, nonces, and Trusted Types as a second wall behind output encoding.
2. **Clickjacking, Frames & Security Headers** — frame-ancestors, X-Content-Type-Options, Referrer-Policy, and what each header actually stops, extending the HSTS lesson.
3. **SSRF & Trusting User-Supplied URLs** — Going past the OWASP list entry: redirects, DNS tricks, URL-parser disagreements, and cloud metadata endpoints.
4. **Deserialization, Templates & XML Pitfalls** — Unsafe deserialization, server-side template injection, and XXE: what happens when a parser does more than you intended.
5. **File Uploads & Untrusted Content** — Type and size checks, storage outside the web root, content sniffing, and serving user files from a separate origin.
6. **Checkpoint** _(unscaffolded)_ — Given an app with a URL-preview feature, a file upload, and a profile editor, find the bugs, fix them, and add a regression test for each.

## Level 3 — Senior

_Go from "I can secure a feature" to "I can threat-model a whole system, reason about how cryptography and defenses fail in practice, run detection and response, and explain risk to engineers and executives."_

### 3.1 — Threat Modeling & Risk

1. **Threat Modeling in Practice: Scoping, STRIDE per Element & Attack Trees** — Running a real session: what to scope, who to invite, and how to turn a diagram into a ranked list of threats.
2. **Attacker Models: Capabilities, Motives & Kill Chains** — Opportunistic criminals, insiders, and targeted adversaries need different defenses, and frameworks like MITRE ATT&CK help you reason about them.
3. **Risk Assessment: Likelihood, Impact & Prioritization** — Scoring with CVSS and its limits, using exploitability signals, and deciding what to fix, accept, transfer, or mitigate.
4. **Security Requirements & Abuse Cases** — Writing "the attacker must not be able to..." requirements and abuse stories, and finding design flaws before code exists.
5. **Checkpoint** _(unscaffolded)_ — Threat-model a payments-webhook service end to end: data-flow diagram, ranked threats, mitigations, and a list of the risks you are explicitly accepting.

### 3.2 — How Cryptography Fails

1. **Padding Oracles & Other Decryption Oracles** — How error messages and response differences let an attacker decrypt data without ever holding the key.
2. **Timing & Side Channels in Application Code** — Carrying the Architecture track's side-channel lessons up to software: secret-dependent branches, comparison timing, and enumeration by response time.
3. **Protocol Pitfalls: Replay, Reflection & Downgrade** — Nonces, sequence numbers, and context binding, and why composing sound primitives can still produce a broken protocol.
4. **Randomness Failures & Key Compromise** — Weak seeds, repeated nonces, and keys leaked in repos and logs, and how to recover when a key is gone.
5. **Post-Quantum Cryptography & Crypto Agility** — What quantum computers threaten and what they don't, the NIST standards, hybrid key exchange, and designing systems that can swap algorithms.
6. **Checkpoint** _(unscaffolded)_ — Given a code excerpt with a homegrown encrypt-and-sign scheme, find at least three flaws, explain the attack against each, and replace it with a vetted construction.

### 3.3 — Detection, Response & Data Protection

1. **Logging, Detection & Audit Trails** — What to log and what never to, tamper-evident logs, and turning events into alerts people act on, pairing with the alerting lesson in DevOps.
2. **Abuse, Fraud & Business-Logic Attacks** — Race conditions, coupon and quota abuse, and automated account takeover that no scanner flags, building on API6 in the OWASP lesson.
3. **Multi-Tenant Isolation & Authorization at Scale** — Policy engines, tenant boundaries, confused-deputy bugs, and enforcing who may touch what across many services, extending row-level security in the SQL track.
4. **Incident Response for Security Events** — Containment, evidence, credential and key rotation, and communicating a breach, the security layer on top of blameless postmortems.
5. **Data Protection & Privacy Engineering** — Data minimization, retention, tokenization, and designing so a breach exposes as little as possible.
6. **Checkpoint** _(unscaffolded)_ — Given logs from a suspected account takeover, reconstruct the attack path, decide what to contain first, and write the incident timeline.

### 3.4 — Security Engineering & Communication

1. **Secure-by-Default Design & Paved Roads** — Making the safe way the easy way: frameworks, libraries, and APIs that prevent whole classes of bugs.
2. **Security Code Review** — Tracing untrusted data from sources to sinks, and checking every authorization and cryptography decision on the way.
3. **Security Testing: Fuzzing, SAST, DAST & Pen Tests** — What each technique finds and misses, and how to scope and act on a penetration test.
4. **Vulnerability Management & Disclosure** — Patch SLAs, CVE triage, coordinated disclosure, and bug bounty programs, building on the supply-chain lessons in DevOps.
5. **Explaining Risk to Engineers & Executives** — Writing a finding people act on: impact in business terms, a concrete fix, and an honest account of uncertainty.
6. **Checkpoint** _(unscaffolded)_ — Review a design document, write up the top five risks with fixes, and add a one-page summary for non-technical leadership.
