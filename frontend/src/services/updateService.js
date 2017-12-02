const updateService = {
  updateLego(part){
    fetch("http://localhost:8000/LegoPieces/" + part.id, {
      method: 'PUT',
      headers : {
        "Content-Type":"application/json"
        },
      body: JSON.stringify({
        "piece": part.piece,
        "type": part.type
        })
    })
      .then(function(response) {
        console.log("piece successfully edited!")
    })
      .catch(function(err) {
        console.log("didn't work" + err)
      });
  }
}
export default updateService;
