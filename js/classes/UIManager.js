/**
 * UIManager Class
 * 
 * This class handles all user interface functionality for the football league manager.
 * It creates and manages all UI elements, forms, and displays.
 * 
 * WHAT THE UI MANAGER DOES:
 * 1. Creates and maintains the user interface
 * 2. Handles user input and form submissions
 * 3. Updates the display when data changes
 * 4. Manages modal dialogs and forms
 */

import Team from './Team.js';
import Player from './Player.js';

export default class UIManager {
    /**
     * Creates a new UIManager instance
     * 
     * @param {League} league - The league instance to manage UI for
     * 
     * What @param does:
     * - It's a special comment that tells other developers what information a function needs
     * - {League} tells us what type of data we expect (in this case, a League object)
     * - 'league' is the name of the variable we'll use inside the function
     * - The text after the dash explains what this parameter is for
     */
    constructor(league) {
        this.league = league;
        this.initializeUI();
    }

    /**
     * Sets up the initial user interface
     * 
     * What this method does:
     * - Creates the basic structure of the webpage
     * - Adds all the forms and displays
     * - Makes everything visible to the user
     */
    initializeUI() {
        const app = document.getElementById('app');
        const container = this.createMainContainer();
        app.appendChild(container);
    }

    /**
     * Creates the main container for the UI
     * 
     * @returns {HTMLElement} - The main container element
     * 
     * What @returns does:
     * - Tells us what the function gives back when it's done
     * - {HTMLElement} means it returns an HTML element (like a div, button, etc.)
     * - The text after the dash explains what this element is used for
     */
    createMainContainer() {
        const container = document.createElement('div');
        container.className = 'container';
        
        container.appendChild(this.createTitle());
        container.appendChild(this.createTeamForm());
        container.appendChild(this.createPlayerForm());
        container.appendChild(this.createTeamsContainer());
        
        return container;
    }

    /**
     * Creates the title element
     * 
     * @returns {HTMLElement} - The title element
     * 
     * What this method does:
     * - Creates a big heading at the top of the page
     * - Returns an HTML element that can be added to the page
     */
    createTitle() {
        const title = document.createElement('h1');
        title.textContent = 'Football League Manager';
        return title;
    }

    /**
     * Creates the team form
     * 
     * @returns {HTMLElement} - The team form element
     * 
     * What this method does:
     * - Creates a form where users can add new teams
     * - Includes an input field and a button
     * - Returns the complete form as an HTML element
     */
    createTeamForm() {
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Add New Team';
        
        const teamInput = document.createElement('input');
        teamInput.type = 'text';
        teamInput.id = 'team-name';
        teamInput.placeholder = 'Team Name';
        
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Team';
        addButton.onclick = () => this.handleAddTeam();
        
        formContainer.appendChild(formTitle);
        formContainer.appendChild(teamInput);
        formContainer.appendChild(addButton);
        
        return formContainer;
    }

    /**
     * Creates the player form
     * 
     * @returns {HTMLElement} - The player form element
     * 
     * What this method does:
     * - Creates a form where users can add new players
     * - Includes fields for name, position, and stats
     * - Returns the complete form as an HTML element
     */
    createPlayerForm() {
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Add New Player';
        
        const teamSelect = this.createTeamSelect();
        const nameInputs = this.createNameInputs();
        const positionSelect = this.createPositionSelect();
        const attributeInputs = this.createAttributeInputs();
        const addButton = this.createAddPlayerButton();
        
        formContainer.appendChild(formTitle);
        formContainer.appendChild(teamSelect);
        formContainer.appendChild(nameInputs);
        formContainer.appendChild(positionSelect);
        formContainer.appendChild(attributeInputs);
        formContainer.appendChild(addButton);
        
        return formContainer;
    }

    /**
     * Creates the teams container
     * 
     * @returns {HTMLElement} - The teams container element
     * 
     * What this method does:
     * - Creates a container where all teams will be displayed
     * - Returns an empty div that will hold team cards
     */
    createTeamsContainer() {
        const container = document.createElement('div');
        container.id = 'teams-container';
        return container;
    }

    /**
     * Creates the team selection dropdown
     * 
     * @returns {HTMLElement} - The team select element
     * 
     * What this method does:
     * - Creates a dropdown menu to select teams
     * - Returns a select element that will be filled with team options
     */
    createTeamSelect() {
        const select = document.createElement('select');
        select.id = 'team-select';
        return select;
    }

    /**
     * Creates the name input fields
     * 
     * @returns {HTMLElement} - The name inputs container
     * 
     * What this method does:
     * - Creates input fields for first and last name
     * - Returns a container with both input fields
     */
    createNameInputs() {
        const container = document.createElement('div');
        container.className = 'name-inputs';

        const firstNameInput = document.createElement('input');
        firstNameInput.type = 'text';
        firstNameInput.id = 'player-first-name';
        firstNameInput.placeholder = 'First Name';
        firstNameInput.required = true;
        
        const lastNameInput = document.createElement('input');
        lastNameInput.type = 'text';
        lastNameInput.id = 'player-last-name';
        lastNameInput.placeholder = 'Last Name';
        lastNameInput.required = true;

        container.appendChild(firstNameInput);
        container.appendChild(lastNameInput);

        return container;
    }

    /**
     * Creates the position selection dropdown
     * 
     * @returns {HTMLElement} - The position select element
     * 
     * What this method does:
     * - Creates a dropdown menu for player positions
     * - Adds options for Forward, Midfielder, Defender, and Goalkeeper
     * - Returns the complete select element
     */
    createPositionSelect() {
        const select = document.createElement('select');
        select.id = 'player-position';
        
        const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
        positions.forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            select.appendChild(option);
        });
        
        return select;
    }

    /**
     * Creates the attribute input fields
     * 
     * @returns {HTMLElement} - The attribute inputs container
     * 
     * What this method does:
     * - Creates number input fields for player attributes
     * - Sets up fields for pace, shooting, and passing
     * - Returns a container with all attribute inputs
     */
    createAttributeInputs() {
        const container = document.createElement('div');
        container.className = 'attribute-inputs';
        
        const attributes = ['pace', 'shooting', 'passing'];
        attributes.forEach(attr => {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `player-${attr}`;
            input.placeholder = `${attr.charAt(0).toUpperCase() + attr.slice(1)} (1-10)`;
            input.min = '1';
            input.max = '10';
            container.appendChild(input);
        });
        
        return container;
    }

    /**
     * Creates the add player button
     * 
     * @returns {HTMLElement} - The add player button
     * 
     * What this method does:
     * - Creates a button to add new players
     * - Sets up the click handler
     * - Returns the button element
     */
    createAddPlayerButton() {
        const button = document.createElement('button');
        button.textContent = 'Add Player';
        button.onclick = () => this.handleAddPlayer();
        return button;
    }

    /**
     * Handles adding a new team
     * 
     * What this method does:
     * - Gets the team name from the input field
     * - Creates a new team and adds it to the league
     * - Updates the display to show the new team
     */
    handleAddTeam() {
        const teamNameInput = document.getElementById('team-name');
        const teamName = teamNameInput.value.trim();
        
        if (teamName) {
            this.league.addTeam(new Team(teamName));
            teamNameInput.value = '';
            this.updateDisplay();
        }
    }

    /**
     * Handles adding a new player
     * 
     * What this method does:
     * - Gets all player information from the form
     * - Creates a new player and adds it to the selected team
     * - Updates the display to show the new player
     */
    handleAddPlayer() {
        const teamSelect = document.getElementById('team-select');
        const firstName = document.getElementById('player-first-name').value.trim();
        const lastName = document.getElementById('player-last-name').value.trim();
        const position = document.getElementById('player-position').value;
        const pace = parseInt(document.getElementById('player-pace').value);
        const shooting = parseInt(document.getElementById('player-shooting').value);
        const passing = parseInt(document.getElementById('player-passing').value);

        if (firstName && lastName && !isNaN(pace) && !isNaN(shooting) && !isNaN(passing)) {
            const selectedTeam = this.league.getTeam(teamSelect.value);
            
            if (selectedTeam) {
                const fullName = `${firstName} ${lastName}`;
                const newPlayer = new Player(fullName, position, pace, shooting, passing);
                selectedTeam.addPlayer(newPlayer);
                this.updateDisplay();
                
                // Clear form fields
                document.getElementById('player-first-name').value = '';
                document.getElementById('player-last-name').value = '';
                document.getElementById('player-pace').value = '';
                document.getElementById('player-shooting').value = '';
                document.getElementById('player-passing').value = '';
            }
        }
    }

    /**
     * Updates the team selection dropdown
     * 
     * What this method does:
     * - Clears the current dropdown options
     * - Adds all teams from the league as new options
     * - Makes sure the dropdown shows all available teams
     */
    updateTeamSelect() {
        const teamSelect = document.getElementById('team-select');
        teamSelect.innerHTML = '';
        
        this.league.teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.name;
            option.textContent = team.name;
            teamSelect.appendChild(option);
        });
    }

    /**
     * Updates the entire display
     * 
     * What this method does:
     * - Updates the team selection dropdown
     * - Refreshes the display of all teams and players
     * - Makes sure everything is up to date
     */
    updateDisplay() {
        this.updateTeamSelect();
        this.displayTeams();
    }

    /**
     * Displays all teams and their players
     * 
     * What this method does:
     * - Clears the current display
     * - Creates cards for each team
     * - Shows all teams and their players
     */
    displayTeams() {
        const container = document.getElementById('teams-container');
        container.innerHTML = '';

        this.league.teams.forEach(team => {
            const teamCard = this.createTeamCard(team);
            container.appendChild(teamCard);
        });
    }

    /**
     * Creates a team card element
     * 
     * @param {Team} team - The team to create a card for
     * @returns {HTMLElement} - The team card element
     * 
     * What this method does:
     * - Creates a card to display a team's information
     * - Shows the team name and a list of players
     * - Returns the complete team card
     */
    createTeamCard(team) {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        const teamHeader = this.createTeamHeader(team);
        const playerList = this.createPlayerList(team);

        teamCard.appendChild(teamHeader);
        teamCard.appendChild(playerList);

        return teamCard;
    }

    /**
     * Creates a team header element
     * 
     * @param {Team} team - The team to create a header for
     * @returns {HTMLElement} - The team header element
     * 
     * What this method does:
     * - Creates the header part of a team card
     * - Shows the team name and a remove button
     * - Returns the complete header
     */
    createTeamHeader(team) {
        const header = document.createElement('div');
        header.className = 'team-header';
        
        const name = document.createElement('span');
        name.textContent = team.name;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove Team';
        removeBtn.onclick = () => {
            this.league.removeTeam(team.name);
            this.updateDisplay();
        };
        
        buttonContainer.appendChild(removeBtn);
        
        header.appendChild(name);
        header.appendChild(buttonContainer);
        
        return header;
    }

    /**
     * Creates a player list element
     * 
     * @param {Team} team - The team to create a player list for
     * @returns {HTMLElement} - The player list element
     * 
     * What this method does:
     * - Creates a list of all players in a team
     * - Shows each player's information and controls
     * - Returns the complete player list
     */
    createPlayerList(team) {
        const list = document.createElement('div');
        list.className = 'player-list';

        team.players.forEach(player => {
            const playerElement = this.createPlayerElement(team, player);
            list.appendChild(playerElement);
        });

        return list;
    }

    /**
     * Creates a player element
     * 
     * @param {Team} team - The team the player belongs to
     * @param {Player} player - The player to create an element for
     * @returns {HTMLElement} - The player element
     * 
     * What this method does:
     * - Creates a display element for a single player
     * - Shows the player's name, position, and stats
     * - Adds edit and remove buttons
     * - Returns the complete player element
     */
    createPlayerElement(team, player) {
        const element = document.createElement('div');
        element.className = 'player';
        
        const info = document.createElement('span');
        info.textContent = `${player.name} (${player.position}) - Pace: ${player.pace}, Shooting: ${player.shooting}, Passing: ${player.passing}`;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => this.handleEditPlayer(team, player);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            team.removePlayer(player.name);
            this.updateDisplay();
        };
        
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(removeBtn);
        
        element.appendChild(info);
        element.appendChild(buttonContainer);
        
        return element;
    }

    /**
     * Handles editing a player's stats
     * 
     * @param {Team} team - The team the player belongs to
     * @param {Player} player - The player to edit
     * 
     * What this method does:
     * - Shows a popup form to edit player stats
     * - Updates the player's stats when saved
     * - Refreshes the display to show changes
     */
    handleEditPlayer(team, player) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const form = this.createEditForm(player);
        modal.appendChild(form);
        
        document.body.appendChild(modal);
        
        form.querySelector('.save-btn').onclick = () => {
            const newPace = parseInt(form.querySelector('#edit-pace').value);
            const newShooting = parseInt(form.querySelector('#edit-shooting').value);
            const newPassing = parseInt(form.querySelector('#edit-passing').value);
            
            if (!isNaN(newPace) && !isNaN(newShooting) && !isNaN(newPassing)) {
                player.updateStats(newPace, newShooting, newPassing);
                this.updateDisplay();
            }
            
            document.body.removeChild(modal);
        };
        
        form.querySelector('.cancel-btn').onclick = () => {
            document.body.removeChild(modal);
        };
    }

    /**
     * Creates the edit form for a player
     * 
     * @param {Player} player - The player to create the form for
     * @returns {HTMLElement} - The edit form element
     * 
     * What this method does:
     * - Creates a form to edit player stats
     * - Shows current stats in input fields
     * - Adds save and cancel buttons
     * - Returns the complete edit form
     */
    createEditForm(player) {
        const form = document.createElement('div');
        form.className = 'edit-form';
        form.innerHTML = `
            <h3>Edit ${player.name}</h3>
            <div class="form-group">
                <label for="edit-pace">Pace (1-10):</label>
                <input type="number" id="edit-pace" min="1" max="10" value="${player.pace}">
            </div>
            <div class="form-group">
                <label for="edit-shooting">Shooting (1-10):</label>
                <input type="number" id="edit-shooting" min="1" max="10" value="${player.shooting}">
            </div>
            <div class="form-group">
                <label for="edit-passing">Passing (1-10):</label>
                <input type="number" id="edit-passing" min="1" max="10" value="${player.passing}">
            </div>
            <div class="button-group">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;
        return form;
    }
} 