# AI Diagnostics module architecture

## Purpose

The AI Diagnostics module is an intelligent primary vehicle fault diagnostics feature for the GoodAvto Service web platform. It allows a user to describe vehicle symptoms in natural language and receive a structured preliminary diagnostic conclusion before contacting the service.

The module is designed for the diploma topic: **“Design and development of a web platform for an auto service with an intelligent module for primary vehicle fault diagnostics.”** It modernizes the existing website without changing the core architecture or rebuilding the project.

## Integration into the existing project

The current project is a React + TypeScript + Vite frontend with Tailwind CSS and reusable UI components. The diagnostics feature follows the same architecture:

- `src/components/AIDiagnosticsSection.tsx` contains the user interface, form state, loading/error states, and result presentation.
- `src/lib/diagnostics.ts` contains the expert diagnostics logic and can be tested independently from the UI.
- `src/pages/Index.tsx` integrates the diagnostics section into the existing landing page.
- Header and footer navigation link to the section through `#ai-diagnostics`.

This separation keeps the UI layer independent from the diagnostic knowledge base and makes the system easier to extend.

## Rule-based expert system

The current implementation uses a rule-based expert system. Each diagnostic rule represents a vehicle system or fault group, for example:

- engine and misfire symptoms;
- suspension and CV joint wear;
- braking system faults;
- steering issues;
- transmission symptoms;
- battery, generator, and electrical faults;
- cooling system overheating;
- fuel system faults;
- exhaust smoke symptoms;
- startup problems;
- dashboard warning indicators;
- vibration and noise combinations.

Each rule contains:

1. **Affected system** — the vehicle system most likely related to the symptoms.
2. **Probable issue** — the main preliminary diagnostic conclusion.
3. **Possible causes** — likely technical causes that should be checked by a mechanic.
4. **Recommendations** — practical next steps for the user and service specialist.
5. **Suggested service category** — mapping to the existing GoodAvto service areas.
6. **Danger base score** — initial risk level for this class of fault.
7. **Keyword weights** — weighted symptom terms used for matching.
8. **Combination rules** — symptom combinations that increase diagnostic confidence.

## Symptom analysis process

The analysis flow is:

1. The user enters a natural-language symptom description and optionally adds car brand/model.
2. The text is normalized: converted to lowercase, trimmed, and unified for Russian `ё/е` spelling.
3. Each diagnostic rule is scored against the normalized text.
4. The score is calculated from:
   - matched weighted keywords;
   - matched symptom combinations;
   - combination-specific boost values.
5. Rules are ranked by score.
6. The highest-ranked rule becomes the primary diagnostic result.
7. Additional high-scoring rules are returned as secondary diagnostic hypotheses.

This approach makes the system more realistic than a simple keyword search because symptom combinations such as “хруст + поворот” or “вибрация + разгон” carry more diagnostic value than isolated words.

## Confidence scoring

Confidence is calculated from:

- the share of matched rule evidence compared to the maximum possible rule evidence;
- separation between the best rule and the second-best rule;
- additional boosts from strong symptom combinations.

The score is clamped to a realistic range so the module does not present preliminary diagnostics as absolute certainty. This is important because a web-based diagnostics module cannot replace an in-person inspection, measurements, or computer diagnostics.

## Danger level logic

Danger level is derived from:

- the base risk level of the matched fault category;
- presence of critical terms such as overheating, oil pressure warning, brake pedal failure, burning smell, or steering lock symptoms;
- very strong symptom evidence.

The result is one of three levels:

- **Low** — suitable for planned inspection.
- **Medium** — diagnostics should be scheduled soon, and aggressive driving should be avoided.
- **High** — the symptom may affect safety or engine integrity, and service should not be delayed.

## Recommendation generation

Recommendations are stored as part of each expert rule. This makes the output predictable, safe, and aligned with the services actually provided by GoodAvto Service. Recommendations are written as practical next steps, for example:

- perform computer diagnostics;
- inspect suspension and driveline play;
- check brake discs, pads, calipers, and fluid level;
- stop driving if overheating or oil pressure warnings appear.

## Why a rule-based expert system was chosen

A rule-based expert system is well suited for this diploma project because:

1. **Transparency** — every diagnostic conclusion can be explained through matched symptoms and rules.
2. **Safety** — the system avoids uncontrolled or unverifiable generated advice.
3. **Lightweight implementation** — it runs fully in the frontend without a backend dependency.
4. **Security** — no API keys or sensitive AI credentials are exposed in the browser.
5. **Domain alignment** — rules can be mapped directly to GoodAvto service categories.
6. **Academic value** — the implementation demonstrates expert-system principles: rules, weights, inference, ranking, and confidence scoring.

## Future OpenAI / AI API upgrade path

OpenAI or another LLM API can be added later to improve natural-language understanding and produce more flexible explanations. The secure production approach would be:

1. Create a backend or serverless endpoint, for example `/api/diagnostics`.
2. Store the OpenAI API key only on the server side.
3. Send symptoms, brand, and model from the frontend to the backend.
4. Validate and sanitize input before calling the AI provider.
5. Ask the AI model to return strict JSON matching the `DiagnosticResult` structure.
6. Optionally combine AI output with the existing rule-based system for safety and consistency.
7. Log diagnostics history only with explicit user consent.

The current rule-based module can therefore act as a deterministic baseline, while future AI integration can become an additional inference layer rather than a full rewrite.
