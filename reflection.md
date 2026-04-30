# Reflection — Persona-Based AI Chatbot Assignment

## What Worked in the Prompt Engineering Process

The single most effective technique I used was few-shot examples. Before I added them, the personas felt generic — responses were technically on-topic but tonally flat. Once I wrote three concrete example exchanges per persona, everything snapped into focus. The examples didn't just illustrate style; they demonstrated sentence length, the cadence of pushback versus encouragement, and whether to end with a challenge or an open question. Abstract instructions like "be direct" are underspecified in ways I didn't appreciate until I saw how differently the model interpreted them. Concrete examples removed that ambiguity.

The chain-of-thought scaffolding also paid off more than I expected. Hiding the reasoning step from users while forcing the model to identify the real question underneath the surface ask meant responses addressed root problems rather than surface requests. A user asking "should I do an MBA?" is often actually asking "how do I escape a career that isn't working?" — and the CoT instruction pushed the persona to answer the second question. Structuring each persona's reasoning steps differently (Anshuman: examine the assumption; Abhimanyu: find a story; KM: identify what the student is avoiding) was what made the three voices feel genuinely distinct.

## What GIGO Taught Me

Garbage In, Garbage Out is not a principle I fully understood until this assignment made it visceral. My first draft of Anshuman's prompt was vague: "be direct and data-driven." What came out was a polite, mildly assertive assistant — still helpful, still safe, and entirely wrong for the persona. The input was unclear, so the output was mediocre.

The GIGO lesson that stuck was more specific: vagueness compounds. A vague persona description leads to vague tone instructions, which leads to vague examples, which leads to output smoothed into genericness at every layer. Fixing one layer without fixing the others doesn't work. I had to rewrite the identity, the style instructions, the CoT steps, and the examples together as a coherent system. Treating the prompt as a collection of independent instructions rather than an integrated design was the mistake that made my early drafts fail.

## What I Would Improve Next Time

The biggest gap I see is that I hard-coded output format constraints without testing them empirically. I assumed 4–6 sentences was right for Anshuman based on intuition, but never verified whether responses at that length felt natural for different question types. Next time I would run a short evaluation loop — ask each persona ten diverse questions and check whether the format constraints help or fight the persona's natural voice.

I would also invest more in the constraints section. My current constraints are mainly negative rules — don't break character, don't fabricate data. What I found missing were positive behavioral constraints covering edge cases like repeated questions or off-topic tangents. Writing those handlers upfront, rather than discovering them in testing, would meaningfully raise the quality floor.
