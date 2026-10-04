---
title: Monte Carlo methods and quantum inference
order: 3
summary: Sampling constrained quantum states and using Bayesian methods to compare physical models.
publications: [quantum-constraints, wishart-sampling, bayesian-quantum-evidence]
---
Quantum-state spaces are high-dimensional and constrained by physicality. Generating useful samples in these spaces is a computational challenge, particularly when a problem requires a prescribed distribution or a property such as bound entanglement.

At the Centre for Quantum Technologies, I applied and extended sequentially constrained Monte Carlo sampling to quantum states. I also helped develop and implement a two-step algorithm using Wishart proposal distributions to produce uncorrelated, problem-specific samples. The associated MATLAB software is available in QSCMC and QSam.

In a complementary Bayesian study, I developed an analysis comparing quantum mechanics and local hidden-variable models. My contribution included likelihood maximisation, sample generation for relative belief ratios, and bias checks with simulated data.

These projects established a continuing interest in reliable numerical inference: understanding the constraints of a model, generating representative samples, and checking what a calculation can support.

[QSCMC software](https://github.com/feuerbutter/QSCMC) · [QSam software](https://github.com/feuerbutter/QSam)
