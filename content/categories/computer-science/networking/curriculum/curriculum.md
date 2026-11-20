# Networking — Curriculum

Three levels, twelve stages — TCP/IP, HTTP, and APIs, from first principles to production diagnosis.

## Level 1 — Junior

_Go from "I use the internet" to "I can explain what happens between typing a URL and seeing a page, and write a small client and server that talk over TCP and HTTP."_

### 1.1 — How Networks Work

1. **Layers & the Network Stack** — The TCP/IP and OSI models, and what each layer is responsible for.
2. **Addressing: MAC, IP & Ports** — Three kinds of address, and which one answers which question.
3. **Packets, Frames & Encapsulation** — How data is wrapped in headers on the way down the stack and unwrapped on the way up.
4. **Latency, Bandwidth & Throughput** — Why a fast link can still feel slow, and how to measure it with ping and traceroute.
5. **Checkpoint** _(unscaffolded)_ — Capture a page load in Wireshark and label which header belongs to which layer, from Ethernet up to HTTP.

### 1.2 — IP & Name Resolution

1. **IPv4 Addressing & Subnets** — CIDR notation, subnet masks, and working out which addresses share a network.
2. **Routing Basics & NAT** — How routers forward packets hop by hop, and how one public address serves many devices.
3. **DNS: Turning Names into Addresses** — Resolvers, record types, caching, and the path of a lookup.
4. **DHCP & ARP: Joining a Network** — How a new device gets an address and finds its neighbors.
5. **Checkpoint** _(unscaffolded)_ — Given a small network diagram, assign subnets and explain how a packet gets from one host to a website, including NAT and DNS.

### 1.3 — TCP & UDP Basics

1. **UDP: Fast and Unreliable** — Datagrams with no connection, and when losing a packet is acceptable.
2. **TCP Connections: Handshake & Teardown** — The three-way handshake, the four-step close, and connection state.
3. **TCP Reliability: Sequence Numbers, ACKs & Retransmission** — How TCP turns an unreliable network into a reliable byte stream.
4. **Sockets: Writing a Client and Server** — The Berkeley sockets API — socket, bind, listen, accept, connect, send, recv.
5. **Ports, Listening & Connection States** — Reading ss and netstat output, and what LISTEN, ESTABLISHED, and TIME_WAIT mean.
6. **Checkpoint** _(unscaffolded)_ — Write a TCP echo server and client that handles partial reads and multiple clients correctly.

### 1.4 — HTTP Fundamentals

1. **The HTTP Request-Response Cycle** — What a request and response look like on the wire, as plain text.
2. **Methods & Status Codes** — GET, POST, PUT, DELETE, and the meaning of 2xx, 3xx, 4xx, and 5xx.
3. **Headers, Cookies & Content Negotiation** — Metadata that controls caching, formats, and state in a stateless protocol.
4. **URLs, Query Strings & Encoding** — The anatomy of a URL, percent-encoding, and why encoding bugs happen.
5. **Inspecting HTTP with curl & DevTools** — Reading real traffic from the command line and the browser's network panel.
6. **Checkpoint** _(unscaffolded)_ — Fetch a web page by typing the HTTP request by hand over a raw TCP connection, and parse the response.

## Level 2 — Intermediate

_Go from "I know how the protocols work" to "I can explain why a transfer is slow, secure a connection, and design an API other people can build on."_

### 2.1 — TCP in Depth

1. **Flow Control & the Sliding Window** — How a receiver stops a fast sender from overwhelming it.
2. **Congestion Control** — Slow start, congestion avoidance, and how Reno, CUBIC, and BBR differ.
3. **RTT, Timeouts & Retransmission** — Estimating round-trip time, fast retransmit, and why timeouts hurt.
4. **Connection Management in Practice** — TIME_WAIT, keepalives, Nagle's algorithm, delayed ACKs, and the listen backlog.
5. **Checkpoint** _(unscaffolded)_ — Given a packet capture of a slow download, explain what limits throughput: window, loss, or latency.

### 2.2 — HTTP Evolution & Performance

1. **HTTP/1.1: Persistent Connections & Head-of-Line Blocking** — Keep-alive, why pipelining failed, and why browsers open six connections.
2. **HTTP/2: Multiplexing & Header Compression** — Streams over a single connection, and what problem it left unsolved.
3. **HTTP/3 & QUIC** — HTTP over UDP, faster handshakes, and independence between streams.
4. **HTTP Caching** — Cache-Control, ETag, conditional requests, and how CDNs use them.
5. **Proxies, Reverse Proxies & Load Balancers** — What sits between client and server, and what each intermediary can see and change.
6. **Checkpoint** _(unscaffolded)_ — Take a slow web page, measure it with a waterfall, apply caching and protocol improvements, and show before and after numbers.

### 2.3 — TLS & Network Security

1. **The TLS Handshake** — Key exchange, authentication, and how TLS 1.3 gets to encrypted data in one round trip.
2. **Certificates & Chains of Trust** — What a certificate proves, how clients verify it, and how it fails.
3. **HTTPS in Practice** — HSTS, ALPN, redirects, mixed content, and a sensible server configuration.
4. **Common Network Attacks & Defenses** — Spoofing, SYN floods, DNS poisoning, and man-in-the-middle attacks.
5. **Checkpoint** _(unscaffolded)_ — Serve a local service over HTTPS with a certificate you created, and verify the chain and protocol with openssl.

### 2.4 — Designing APIs

1. **REST Principles & Resource Modeling** — Resources, URLs, and using HTTP semantics rather than fighting them.
2. **Errors, Pagination & Filtering** — Consistent error shapes, cursor vs. offset pagination, and query design.
3. **Authentication & Authorization** — API keys, sessions, OAuth 2.0, and JWTs — what each does and where each goes wrong.
4. **Idempotency & Versioning** — Making retries safe, and changing an API without breaking its users.
5. **CORS & Browser Constraints** — The same-origin policy, preflight requests, and why a browser blocks calls curl allows.
6. **Checkpoint** _(unscaffolded)_ — Design and build a small REST API with authentication, pagination, and consistent errors, and document it with OpenAPI.

## Level 3 — Senior

_Go from "I can build and secure an API" to "I can choose protocols for a given problem, design for failure at scale, diagnose a live network incident, and explain the tradeoffs."_

### 3.1 — Advanced APIs & Protocol Choice

1. **gRPC & Protocol Buffers** — Binary schemas, streaming, and when RPC beats REST.
2. **GraphQL Tradeoffs** — What client-driven queries gain, and what they cost in caching and security.
3. **WebSockets, SSE & Real-Time Updates** — Pushing data to clients — long polling, server-sent events, and full-duplex sockets.
4. **Webhooks & Asynchronous APIs** — Event delivery, signatures, retries, and designing for the receiver being down.
5. **Rate Limiting & Backpressure** — Token buckets, quotas, and protecting a service from its own clients.
6. **Checkpoint** _(unscaffolded)_ — Choose a protocol for three different scenarios, justify each in writing, and prototype one.

### 3.2 — Scale & Reliability

1. **Load Balancing: L4 vs. L7** — Algorithms, health checks, and what each layer of balancing can and can't see.
2. **Global Traffic: Anycast, GeoDNS & CDNs** — Routing users to nearby capacity, and the limits of DNS-based steering.
3. **Timeouts, Retries & Circuit Breakers** — Budgeting time, backoff with jitter, and avoiding retry storms.
4. **Service Discovery & Service Meshes** — How services find each other, and what a sidecar proxy takes over.
5. **Checkpoint** _(unscaffolded)_ — Design multi-region failover for an API, including timeout and retry budgets, and walk through a regional outage.

### 3.3 — Network Internals & Debugging

1. **The Kernel Network Path & Socket Buffers** — From NIC to application: interrupts, queues, buffers, and where packets get dropped.
2. **Packet Capture & Analysis** — tcpdump and Wireshark filters, and reading a capture to find the real problem.
3. **MTU, Fragmentation & Path MTU Discovery** — Why a connection works for small requests and hangs on large ones.
4. **Diagnosing Network Incidents** — A layered method: DNS, connectivity, transport, TLS, application.
5. **Checkpoint** _(unscaffolded)_ — Given symptoms and a capture from a failing service, find the root cause and write up the evidence.

### 3.4 — Security Architecture & Design Judgment

1. **Zero Trust & Mutual TLS** — Service identity, mTLS, and moving beyond 'inside the firewall is safe'.
2. **API Security: The OWASP API Top 10** — Broken object-level authorization and the other failures that actually happen.
3. **Firewalls, Segmentation & VPNs** — Controlling which traffic may flow where, and what each control does and doesn't protect.
4. **Designing and Defending a Network Architecture** — Making tradeoffs explicit and explaining them to engineers and non-engineers.
5. **Checkpoint** _(unscaffolded)_ — Threat-model an API and write a short design document that justifies its network and security choices.
