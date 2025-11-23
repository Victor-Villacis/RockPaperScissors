# 🎮 Rock Paper Scissors - Modern React Game

A beautifully animated, modern Rock Paper Scissors game built with React and Framer Motion. Features smooth animations, intuitive gameplay, and a polished user experience.

## ✨ Features

- **Modern React Architecture**: Built with React 19 using functional components and hooks
- **Beautiful Animations**: Powered by Framer Motion for smooth, delightful interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive UI/UX**: Clean, modern interface with excellent visual feedback
- **Real-time Scoring**: Automatic score tracking with animated updates
- **Game State Management**: Clean state flow through setup, playing, reveal, and result phases
- **Accessibility**: Keyboard navigation and focus management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd RockPaperScissors
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Play

1. **Setup**: Enter player names (optional) and click "Start Game"
2. **Choose**: Each player selects Rock, Paper, or Scissors
3. **Reveal**: Click the reveal button to see both choices
4. **Winner**: The winner is announced with a celebration animation!
5. **Play Again**: Click "Play Again" for another round

## 🎨 Modern Improvements

This is a complete modernization of the original vanilla JavaScript game with:

- ✅ React with modern hooks (useState, useCallback, useMemo)
- ✅ Framer Motion for professional animations
- ✅ Component-based architecture for better maintainability
- ✅ CSS custom properties for theming
- ✅ Responsive design that works on all devices
- ✅ Improved game flow without drag-and-drop complexity
- ✅ Tie game logic implemented
- ✅ Better state management without localStorage dependency
- ✅ Enhanced accessibility features

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Modern CSS** - Custom properties and gradients

## 📁 Project Structure

```
RockPaperScissors/
├── src/
│   ├── components/
│   │   ├── ChoiceButton.jsx
│   │   ├── ChoiceButton.css
│   │   ├── PlayerCard.jsx
│   │   ├── PlayerCard.css
│   │   ├── ScoreBoard.jsx
│   │   ├── ScoreBoard.css
│   │   ├── WinnerDisplay.jsx
│   │   └── WinnerDisplay.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎮 Game Rules

- **Rock** beats Scissors
- **Scissors** beats Paper
- **Paper** beats Rock
- Same choice = Tie

## 📝 License

ISC

---

**Note**: The original vanilla JavaScript version has been moved to the "Old Files" directory. 

