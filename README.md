# ReactToDhis
Dhis assignment E
Overview
React to DHIS is a Health Facility Registry Application for the Sierra Leone database DHIS2.

Group Members
Amrit chhetri(amritc@ifi.uio.no)
Erlend Westbye(erlenwe@ifi.uio.no)
Kristoffer Osen(kristogo@ifi.uio.no)
Task
Task E:

App providing an interface to the health facilities in a country (e.g. the Sierra Leone or Trainingland demo databases). The add should make it possible to search and list organisation units and see these in a map, along with relevant details regarding each facility such as type, the district it belongs to etc.

Some inspiration can be found in the Kenya Master Health Facility List

Place names with coordinates for the whole world can be found using MapZen

Make a web app in order to manage organization unit easily. 

The user should be able to:

Search for an org. unit and get facility details, using live search 
Filter the search results, e.g. based orgunit groups or by selecting a polygon from a higher level (district or chiefdom)
Present the information pertaining to the chosen facility in a drop-down menu beneath its name 
Locate on map
Edit coordinates
Edit org. unit details. This can be extended by linking to a particular dataset called Infrastructural Indicators, which can be found under System Settings.
Add a new facility by clicking on the map
Requirements
1) User can search all the health facilities with live search functionality.

2) User can see necessary information related to a health facilities in the search result.

3) User can find the Health Facilty on the map.

4) User can use the map to navigate the different districts and chiefdoms and find the facilities in these areas.

5) User can add a new facility

6) User can edit the facilities

Schedule
We will be meeting 3 days a week. Exact schedule may change .

Aspirations
We want to build a rich user interface to make it easier to get a visual overview of the different health facilities that are available in a country, area or region.

Through this we want too build a system that is easy to expand and maintain.

Our goal is to have a well functioning, and well documented solution, that can help expand upon the functionality of the DHIS2 system.

Through this process we hope to learn the react library, and use it’s power in a effective and clean way.

We also hope to learn more about the dhis api, and find the benefits/drawbacks of a cloud hosted version of the system.

Role Division
Everyone will be developing, designing and testing this solution together, but we have assigned some key areas that each of us are responsible for.

Architecture, documentation: Erlend

Lead programmer, use cases: Kristoffer

Code quality, DHIS2 setup: Amrit

Functionality
Live Search
The application implements a live search which lets the user search the different units in the Sierra Leone database in real time.

The live search can be filtered on the different levels of units, districts, chiefdoms and facilities.

The search results contains a list of units which when clicked shows relevant info about the unit and it's location on the map. If the unit is a district or a chiefdom, the areas borders will appear on the map and it the unit is a facility a marker will appear.

Edit a unit
Each unit in the search result can be edited. When a unit in the result list is clicked, an edit button appears which will display a window allowing the user to change relevant fields for the unit.

Map
The map contains an array of navigational functionality:

When the application is loaded all facilities to which DHIS2 has the coordinates will appear as small, blue markers on the map. These are clickable and will show some information about the facility.

The user have to option show different border overlays on the map. You can show either districts or chiefdoms. When the districts are displayed, the user can click any district and the map will zoom in and show all the chiefdoms in the district. These chiefdoms will also appear in the results list. An individual chiefdom can be selected from the list, and the map will show only this. The overlays of the chiefdoms can also be clicked and will show a list of the facilities in that chiefdom. This is also the case when you choose to display all the chiefdom overlays.

Add a facility
Adding a facility to the DHIS2 Sierra Leone database is done by clicking the map at the location of the new facility. This will open a window which contains fields so the user can add relevant information about the facility. Finally, the user can click the submit button and the facility will be stored to DHIS2.

Architecture
React - Redux arcitecture
Reacttodhis architecthure2.png

Technologies
React. The main client side library.
Redux. The client side state handler.
Google Maps JS API.. Script used for the map.
Node.. Server side javascript runtime enviorment.
Express. Server side framework
Axios. Library for http-calls
Bootstrap. Css library
Application Flow
Application flow:

This is the initial state of the application. The facilities are displayed on the map and the live search is filtered to districts
Init reacttodhis.png

Once user search the facilities, the result list will display the matching units. The units can be clicked and this displays relevant information.
Search reacttodhis.png

The map can display all chiefdoms in Sierra Leone
All chiefdom.png

The map can display all district in Sierra Leone
District.png

A district can be clicked and the map will zoom in and show the chiefdoms in the district.
Chiefdom.png

The chiefdom can be clicked and this will zoom in and show all the facilities in the district in a info window. This is a usefull function since not all facilities are stored in DHIS2 with coordinates and can not be displayed as markers on the map.
Chiefdom zoom.png

When the units in the result list are clicked, the location of that unit will be displayed on the map. This image shows an individual chiefdom and some facility markers as well as the info window for one of the initial facility markers.
Chiefdom markers infowindow.png

When the map is clicked, a window appears allowing the user to add a new facility at the clicked location.
New unit.png

Learning Outcome
This project has given us experience in React and Redux. We choose these tecnologies because we wanted to learn them and we feel we have acquired good knowledge about them. It has also been nice to learn to work with the Google Maps ja API.

Discussion and Future Work
We see potential for improvement in the application. Main improvments that we would like to do are:

Making use of a larger part of the database. All the facilities contains so much more information than we have used and we see that the application could be expanded countless times by adding functionality for the different parts of the database.
Accessing facilities on the map. Expand the application to support that the user could edit or see more information about a unit on the map (not just on the list).
Link to repository
https://github.com/erlendw/ReactToDhis
