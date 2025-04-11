/*
 * FOOTBALL LEAGUE MANAGER
 * 
 * This is a simple football league management system.
 * Think of it like a digital notebook where you can:
 * - Create football teams
 * - Add players to teams (with first and last names)
 * - Track player stats (pace, shooting, passing)
 * - Remove teams and players
 * 
 * HOW IT WORKS:
 * 1. The application is built using Object-Oriented Programming (OOP)
 *    - Each type of object (Player, Team, League) is defined in its own file
 *    - Objects store data and have methods to perform actions
 *    - The DOM (Document Object Model) represents the visual interface
 * 
 * 2. File Structure:
 *    - js/classes/Player.js: Defines what a player is and what they can do
 *    - js/classes/Team.js: Defines what a team is and how to manage players
 *    - js/classes/League.js: Defines the league and handles the user interface
 *    - js/classes/UIManager.js: Handles all UI-related functionality
 *    - js/script.js: This file - sets up the application and initial data
 * 
 * 3. How the Code is Organized:
 *    - Classes: Define blueprints for objects (Player, Team, League)
 *    - Objects: Store data and behavior (e.g., a specific player's stats)
 *    - Methods: Functions that perform actions (e.g., adding a player to a team)
 *    - DOM: The visual interface that users interact with
 * 
 * 4. Key Features:
 *    - Create and manage teams with names, cities, and stadiums
 *    - Add players with detailed stats (pace, shooting, passing)
 *    - Track team performance and player statistics
 *    - User-friendly interface for all operations
 * 
 * 5. Getting Started:
 *    - The application starts by creating a League instance
 *    - Initial teams and players are created for demonstration
 *    - The interface is set up when the page loads
 *    - Users can then add, edit, or remove teams and players
 */

// ============================================
// INITIALIZATION
// ============================================

/*
 * This section sets up the application when it first starts.
 * 
 * What happens here:
 * 1. We import the necessary classes from their files
 * 2. Create a new League instance (the main manager)
 * 3. Create some initial teams with their details
 * 4. Add some initial players to each team
 * 5. Set up the display when the page loads
 */

// Import the classes we need
import Player from './classes/Player.js';
import Team from './classes/Team.js';
import League from './classes/League.js';
import UIManager from './classes/UIManager.js';

// Create the main league manager instance
// This is like creating a new notebook to track our teams
const premierLeague = new League('Premier League', 'England');

// Create initial teams with their details
// Each team has a name, city, and stadium
const initialTeams = [
    new Team('Inter', 'Milan', 'San Siro'),
    new Team('Bologna', 'Bologna', 'Renato Dall\'Ara'),
    new Team('Atalanta', 'Bergamo', 'Gewiss Stadium'),
    new Team('Monza', 'Monza', 'U-Power Stadium'),
    new Team('Lazio', 'Rome', 'Stadio Olimpico')
];

// Add initial players to each team
// Each player has a name, position, and stats
initialTeams.forEach(team => {
    // Add 5 players to each team with different positions and stats
    team.addPlayer(new Player('Player 1', 'Forward', 9, 8, 7));
    team.addPlayer(new Player('Player 2', 'Midfielder', 7, 6, 9));
    team.addPlayer(new Player('Player 3', 'Defender', 6, 4, 6));
    team.addPlayer(new Player('Player 4', 'Goalkeeper', 5, 2, 5));
    team.addPlayer(new Player('Player 5', 'Midfielder', 8, 7, 8));
    
    // Add the team to the league
    premierLeague.addTeam(team);
});

// When the page loads, create the UI manager and display everything
window.onload = function() {
    const uiManager = new UIManager(premierLeague);
};


