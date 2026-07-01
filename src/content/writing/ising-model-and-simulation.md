---
title: Ising Model and Simulation
publishDate: 2008-12-01 00:00:00
img: /assets/stock-3.jpg
img_alt: Pearls of silky soft white cotton bubble up under vibrant lighting
description: |
  Computational Physics, Department of Physics, University of Basic Science, (Fall 2008).
tags:
  - Physics
  - Simulation
  - Computational Physics
---

*Computational Physics, Department of Physics, University of Basic Science, (Fall 2008).*

The Isinig model is a famous and applicable model in the statistical mechanics. In this project, I propose to consider the Ising model and its computational simulation. In this text, I try to review the main idea of the Ising model and Metropolis algorithm, the computational approach to this problem. Finally, I report the result of my own simulation and compare its results with analytical solution as a conclusion.

## Introduction

Statistical mechanics is a very active area of research and there are many open problems. In fact, the general phenomenon of phase transitions is still actively being researched. An example of these phenomena is ferromagnetic transition in the Curie temperature. In this phenomenon, Ferromagnetic materials, when heated, eventually lose their magnetic properties. This loss becomes complete above the Curie temperature, named after the French physicist Pierre Curie, who discovered it in 1895 [1-2]. Paramagnetism is the normal induced magnetization of a material when it is put into a magnetic field. Paramagnetism could be explained by assuming that all spins are independent. Ferromagnetism is the spontaneous magnetization occurring in certain metals such as iron and nickel. To explain this phenomenon we must take into account the interaction between spins [2]. The Ising model is an attempt to simulate the structure of this phase transition. Originally, it was invented for the phase transition of ferromagnets at the Curie temperature; however, in the course of time it was realized that with only slight changes the model can also be applied to other phase transitions, like order-disorder transitions in binary alloys. Furthermore, the model may be applied to several modem problems of many particle physics, for instance for the description of so-called spin glasses. These are metals having amorphous instead of crystalline structures, which have the interesting property of no vanishing entropy at T = 0. Recently, it has been realized that Ising's idea (in modified form) could also explain pattern recognition in schematic neural networks. Thus, this model gains more and more importance for the development of models for the human brain [3-8]. The main idea of Ising model is one orientation spin-interaction of fixed point on the lattice. This simplification is based on quantum mechanics concepts ‘exchange force’ [1]. It’s meaning that the only outer electrons (conduction electrons) on the matter have interaction and their interaction is only in z-direction. On the other hand, this means that the characters of lattice like dimension, size, morphology and structure are variables of this model. We have to resume these quantities to have a specific sample of Ising model. The other consideration of Ising model is that the only nearest neighbors interactions are necessary and others can be neglect [5]. The finally assumption is that the lattice in statistical limit are periodic [6].

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/equation1.jpg)

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/figure1.jpg)

#### Figure 1. The 2-demension lattice; (a) Square (4 nearest neighbor); (b) Triangular (6 nearest neighbor) (c) Hexagunal (3 nearest neighbor). [7]

There are exact analytical solutions for 1 and 2 dimensions Ising models. In this project I have to simulate the 2-dimension Ising model with Square lattice. To see exact solution of this structure with addition theoretical detail, refer to Riechl [7].

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/figure2.jpg)

#### Figure 2. The 2-demension Ising with square lattice.

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/figure3.jpg)

#### Figure 3. The summary of analytical and experimental results Tc=2.269 j/kB.

## Computational Approach

The computational simulation of Ising model is based on the two facts: The statistical nature of events and the Ising Hamiltonian [9]. From statistical mechanics, we know the probability of every event A is proportional to Boltzmann factor:

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/equation2.jpg)

so the transition probability of A → B phase transition is:

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/equation3.jpg)

The computational algorithm which applies this factor at a problem is Metropolis algorithm [9], which I needed to simulate the Ising model. In this section, I will introduce the Metropolis algorithm and then present my own simulation algorithm.

### (a) Metropolis Algorithm Steps [9]:

1. Start with an arbitrary spin configuration (initial conditions): {sij}
2. Generate a new state:

### (b) Simulation Algorithm [Appendix: Project.f90]:

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/chart1.jpg)

### (c) Metropolis Algorithm [Appendix: Subroutine MonteCarlo]:

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/chart2.jpg)

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/figure4.jpg)

#### Figure 4. The result structures in 40×40 lattice.

The result structures of simulation (in 40×40 lattice) are shown in Figure 4. As we expect, the entropy of system increasing by the temperature of system. Figure 5 are the charts of results for 20×20, 40×40, 60×60 and 100×100 in compare of analytical graph. As we expect, the value of the average magnetization in high temperature are decrease by increasing of system. It’s mean that the system becomes nearest to statistical limit and the simulation work well as a statistical system. The other point is that the qualitative behavior of system and the simulation’s results are same. On the other hand, we know from renormalization group method in the critical points we have a self similarity property for the system. This figure shows that the critical point is T~C~≈ 2.1 j/k~B~, which is near to Curie temperature (T~C~≈ 2.269 j/k~B~) validly.

![](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/figure5.jpg)

#### Figure 5. The result average magnetization simulation results.

## Acknowledgment

It’s a pleasure to thank Dr. Esfarjani and Dr. Ghaleh, my professors of computational physics and Dr. Langari, Dr. Sadat and Dr. Ketabi, my professors of statistical physics and thermodynamics.

## Refrences

1. Microsoft© Student with Encarta Premium 2009 DVD.
2. Dorlas, T.C. “Statistical Mechanics: Fundamentals and Model Solutions”, IOP Publishing Ltd, (1999), Ch. 28, 160-173.
3. Greiner, W., Neise, L. and Stoecker, H. “Thermodynamics and Statistical Mechanics”, Springer, (1995), Ch. 18, 436-456.
4. Nishimori, H., “Statistical Physics of Spin Glasses and Information Processing: An Introduction”, Oxford University Press, (2001), Ch. 1, 1-10.
5. Pathria, K. S., “Statistical Mechanic”, 2nd ed., Butterworth-Heinemann, (1996), Ch. 11, 314-319.
6. Huang, K., “Statistical Mechanics”, 2nd ed., John Wiley & Sons, (1987), Ch. 14, 341-363.
7. Reichl, L.E., “A Modem Course in Statistical Physics”, 2nd ed., John Wiley & Sons, (1998), Ch. 8, 462-485.
8. Dalvit, D. A. R., Frastai, J. and Lawrie, I. D., “Problems on Statistical Mechanics”, IOP Publishing Ltd, (1999), Ch. 5, Prob. 14-28.
9. Landau, R. and Paez, M. J. “Computation Physics: Problem Solving with Computers”, John Wiley & Sons, (1976), Ch. 22, 297-305.

### Appendix

- [FORTRAN Code](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/Project.f90)
- [Parameter file](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/parameters.dat)

[PDF version](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/Ising.pdf) [Presentation version](http://docs.sadrnezhaad.com/mahdi/Physics/ising-model-and-simulation/Project-presentation.pdf)
