<Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Displayname</th>
                        <th>Find on Map</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.search.map(function (organisations,i) {
                        return <tr key={organisations.id}><td>{organisations.id}</td><td>{organisations.displayName}</td><td><Button>Show on Map</Button></td></tr>
                    })}
                   
                    
                    </tbody>
                   
                </Table>


const mainReducer = combineReducers({

    organisations : OrganisationReducer,
    search : SearchReducer,
    markers: MarkerReducer 

});

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        recievedOrganisations: recievedOrganisations,
        fetchOrganisations : fetchOrganisations, 
        findMatchingElements : findMatchingElements,
        getLocation: getLocation(name)

    },dispatch)
}

 {this.props.markers.map((m,i) => <Marker key={i} lat={m.lat} lng={m.lng}/>)}

       <option value="1" onClick={() => {this.changeLevels(1, this.props.organisations)}}>1</option>
                  <option value="2" onClick={() => {this.changeLevels({2}, this.props.organisations)}}>2</option>
                  <option value="3" onClick={() => {this.changeLevels({3}, this.props.organisations)}}>3</option>
                  <option value="4" onClick={() => {this.changeLevels({4}, this.props.organisations)}}>4</option>
                </select>

<Polygon
                        paths={test}
                        strokeColor={color}/>

<Table striped bordered condensed hover id="result-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Displayname</th>
                    <th>Show on Map</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </Table>  