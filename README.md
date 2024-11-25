# Assignment 9: Neural Network Visualization

Demo Video: [YouTube Link](https://youtu.be/Ar8adHvQHNw)

## Project Overview
This project implements a feedforward neural network with interactive visualizations showing how the network learns to classify circular data. Users can experiment with different activation functions and learning rates while observing the network's learning process through three synchronized visualizations.

## Key Components

### Visualizations
1. **Hidden Space (3D)**
   - Shows data transformation in 3D hidden layer
   - Yellow plane indicates learned decision boundary
   - Axes standardized from -1 to 1

2. **Input Space (2D)**
   - Displays evolving decision boundary
   - Blue/red regions show binary classification
   - Original data points plotted

3. **Gradient Visualization**
   - Network architecture with labeled nodes
   - Line thickness shows gradient magnitude
   - Grid system from 0 to 1

### Parameters
- **Activation Functions**: Choice of tanh, ReLU, or sigmoid
- **Learning Rate**: Adjustable to control learning speed
- **Training Steps**: Number of iterations to observe

## Usage
1. Install dependencies: `make install`
2. Start server: `make run`
3. Access interface: `http://127.0.0.1:3000`
4. Select parameters and observe learning process

## Implementation
- Single hidden layer (3 neurons)
- Binary classification output
- Custom forward/backward propagation
- Flask web interface
- Real-time visualization