/**
 * League Class
 * 
 * This class represents a football league that manages multiple teams.
 * Think of it like a league table that keeps track of all teams and their matches.
 * 
 * WHAT A LEAGUE HAS:
 * 1. Basic Information:
 *    - name: The league's name (e.g., "Premier League")
 *    - country: The country where the league is based
 * 
 * 2. Teams:
 *    - teams: A list of all teams in the league
 * 
 * 3. Matches:
 *    - matches: A record of all matches played
 * 
 * WHAT A LEAGUE CAN DO:
 * - Add new teams to the league
 * - Remove teams from the league
 * - Record match results
 * - Calculate league standings
 * - Provide complete league information
 */

import Team from './Team.js';

/**
 * League Class
 * Represents a football league with multiple teams and match management
 */
export default class League {
    /**
     * Creates a new League instance
     * This is like starting a new football league
     * 
     * @param {string} name - The league's name
     * @param {string} [country='Unknown'] - The country where the league is based
     */
    constructor(name, country = 'Unknown') {
        // Store basic league information
        this.name = name;
        this.country = country;
        
        // Initialize league data
        this.teams = [];
        this.matches = [];
    }

    /**
     * Adds a new team to the league
     * This is like a team joining the league
     * 
     * @param {Team} team - The team to add
     * @returns {boolean} - Whether the team was successfully added
     */
    addTeam(team) {
        if (!(team instanceof Team)) {
            console.error('Invalid team object');
            return false;
        }
        this.teams.push(team);
        return true;
    }

    /**
     * Removes a team from the league
     * This is like a team leaving the league
     * 
     * @param {string} teamName - Name of the team to remove
     * @returns {boolean} - Whether the team was successfully removed
     */
    removeTeam(teamName) {
        const index = this.teams.findIndex(t => t.name === teamName);
        if (index === -1) {
            console.error('Team not found');
            return false;
        }
        this.teams.splice(index, 1);
        return true;
    }

    /**
     * Gets a team by name
     * This is like looking up a team in the league table
     * 
     * @param {string} teamName - Name of the team to find
     * @returns {Team|null} - The found team or null if not found
     */
    getTeam(teamName) {
        return this.teams.find(t => t.name === teamName) || null;
    }

    /**
     * Records a match result
     * This is like updating the league table after a game
     * 
     * @param {string} homeTeamName - Name of the home team
     * @param {string} awayTeamName - Name of the away team
     * @param {number} homeGoals - Goals scored by home team
     * @param {number} awayGoals - Goals scored by away team
     * @returns {boolean} - Whether the match was successfully recorded
     */
    recordMatch(homeTeamName, awayTeamName, homeGoals, awayGoals) {
        const homeTeam = this.getTeam(homeTeamName);
        const awayTeam = this.getTeam(awayTeamName);

        if (!homeTeam || !awayTeam) {
            console.error('One or both teams not found');
            return false;
        }

        // Calculate points (3 for win, 1 for draw, 0 for loss)
        let homePoints = 0;
        let awayPoints = 0;
        if (homeGoals > awayGoals) {
            homePoints = 3;
        } else if (homeGoals < awayGoals) {
            awayPoints = 3;
        } else {
            homePoints = 1;
            awayPoints = 1;
        }

        // Update team stats
        homeTeam.updateStats(homeGoals, awayGoals, homePoints);
        awayTeam.updateStats(awayGoals, homeGoals, awayPoints);

        // Record match
        this.matches.push({
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            homeGoals,
            awayGoals,
            date: new Date()
        });

        return true;
    }

    /**
     * Gets the league standings
     * This is like looking at the league table
     * 
     * @returns {Array<Object>} - Array of team standings, sorted by:
     *   1. Points (most points first)
     *   2. Goal difference (if points are equal)
     */
    getStandings() {
        return this.teams
            .map(team => team.getTeamInfo())
            .sort((a, b) => {
                if (b.stats.points !== a.stats.points) {
                    return b.stats.points - a.stats.points;
                }
                return b.stats.goalDifference - a.stats.goalDifference;
            });
    }

    /**
     * Gets the league's complete information
     * This is like reading the complete league table and match history
     * 
     * @returns {Object} - Complete league information including:
     *   - Basic details (name, country)
     *   - List of all teams
     *   - List of all matches
     *   - Current standings
     */
    getLeagueInfo() {
        return {
            name: this.name,
            country: this.country,
            teams: this.teams.map(team => team.getTeamInfo()),
            matches: this.matches,
            standings: this.getStandings()
        };
    }
} 