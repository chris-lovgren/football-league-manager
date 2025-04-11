/**
 * Player Class
 * 
 * This class represents a football player in our league.
 * Think of it like a player card that contains all their information.
 * 
 * WHAT A PLAYER HAS:
 * 1. Basic Information:
 *    - name: The player's full name
 *    - position: Where they play (Forward, Midfielder, etc.)
 *    - age: How old they are
 *    - nationality: Their country of origin
 *    - jerseyNumber: Their squad number
 * 
 * 2. Skills (rated 1-10):
 *    - pace: How fast they are
 *    - shooting: How good they are at shooting
 *    - passing: How good they are at passing
 *    - overallRating: Their total skill level
 * 
 * 3. Status:
 *    - isInjured: Whether they're currently injured
 *    - yellowCards: Number of yellow cards received
 *    - redCards: Number of red cards received
 * 
 * WHAT A PLAYER CAN DO:
 * - Update their stats (pace, shooting, passing)
 * - Get injured or recover
 * - Receive yellow or red cards
 * - Provide their complete information
 */

export default class Player {
    /**
     * Creates a new Player instance
     * This is like filling out a new player card with their details
     * 
     * @param {string} name - The player's full name (e.g., "John Smith")
     * @param {string} position - Their playing position (e.g., "Forward")
     * @param {number} pace - Speed rating (1-10)
     * @param {number} shooting - Shooting skill (1-10)
     * @param {number} passing - Passing skill (1-10)
     * @param {number} [age=25] - Player's age (defaults to 25)
     * @param {string} [nationality='Unknown'] - Player's country (defaults to 'Unknown')
     * @param {number} [jerseyNumber=0] - Squad number (defaults to 0)
     */
    constructor(name, position, pace, shooting, passing, age = 25, nationality = 'Unknown', jerseyNumber = 0) {
        // Store basic player information
        this.name = name;
        this.position = position;
        this.age = age;
        this.nationality = nationality;
        this.jerseyNumber = jerseyNumber;

        // Store and validate player skills
        this.pace = this.validateAttribute(pace);
        this.shooting = this.validateAttribute(shooting);
        this.passing = this.validateAttribute(passing);
        
        // Calculate overall rating based on skills
        this.overallRating = this.calculateOverallRating();
        
        // Initialize player status
        this.isInjured = false;
        this.yellowCards = 0;
        this.redCards = 0;
    }

    /**
     * Validates that a skill rating is between 1 and 10
     * This ensures no player has impossible stats
     * 
     * @param {number} value - The skill rating to validate
     * @returns {number} - The validated rating (clamped between 1 and 10)
     */
    validateAttribute(value) {
        return Math.max(1, Math.min(10, value));
    }

    /**
     * Calculates the player's overall rating
     * This is like getting their FIFA rating
     * 
     * @returns {number} - The average of all skills, rounded to nearest whole number
     */
    calculateOverallRating() {
        return Math.round((this.pace + this.shooting + this.passing) / 3);
    }

    /**
     * Updates the player's skill ratings
     * This is like improving their stats after training
     * 
     * @param {number} newPace - New pace rating
     * @param {number} newShooting - New shooting rating
     * @param {number} newPassing - New passing rating
     */
    updateStats(newPace, newShooting, newPassing) {
        this.pace = this.validateAttribute(newPace);
        this.shooting = this.validateAttribute(newShooting);
        this.passing = this.validateAttribute(newPassing);
        this.overallRating = this.calculateOverallRating();
    }

    /**
     * Sets the player's injury status
     * This is like marking them as injured or fit to play
     * 
     * @param {boolean} isInjured - Whether the player is injured
     */
    setInjuryStatus(isInjured) {
        this.isInjured = isInjured;
    }

    /**
     * Adds a disciplinary card to the player
     * This tracks yellow and red cards like in a real match
     * 
     * @param {string} cardType - Type of card ('yellow' or 'red')
     */
    addCard(cardType) {
        if (cardType === 'yellow') {
            this.yellowCards++;
            // Two yellow cards = one red card
            if (this.yellowCards >= 2) {
                this.redCards++;
                this.yellowCards = 0;
            }
        } else if (cardType === 'red') {
            this.redCards++;
        }
    }

    /**
     * Gets all the player's information
     * This is like reading their complete player card
     * 
     * @returns {Object} - Complete player information including:
     *   - Basic details (name, position, age, etc.)
     *   - Skills (pace, shooting, passing, overall)
     *   - Status (injuries, cards)
     */
    getPlayerInfo() {
        return {
            name: this.name,
            position: this.position,
            age: this.age,
            nationality: this.nationality,
            jerseyNumber: this.jerseyNumber,
            stats: {
                pace: this.pace,
                shooting: this.shooting,
                passing: this.passing,
                overall: this.overallRating
            },
            status: {
                isInjured: this.isInjured,
                yellowCards: this.yellowCards,
                redCards: this.redCards
            }
        };
    }
} 