/**
 * Team Class
 * 
 * This class represents a football team in our league.
 * Think of it like a team roster that contains all players and team information.
 * 
 * WHAT A TEAM HAS:
 * 1. Basic Information:
 *    - name: The team's name (e.g., "Manchester United")
 *    - city: The city where the team is based
 *    - stadium: The team's home stadium
 * 
 * 2. Players:
 *    - players: A list of all players in the team
 * 
 * 3. Statistics:
 *    - points: Total points earned in the league
 *    - goalsFor: Total goals scored
 *    - goalsAgainst: Total goals conceded
 * 
 * WHAT A TEAM CAN DO:
 * - Add new players to the roster
 * - Remove players from the roster
 * - Get information about specific players
 * - Update team statistics after matches
 * - Provide complete team information
 */

import Player from './Player.js';

/**
 * Team Class
 * Represents a football team with a list of players and team attributes
 */
export default class Team {
    /**
     * Creates a new Team instance
     * This is like creating a new team roster
     * 
     * @param {string} name - The team's name
     * @param {string} [city='Unknown'] - The team's city (defaults to 'Unknown')
     * @param {string} [stadium='Unknown'] - The team's stadium (defaults to 'Unknown')
     */
    constructor(name, city = 'Unknown', stadium = 'Unknown') {
        // Store basic team information
        this.name = name;
        this.city = city;
        this.stadium = stadium;
        
        // Initialize team roster and statistics
        this.players = [];
        this.points = 0;
        this.goalsFor = 0;
        this.goalsAgainst = 0;
    }

    /**
     * Adds a new player to the team
     * This is like signing a new player to the team
     * 
     * @param {Player} player - The player to add
     * @returns {boolean} - Whether the player was successfully added
     */
    addPlayer(player) {
        if (!(player instanceof Player)) {
            console.error('Invalid player object');
            return false;
        }
        this.players.push(player);
        return true;
    }

    /**
     * Removes a player from the team
     * This is like a player leaving the team
     * 
     * @param {string} playerName - The name of the player to remove
     * @returns {boolean} - Whether the player was successfully removed
     */
    removePlayer(playerName) {
        const index = this.players.findIndex(p => p.name === playerName);
        if (index === -1) {
            console.error('Player not found');
            return false;
        }
        this.players.splice(index, 1);
        return true;
    }

    /**
     * Gets a player by their name
     * This is like looking up a player in the team roster
     * 
     * @param {string} playerName - The name of the player to find
     * @returns {Player|null} - The found player or null if not found
     */
    getPlayer(playerName) {
        return this.players.find(p => p.name === playerName) || null;
    }

    /**
     * Updates team statistics after a match
     * This is like recording the results of a game
     * 
     * @param {number} goalsScored - Goals scored by this team
     * @param {number} goalsConceded - Goals conceded by this team
     * @param {number} pointsEarned - Points earned (3 for win, 1 for draw, 0 for loss)
     */
    updateStats(goalsScored, goalsConceded, pointsEarned) {
        this.goalsFor += goalsScored;
        this.goalsAgainst += goalsConceded;
        this.points += pointsEarned;
    }

    /**
     * Gets all the team's information
     * This is like reading the complete team roster and statistics
     * 
     * @returns {Object} - Complete team information including:
     *   - Basic details (name, city, stadium)
     *   - List of all players
     *   - Team statistics (points, goals)
     */
    getTeamInfo() {
        return {
            name: this.name,
            city: this.city,
            stadium: this.stadium,
            players: this.players.map(player => player.getPlayerInfo()),
            stats: {
                points: this.points,
                goalsFor: this.goalsFor,
                goalsAgainst: this.goalsAgainst,
                goalDifference: this.goalsFor - this.goalsAgainst
            }
        };
    }
} 