/*
 * FOOTBALL LEAGUE MANAGER
 * 
 * This is a simple football league management system.
 * Think of it like a digital notebook where you can:
 * - Create football teams
 * - Add players to teams
 * - Track player stats (pace, shooting, passing)
 * - Remove teams and players
 * 
 * ARCHITECTURE OVERVIEW:
 * This application follows Object-Oriented Programming (OOP) principles:
 * 1. Classes define blueprints for objects
 * 2. Objects store data and behavior
 * 3. Methods perform actions on the data
 * 4. The DOM (Document Object Model) represents the visual interface
 * 
 * The code is organized into 5 main sections:
 * 1. Class Definitions - The blueprints for our data
 * 2. UI Creation Methods - How the webpage looks
 * 3. Data Management Methods - How we handle the data
 * 4. Event Handlers - What happens when you click buttons
 * 5. Initialization - Setting up the starting data
 */

// ============================================
// 1. CLASS DEFINITIONS
// ============================================

/*
 * Player Class
 * This is like a template for creating player objects.
 * Each player has:
 * - name: The player's name
 * - position: Where they play (Forward, Midfielder, etc.)
 * - pace: How fast they are (1-10)
 * - shooting: How good they are at shooting (1-10)
 * - passing: How good they are at passing (1-10)
 * 
 * WHY USE A CLASS?
 * - Encapsulation: Keeps related data together
 * - Reusability: Can create many player objects
 * - Organization: Clear structure for player data
 */
class Player {
    constructor(name, position, pace, shooting, passing) {
        this.name = name;
        this.position = position;
        this.pace = pace;
        this.shooting = shooting;
        this.passing = passing;
    }
}

/*
 * Team Class
 * This is like a template for creating team objects.
 * Each team has:
 * - name: The team's name
 * - players: A list of players on the team
 * 
 * Methods:
 * - addPlayer(): Adds a new player to the team
 * - removePlayer(): Removes a player from the team
 * 
 * WHY USE A CLASS WITH AN ARRAY?
 * - Teams can have multiple players (array stores the list)
 * - Methods handle team-specific actions
 * - Keeps team data and behavior together
 */
class Team {
    constructor(name) {
        this.name = name;
        this.players = [];  // Array to store multiple players
    }

    addPlayer(player) {
        this.players.push(player);  // Add to end of array
    }

    removePlayer(playerName) {
        // Filter creates new array without the removed player
        this.players = this.players.filter(player => player.name !== playerName);
        premierLeague.displayTeams();  // Update the display
    }
}

/*
 * League Class
 * This is the main manager class that:
 * - Keeps track of all teams
 * - Creates the user interface
 * - Handles adding/removing teams and players
 * - Updates the display
 * 
 * WHY USE A MANAGER CLASS?
 * - Centralizes control of the application
 * - Manages the relationship between teams and UI
 * - Handles all user interactions
 * - Maintains application state
 */
class League {
    constructor() {
        this.teams = [];  // Array to store all teams
        this.initializeUI();  // Set up the webpage
    }

    // ============================================
    // 2. UI CREATION METHODS
    // ============================================

    /*
     * UI Creation Methods
     * These methods create all the parts of the webpage.
     * 
     * UI STRUCTURE:
     * 1. Main Container (holds everything)
     *    ├── Title
     *    ├── Team Form
     *    │   ├── Team Name Input
     *    │   └── Add Team Button
     *    ├── Player Form
     *    │   ├── Team Select Dropdown
     *    │   ├── Player Name Input
     *    │   ├── Position Select
     *    │   ├── Attribute Inputs
     *    │   └── Add Player Button
     *    └── Teams Container
     *        └── Team Cards
     *            ├── Team Header
     *            │   ├── Team Name
     *            │   └── Remove Team Button
     *            └── Player List
     *                └── Player Elements
     *                    ├── Player Info
     *                    └── Button Container
     *                        ├── Edit Button
     *                        └── Remove Button
     */

    // ======================
    // 2.1 MAIN CONTAINER
    // ======================
    initializeUI() {
        // Get the main app div from the HTML
        const app = document.getElementById('app');
        // Create the main container that will hold all UI elements
        const container = this.createMainContainer();
        // Add the container to the app div in the HTML
        app.appendChild(container);
    }

    createMainContainer() {
        // Create a new div element to serve as the main container
        const container = document.createElement('div');
        // Add a CSS class for styling
        container.className = 'container';
        
        // Build the UI hierarchy by adding elements in order
        // 'this' refers to the current League instance
        // Each method creates and returns a DOM element
        
        // Add the title at the top
        container.appendChild(this.createTitle());
        // Add the team creation form
        container.appendChild(this.createTeamForm());
        // Add the player creation form
        container.appendChild(this.createPlayerForm());
        // Add the container where teams will be displayed
        container.appendChild(this.createTeamsContainer());
        
        // Return the complete container with all elements added
        return container;
    }

    // ======================
    // 2.2 TITLE
    // ======================
    createTitle() {
        // Create a new h1 element for the title
        const title = document.createElement('h1');
        // Set the text content of the title
        title.textContent = 'Football League Manager';
        // Return the title element to be added to the container
        return title;
    }

    // ======================
    // 2.3 TEAM FORM
    // ======================
    createTeamForm() {
        // Create a container div for the form
        const formContainer = document.createElement('div');
        // Add CSS class for styling
        formContainer.className = 'form-container';
        
        // Create the form title
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Add New Team';
        
        // Create the team name input field
        const teamInput = document.createElement('input');
        teamInput.type = 'text';
        teamInput.id = 'team-name';
        teamInput.placeholder = 'Team Name';
        
        // Create the add team button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Team';
        // 'this' refers to the League instance
        // When clicked, call the addNewTeam method on this League instance
        addButton.onclick = () => this.addNewTeam();
        
        // Add all elements to the form container in order
        formContainer.appendChild(formTitle);
        formContainer.appendChild(teamInput);
        formContainer.appendChild(addButton);
        
        // Return the complete form
        return formContainer;
    }

    // ======================
    // 2.4 PLAYER FORM
    // ======================
    createPlayerForm() {
        // Create a container div for the player form
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        
        // Create the form title
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Add New Player';
        
        // Create all form components
        // 'this' refers to the League instance
        // Each method creates and returns a DOM element
        const teamSelect = this.createTeamSelect();
        const nameInput = this.createNameInput();
        const positionSelect = this.createPositionSelect();
        const attributeInputs = this.createAttributeInputs();
        const addButton = this.createAddPlayerButton();
        
        // Add all elements to the form container in order
        formContainer.appendChild(formTitle);
        formContainer.appendChild(teamSelect);
        formContainer.appendChild(nameInput);
        formContainer.appendChild(positionSelect);
        formContainer.appendChild(attributeInputs);
        formContainer.appendChild(addButton);
        
        // Return the complete form
        return formContainer;
    }

    // ======================
    // 2.5 FORM COMPONENTS
    // ======================
    createTeamSelect() {
        // Create a dropdown select element for team selection
        const select = document.createElement('select');
        // Set the ID for easy reference in other methods
        select.id = 'team-select';
        // Return the select element to be added to the form
        return select;
    }

    createNameInput() {
        // Create an input field for the player's name
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'player-name';
        input.placeholder = 'Player Name';
        // Return the input element to be added to the form
        return input;
    }

    createPositionSelect() {
        // Create a dropdown select element for player position
        const select = document.createElement('select');
        select.id = 'player-position';
        // Define available positions
        const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
        
        // For each position, create an option element and add it to the select
        positions.forEach(position => {
            // Create a new option element
            const option = document.createElement('option');
            // Set the value and display text
            option.value = position;
            option.textContent = position;
            // Add the option to the select dropdown
            select.appendChild(option);
        });
        
        // Return the complete select element with all options
        return select;
    }

    createAttributeInputs() {
        // Create a container for all attribute inputs
        const container = document.createElement('div');
        // Define the attributes we need inputs for
        const attributes = ['pace', 'shooting', 'passing'];
        
        // Create an input for each attribute
        attributes.forEach(attr => {
            // Create a new number input
            const input = document.createElement('input');
            input.type = 'number';
            // Set a unique ID for each input
            input.id = `player-${attr}`;
            // Create a placeholder with capitalized attribute name
            input.placeholder = `${attr.charAt(0).toUpperCase() + attr.slice(1)} (1-10)`;
            // Set min and max values for validation
            input.min = '1';
            input.max = '10';
            // Add the input to the container
            container.appendChild(input);
        });
        
        // Return the container with all attribute inputs
        return container;
    }

    createAddPlayerButton() {
        // Create the button to add a new player
        const button = document.createElement('button');
        button.textContent = 'Add Player';
        // 'this' refers to the League instance
        // When clicked, call the addNewPlayer method on this League instance
        button.onclick = () => this.addNewPlayer();
        // Return the button to be added to the form
        return button;
    }

    // ======================
    // 2.6 TEAMS DISPLAY
    // ======================
    createTeamsContainer() {
        // Create a container for all team cards
        const container = document.createElement('div');
        // Set the ID for easy reference in other methods
        container.id = 'teams-container';
        // Return the container to be added to the main container
        return container;
    }

    createTeamCard(team) {
        // Create a card container for a single team
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        // Create the team header and player list
        // 'this' refers to the League instance
        const teamHeader = this.createTeamHeader(team);
        const playerList = this.createPlayerList(team);

        // Add the header and player list to the team card
        teamCard.appendChild(teamHeader);
        teamCard.appendChild(playerList);

        // Return the complete team card
        return teamCard;
    }

    createTeamHeader(team) {
        // Create a header container for the team name and remove button
        const header = document.createElement('div');
        header.className = 'team-name';
        
        // Create a span for the team name
        const name = document.createElement('span');
        name.textContent = team.name;
        
        // Create the remove team button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove Team';
        // 'this' refers to the League instance
        // When clicked, call the removeTeam method on this League instance
        removeBtn.onclick = () => this.removeTeam(team.name);
        
        // Add the name and button to the header
        header.appendChild(name);
        header.appendChild(removeBtn);
        
        // Return the complete header
        return header;
    }

    createPlayerList(team) {
        // Create a container for the list of players
        const list = document.createElement('div');
        list.className = 'player-list';

        // For each player in the team, create a player element
        team.players.forEach(player => {
            // 'this' refers to the League instance
            // Create a player element and add it to the list
            const playerElement = this.createPlayerElement(team, player);
            list.appendChild(playerElement);
        });

        // Return the complete player list
        return list;
    }

    // ======================
    // 2.7 PLAYER ELEMENT
    // ======================
    createPlayerElement(team, player) {
        // Create a container for the player information
        const element = document.createElement('div');
        element.className = 'player';
        
        // Create a span to display player information
        const info = document.createElement('span');
        info.textContent = `${player.name} (${player.position}) - Pace: ${player.pace}, Shooting: ${player.shooting}, Passing: ${player.passing}`;
        
        // Create a container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        // Create the edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        // 'this' refers to the League instance
        // When clicked, call the editPlayer method on this League instance
        editBtn.onclick = () => this.editPlayer(team, player);
        
        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        // When clicked, call the removePlayer method on the team instance
        removeBtn.onclick = () => team.removePlayer(player.name);
        
        // Add the buttons to the button container
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(removeBtn);
        
        // Add the info and button container to the player element
        element.appendChild(info);
        element.appendChild(buttonContainer);
        
        // Return the complete player element
        return element;
    }

    // ============================================
    // 3. DATA MANAGEMENT METHODS
    // ============================================

    /*
     * Data Management Methods
     * These methods handle:
     * - Adding and removing teams
     * - Updating the team dropdown
     * - Displaying teams and players
     * 
     * WHY SEPARATE DATA METHODS?
     * - Keeps data operations organized
     * - Makes data changes predictable
     * - Centralizes data manipulation
     * - Ensures UI stays in sync with data
     */

    // Adds a new team to the league
    addTeam(team) {
        // 'this.teams' refers to the array of teams in this League instance
        // Add the new team to the end of the teams array
        this.teams.push(team);
        // Update the team dropdown to include the new team
        this.updateTeamSelect();
        // Refresh the display to show the new team
        this.displayTeams();
    }

    // Removes a team from the league
    removeTeam(teamName) {
        // Filter out the team with the matching name
        // 'this.teams' refers to the array of teams in this League instance
        // The filter method creates a new array without the removed team
        this.teams = this.teams.filter(team => team.name !== teamName);
        // Update the team dropdown to remove the deleted team
        this.updateTeamSelect();
        // Refresh the display to remove the team
        this.displayTeams();
    }

    // Updates the team dropdown with current teams
    updateTeamSelect() {
        // Get the team select element from the DOM
        const teamSelect = document.getElementById('team-select');
        // Clear all existing options
        teamSelect.innerHTML = '';
        
        // For each team in the league
        this.teams.forEach(team => {
            // Create a new option element
            const option = document.createElement('option');
            // Set the value and display text to the team name
            option.value = team.name;
            option.textContent = team.name;
            // Add the option to the select dropdown
            teamSelect.appendChild(option);
        });
    }

    // Shows all teams and their players on the page
    displayTeams() {
        // Get the teams container from the DOM
        const container = document.getElementById('teams-container');
        // Clear all existing content
        container.innerHTML = '';

        // For each team in the league
        this.teams.forEach(team => {
            // Create a team card and add it to the container
            const teamCard = this.createTeamCard(team);
            container.appendChild(teamCard);
        });
    }

    // This method handles editing a player's stats
    editPlayer(team, player) {
        // Show prompts to get new values for each stat
        // Each prompt shows the current value as the default
        const newPace = prompt('Enter new pace (1-10):', player.pace);
        const newShooting = prompt('Enter new shooting (1-10):', player.shooting);
        const newPassing = prompt('Enter new passing (1-10):', player.passing);

        // Only update if the user entered all three values
        if (newPace && newShooting && newPassing) {
            // Convert the string inputs to numbers
            player.pace = parseInt(newPace);
            player.shooting = parseInt(newShooting);
            player.passing = parseInt(newPassing);
            
            // Update the display to show the new values
            this.displayTeams();
        }
    }

    // ============================================
    // 4. EVENT HANDLERS
    // ============================================

    /*
     * Event Handlers
     * These methods handle what happens when:
     * - You click the "Add Team" button
     * - You click the "Add Player" button
     * 
     * WHY USE EVENT HANDLERS?
     * - Respond to user actions
     * - Connect UI to data
     * - Update the display
     * - Handle form submissions
     */

    // Handles adding a new team when the form is submitted
    addNewTeam() {
        // Get the team name input element
        const teamNameInput = document.getElementById('team-name');
        // Get the trimmed value from the input
        const teamName = teamNameInput.value.trim();
        
        // Only proceed if a team name was entered
        if (teamName) {
            // Create a new Team instance with the entered name
            const newTeam = new Team(teamName);
            // Add the new team to the league
            this.addTeam(newTeam);
            // Clear the input field for the next entry
            teamNameInput.value = '';
        }
    }

    // Handles adding a new player when the form is submitted
    addNewPlayer() {
        // Get all the form elements
        const teamSelect = document.getElementById('team-select');
        const playerName = document.getElementById('player-name').value.trim();
        const position = document.getElementById('player-position').value;
        // Convert the attribute values to numbers
        const pace = parseInt(document.getElementById('player-pace').value);
        const shooting = parseInt(document.getElementById('player-shooting').value);
        const passing = parseInt(document.getElementById('player-passing').value);

        // Only proceed if all required fields are filled
        if (playerName && !isNaN(pace) && !isNaN(shooting) && !isNaN(passing)) {
            // Find the selected team in the league
            const selectedTeam = this.teams.find(team => team.name === teamSelect.value);
            if (selectedTeam) {
                // Create a new Player instance with the form data
                const newPlayer = new Player(playerName, position, pace, shooting, passing);
                // Add the player to the selected team
                selectedTeam.addPlayer(newPlayer);
                // Update the display to show the new player
                this.displayTeams();
                
                // Clear all form fields
                document.getElementById('player-name').value = '';
                document.getElementById('player-pace').value = '';
                document.getElementById('player-shooting').value = '';
                document.getElementById('player-passing').value = '';
            }
        }
    }
}

// ============================================
// 5. INITIALIZATION
// ============================================

/*
 * Initialization
 * This section:
 * - Creates the league
 * - Sets up some initial teams and players
 * - Makes everything ready to use
 */

// Create the main league manager
const premierLeague = new League();

// Create some starting teams
const initialTeams = [
    new Team('Manchester United'),
    new Team('Liverpool'),
    new Team('Arsenal'),
    new Team('Chelsea'),
    new Team('Manchester City')
];

// Add some starting players to each team
initialTeams.forEach(team => {
    // Add players with different positions and stats
    team.addPlayer(new Player('Player 1', 'Forward', 9, 8, 7));
    team.addPlayer(new Player('Player 2', 'Midfielder', 7, 6, 9));
    team.addPlayer(new Player('Player 3', 'Defender', 6, 4, 6));
    team.addPlayer(new Player('Player 4', 'Goalkeeper', 5, 2, 5));
    team.addPlayer(new Player('Player 5', 'Midfielder', 8, 7, 8));
    premierLeague.addTeam(team);
});

// Display all teams and their players when the page loads
window.onload = function() {
    premierLeague.displayTeams();
};
