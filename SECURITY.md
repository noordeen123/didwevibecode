# Security Policy

## Supported Versions

| Version | Supported          | Reality |
| ------- | ------------------ | ------- |
| 1.0.x   | :white_check_mark: | Highly vulnerable to ReDoS attacks. |
| 0.9.x   | :x:                | AI accidentally deleted all the tests. |
| 0.8.x   | :x:                | Hardcoded AWS keys in the codebase. |

## Reporting a Vulnerability

**DO NOT email us.** We do not care.

This entire project is an intentional security nightmare. We have built-in the following critical vulnerabilities on purpose:

1. **LocalStorage Database:** We store all "secure" data as plain text strings in `localStorage`. 
2. **Supply Chain Attacks:** The `Slopsquatting` module explicitly downloads hallucinated malware packages.
3. **Regex Bombs:** The `RegexBomb` component is designed to freeze your browser CPU.

If you find a *new* vulnerability that we haven't thought of, please open an issue and we will immediately add it to the `HallOfFame.tsx` as a feature.

Thank you for contributing to the chaos.
